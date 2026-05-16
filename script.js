// ============================================
// script.js - منطق الاختبار ونظام التسجيل
// ============================================

// بيانات الشخصيات
const characterData = {
    cleopatra: {
        name: "كليوباترا",
        color: "#D4AF37",
        desc: "ذكية، اجتماعية، وتعرفين كيف تؤثرين على الآخرين بجاذبيتك وحكمتك. أنتِ قائدة بالفطرة وتعشقين التميز."
    },
    nefertiti: {
        name: "نفرتيتي",
        color: "#48C9B0",
        desc: "هادئة، راقية، ومتوازنة. تمتلكين حضوراً ساحراً بدون تكلف، والناس تنجذب لطاقتك الهادئة."
    },
    athena: {
        name: "أثينا",
        color: "#808080",
        desc: "عقلانية، استراتيجية، وتحللين كل شيء قبل اتخاذ القرار. الحكمة والفهم هما سلاحك الحقيقي."
    },
    artemis: {
        name: "أرتميس",
        color: "#2E7D32",
        desc: "مستقلة، قوية بهدوء، وتحبين الحرية. تمشين في طريقك الخاص دون الالتفات لآراء الآخرين."
    },
    ramses: {
        name: "رمسيس الثاني",
        color: "#C0392B",
        desc: "قائد عظيم، طموح، وواثق من نفسه. تحبين الإنجازات الكبيرة وتسعين دائماً لترك بصمة خالدة."
    },
    caesar: {
        name: "يوليوس قيصر",
        color: "#E67E22",
        desc: "كاريزمي، مسيطر، واستراتيجي. تعرفين كيف تقودين الناس وتحققين أهدافك بإصرار وقوة."
    },
    socrates: {
        name: "سقراط",
        color: "#A0522D",
        desc: "عميق، حكيم، ومحب للمعرفة. تفضلين التفكير والتحليل على الاندفاع، وتسعين دوماً للحقيقة."
    },
    saladin: {
        name: "صلاح الدين",
        color: "#2E8B57",
        desc: "نبيل، عادل، وقائد هادئ. تمتلكين توازناً رائعاً بين القوة والرحمة، والجميع يحترمونك."
    }
};

// نظام التسجيل
const scores = {
    cleopatra: 0,
    nefertiti: 0,
    athena: 0,
    artemis: 0,
    ramses: 0,
    caesar: 0,
    socrates: 0,
    saladin: 0
};

// دالة إضافة نقاط
function addScore(chars, points = 1) {
    chars.forEach(c => {
        if (scores[c] !== undefined) scores[c] += points;
    });
}

// دوال الأسئلة
function q1(answer) {
    if (answer === "A") addScore(["athena", "socrates"]);
    if (answer === "B") addScore(["ramses", "caesar"]);
    if (answer === "C") addScore(["nefertiti", "artemis"]);
}

function q2(answer) {
    if (answer === "A") addScore(["athena", "socrates"]);
    if (answer === "B") addScore(["ramses", "cleopatra"]);
    if (answer === "C") addScore(["artemis", "nefertiti"]);
}

function q3(answer) {
    if (answer === "A") addScore(["socrates", "athena"]);
    if (answer === "B") addScore(["ramses", "caesar"]);
    if (answer === "C") addScore(["artemis", "nefertiti"]);
}

function q4(answer) {
    if (answer === "A") addScore(["athena", "cleopatra"]);
    if (answer === "B") addScore(["ramses", "caesar"]);
    if (answer === "C") addScore(["artemis", "saladin"]);
}

function q5(answer) {
    if (answer === "A") addScore(["socrates", "saladin"]);
    if (answer === "B") addScore(["ramses", "caesar"]);
    if (answer === "C") addScore(["artemis", "cleopatra"]);
}

function q6(answer) {
    if (answer === "A") addScore(["athena", "nefertiti"]);
    if (answer === "B") addScore(["ramses", "caesar"]);
    if (answer === "C") addScore(["artemis", "saladin"]);
}

// إعادة ضبط النقاط
function resetScores() {
    for (let key in scores) {
        scores[key] = 0;
    }
}

// حساب النتيجة (أعلى score مع كسر التعادل)
function getResult() {
    let max = -1;
    let winners = [];

    for (let key in scores) {
        if (scores[key] > max) {
            max = scores[key];
            winners = [key];
        } else if (scores[key] === max) {
            winners.push(key);
        }
    }

    return winners[Math.floor(Math.random() * winners.length)];
}

// التحقق من الإجابة على كل الأسئلة
function allQuestionsAnswered() {
    for (let i = 1; i <= 6; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) return false;
    }
    return true;
}

// تحديث حالة الزر
function updateButtonState() {
    const btn = document.getElementById('showResultBtn');
    const statusDiv = document.getElementById('scoreStatus');
    if (allQuestionsAnswered()) {
        btn.disabled = false;
        if (statusDiv) statusDiv.innerHTML = "✅ جميع الأسئلة تمت إجابتها! اضغطي لمعرفة شخصيتك ✅";
    } else {
        btn.disabled = true;
        let answeredCount = 0;
        for (let i = 1; i <= 6; i++) {
            if (document.querySelector(`input[name="q${i}"]:checked`)) answeredCount++;
        }
        if (statusDiv) statusDiv.innerHTML = `📝 تمت إجابة ${answeredCount}/6 أسئلة... أكملي الإجابات لظهور النتيجة 📝`;
    }
}

// جمع الإجابات وحساب النتيجة
function collectAnswersAndCompute() {
    resetScores();
    const answers = {};
    for (let i = 1; i <= 6; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            answers[`q${i}`] = selected.value;
        } else {
            return null;
        }
    }

    q1(answers.q1);
    q2(answers.q2);
    q3(answers.q3);
    q4(answers.q4);
    q5(answers.q5);
    q6(answers.q6);

    return getResult();
}

// عرض صفحة النتيجة
function showResultPage() {
    if (!allQuestionsAnswered()) {
        alert("⚠️ من فضلك أكملي الإجابة على جميع الأسئلة الستة أولاً ⚠️");
        return;
    }

    const winnerKey = collectAnswersAndCompute();
    if (!winnerKey) {
        alert("حدث خطأ، حاولي مرة أخرى");
        return;
    }

    // حفظ النتيجة في localStorage
    localStorage.setItem('quizResult', JSON.stringify({
        characterKey: winnerKey,
        characterData: characterData[winnerKey]
    }));

    // الانتقال إلى صفحة النتيجة
    window.location.href = 'result.html';
}

// ربط الأحداث
function bindEvents() {
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateButtonState();
        });
    });

    const showBtn = document.getElementById('showResultBtn');
    if (showBtn) {
        showBtn.addEventListener('click', showResultPage);
    }
}

// تأثير تفاعلي للكروت
function addCardEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const radios = card.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                card.style.transform = 'scale(0.99)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    });
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    updateButtonState();
    addCardEffects();
});

// زر الرجوع إلى landing page
const backButton = document.getElementById('backToLandingBtn');
if (backButton) {
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}