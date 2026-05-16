// ============================================
// result.js - عرض النتيجة المستلمة من الاختبار
// ============================================

// بيانات الشخصيات (الأسماء، الألوان، الوصف، وصورة الستيكر)
const characterData = {
    cleopatra: {
        name: "كليوباترا",
        color: "#D4AF37",
        desc: "ذكية، اجتماعية، وتعرفين كيف تؤثرين على الآخرين بجاذبيتك وحكمتك. أنتِ قائدة بالفطرة وتعشقين التميز.",
        sticker: "👑"
    },
    nefertiti: {
        name: "نفرتيتي",
        color: "#48C9B0",
        desc: "هادئة، راقية، ومتوازنة. تمتلكين حضوراً ساحراً بدون تكلف، والناس تنجذب لطاقتك الهادئة.",
        sticker: "💎"
    },
    athena: {
        name: "أثينا",
        color: "#808080",
        desc: "عقلانية، استراتيجية، وتحللين كل شيء قبل اتخاذ القرار. الحكمة والفهم هما سلاحك الحقيقي.",
        sticker: "🦉"
    },
    artemis: {
        name: "أرتميس",
        color: "#2E7D32",
        desc: "مستقلة، قوية بهدوء، وتحبين الحرية. تمشين في طريقك الخاص دون الالتفات لآراء الآخرين.",
        sticker: "🏹"
    },
    ramses: {
        name: "رمسيس الثاني",
        color: "#C0392B",
        desc: "قائد عظيم، طموح، وواثق من نفسه. تحبين الإنجازات الكبيرة وتسعين دائماً لترك بصمة خالدة.",
        sticker: "🔱"
    },
    caesar: {
        name: "يوليوس قيصر",
        color: "#E67E22",
        desc: "كاريزمي، مسيطر، واستراتيجي. تعرفين كيف تقودين الناس وتحققين أهدافك بإصرار وقوة.",
        sticker: "⚔️"
    },
    socrates: {
        name: "سقراط",
        color: "#A0522D",
        desc: "عميق، حكيم، ومحب للمعرفة. تفضلين التفكير والتحليل على الاندفاع، وتسعين دوماً للحقيقة.",
        sticker: "📚"
    },
    saladin: {
        name: "صلاح الدين",
        color: "#2E8B57",
        desc: "نبيل، عادل، وقائد هادئ. تمتلكين توازناً رائعاً بين القوة والرحمة، والجميع يحترمونك.",
        sticker: "🛡️"
    }
};

// عرض النتيجة
function displayResult() {
    const savedResult = localStorage.getItem('quizResult');
    
    if (!savedResult) {
        // لو مفيش نتيجة، نرجع للصفحة الرئيسية
        window.location.href = 'index.html';
        return;
    }
    
    const result = JSON.parse(savedResult);
    const character = result.characterData;
    const colorHex = result.characterData.color;
    
    // تحديث العناصر في الصفحة
    document.getElementById('charName').innerHTML = character.name;
    document.getElementById('charDesc').innerHTML = character.desc;
    
    // تحديث لون الدائرة
    const colorDiv = document.getElementById('charColor');
    if (colorDiv) {
        colorDiv.style.backgroundColor = colorHex;
        colorDiv.style.boxShadow = `0 0 30px ${colorHex}`;
    }
    
    // عرض الستيكر (emoji أو صورة)
    const stickerElement = document.getElementById('charSticker');
    if (stickerElement && character.sticker) {
        stickerElement.innerHTML = character.sticker;
        stickerElement.style.fontSize = '5rem';
        stickerElement.style.display = 'block';
    }
}

// إعادة الاختبار
function restartQuiz() {
    localStorage.removeItem('quizResult');
    window.location.href = 'index.html';
}

// مشاركة النتيجة
function shareResult() {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
        const result = JSON.parse(savedResult);
        const shareText = `🎭 أنا شخصيتي الفرعونية هي "${result.characterData.name}"! 🎭\n\n${result.characterData.desc}\n\nاكتشفي شخصيتك أيضاً على موقع تحليل الشخصية الفرعونية`;
        
        // محاولة استخدام Web Share API (للجوال)
        if (navigator.share) {
            navigator.share({
                title: 'نتيجة تحليل الشخصية الفرعونية',
                text: shareText,
            }).catch((err) => {
                console.log('تم إلغاء المشاركة أو حدث خطأ:', err);
                copyToClipboard(shareText);
            });
        } else {
            // نسخ للحافظة للأجهزة التي لا تدعم المشاركة
            copyToClipboard(shareText);
        }
    }
}

// نسخ إلى الحافظة
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ تم نسخ النتيجة! يمكنك مشاركتها الآن ✅');
    }).catch(() => {
        showToast('⚠️ لم نتمكن من النسخ، يمكنك نسخ النص يدوياً ⚠️');
    });
}

// عرض رسالة منبثقة بسيطة (toast)
function showToast(message) {
    // إنشاء عنصر toast إذا لم يكن موجوداً
    let toast = document.getElementById('customToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'customToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #d4a017, #b8860b);
            color: #1a1a2e;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            font-family: inherit;
            text-align: center;
            white-space: nowrap;
        `;
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ربط الأحداث
function bindResultEvents() {
    const restartBtn = document.getElementById('restartBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResult);
    }
}

// إضافة تأثير حركي عند تحميل الصفحة
function addAnimationEffects() {
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.style.animation = 'fadeInUp 0.6s ease-out';
    }
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayResult();
    bindResultEvents();
    addAnimationEffects();
});

// منع الرجوع للصفحة السابقة بدون إعادة الاختبار (اختياري)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // لو الصفحة جاية من cache، نتأكد أن النتيجة موجودة
        const savedResult = localStorage.getItem('quizResult');
        if (!savedResult) {
            window.location.href = 'index.html';
        }
    }
});