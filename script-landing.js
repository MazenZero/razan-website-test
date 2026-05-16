// ============================================
// ملف: script-landing.js
// منطق صفحة الهبوط (Landing Page)
// ============================================

// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ربط زر البدء
    const startButton = document.getElementById('startButton');
    
    if (startButton) {
        // إضافة تأثير صوتي خفيف عند الضغط (اختياري)
        startButton.addEventListener('click', function(e) {
            // إضافة تأثير حركي على الزر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // الانتقال إلى صفحة الاختبار
            window.location.href = 'quiz.html';
        });
    }
    
    // إضافة تأثير ظهور تدريجي للعناصر
    const elementsToAnimate = document.querySelectorAll('.feature, .char-preview');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // تغيير خلفية الصفحة بشكل ديناميكي مع مرور الوقت (تأثير سحري)
    let hue = 0;
    const originalGradient = getComputedStyle(document.body).background;
    
    // تأثير بسيط: تغيير لون التاج في الهيدر
    const crownIcon = document.querySelector('.crown-icon');
    if (crownIcon) {
        setInterval(() => {
            crownIcon.style.textShadow = `0 0 ${10 + Math.sin(Date.now() / 500) * 5}px rgba(212, 160, 23, 0.8)`;
        }, 100);
    }
    
    // إضافة تأثير كتابة للوصف (اختياري - جميل للمستخدم)
    const descriptionText = document.querySelector('.description p:first-child');
    if (descriptionText && !descriptionText.hasAttribute('data-typed')) {
        descriptionText.setAttribute('data-typed', 'true');
        const originalText = descriptionText.innerHTML;
        descriptionText.innerHTML = '';
        let i = 0;
        
        // تأثير الكتابة يكون مرة واحدة فقط
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                descriptionText.innerHTML += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 30);
    }
    
    // منع الضغط على الزر مرتين متتاليتين بسرعة
    let isNavigating = false;
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            if (isNavigating) {
                e.preventDefault();
                return;
            }
            isNavigating = true;
            setTimeout(() => {
                isNavigating = false;
            }, 1000);
        });
    }
    
    // إضافة تأثير parallax بسيط للخلفية (عند حركة الماوس)
    document.body.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        const card = document.querySelector('.landing-card');
        if (card) {
            card.style.transform = `translate(${moveX * 0.05}px, ${moveY * 0.05}px)`;
        }
    });
    
    // عرض رسالة ترحيب في console (للتأكد من تحميل الصفحة)
    console.log('✨ صفحة الهبوط لتحليل الشخصية الفرعونية جاهزة ✨');
    
    // إضافة تأثير عند التمرير
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const card = document.querySelector('.landing-card');
        if (card) {
            const opacity = Math.max(0.85, 1 - scrollPosition / 800);
            card.style.backdropFilter = `blur(${12 + scrollPosition / 100}px)`;
        }
    });
});