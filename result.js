// ============================================
// result.js - Display result with single beautiful card
// ============================================

// Character data with PNG image paths
const characterData = {
    athena: {
        name: "Athena",
        desc: "Rational, strategic, and analytical. You think before making any decision. Wisdom and understanding are your true weapons. You are the symbol of wisdom and justice.",
        image: "athena.png"
    },
    akhenaten: {
        name: "Akhenaten",
        desc: "A revolutionary thinker who isn't afraid to change old beliefs and follow your own path. You have a unique vision and a bold personality that brings change to the world.",
        image: "akhenaten.png"
    },
    alexander: {
        name: "Alexander the Great",
        desc: "A great leader, ambitious, and refuses limitations. You love adventure and exploring the unknown, always striving to leave an eternal mark on history.",
        image: "alexander.png"
    },
    shajar: {
        name: "Shajar Al-Durr",
        desc: "Strong, wise, and exceptional. An extraordinary woman who ruled and led at a time when leadership was exclusive to men. You possess an iron will.",
        image: "shajar.png"
    },
    saladin: {
        name: "Saladin",
        desc: "Noble, just, and a calm leader. You have a wonderful balance between strength and compassion, and everyone respects you. You are the symbol of dignity and chivalry.",
        image: "saladin.png"
    },
    cleopatra: {
        name: "Cleopatra",
        desc: "Intelligent, social, and knows how to influence others with charm and wisdom. You are a natural leader who loves excellence and beauty.",
        image: "cleopatra.png"
    },
    nefertiti: {
        name: "Nefertiti",
        desc: "Calm, elegant, and balanced. You have a captivating presence without effort, and people are drawn to your peaceful energy and timeless elegance.",
        image: "nefertiti.png"
    },
    caesar: {
        name: "Julius Caesar",
        desc: "Charismatic, dominant, and strategic. You know how to lead people and achieve your goals with determination and power. You are a natural decision maker.",
        image: "caesar.png"
    }
};

// Display result
function displayResult() {
    const savedResult = localStorage.getItem('quizResult');
    
    if (!savedResult) {
        window.location.href = 'index.html';
        return;
    }
    
    const result = JSON.parse(savedResult);
    const characterKey = result.characterKey;
    const character = characterData[characterKey];
    
    if (!character) {
        console.error('Character not found:', characterKey);
        window.location.href = 'index.html';
        return;
    }
    
    // Update text elements
    document.getElementById('charName').innerHTML = character.name;
    document.getElementById('charDesc').innerHTML = character.desc;
    
    // Update character image
    const charImage = document.getElementById('charImage');
    if (charImage) {
        charImage.src = character.image;
        charImage.alt = character.name;
        
        // Add error handling - if image doesn't load, show placeholder
        charImage.onerror = function() {
            this.src = '';
            this.alt = 'Image not found';
            this.style.backgroundColor = '#2a2a2a';
            this.style.padding = '50px';
            this.style.borderRadius = '30px';
            this.style.minHeight = '200px';
        };
    }
}

// Restart quiz
function restartQuiz() {
    localStorage.removeItem('quizResult');
    window.location.href = 'index.html';
}

// Share result
function shareResult() {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
        const result = JSON.parse(savedResult);
        const character = characterData[result.characterKey];
        const shareText = `🎭 My Ancient Identity is "${character.name}"! 🎭\n\n${character.desc}\n\nDiscover your personality on the Ancient Identity website \n https://mazenzero.github.io/razan-website-test/ `;
        
        if (navigator.share) {
            navigator.share({
                title: 'Ancient Identity Result',
                text: shareText,
            }).catch((err) => {
                console.log('Share cancelled or error:', err);
                copyToClipboard(shareText);
            });
        } else {
            copyToClipboard(shareText);
        }
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Result copied! You can share it now ✅');
    }).catch(() => {
        showToast('⚠️ Could not copy, you can copy the text manually ⚠️');
    });
}

// Show toast message
function showToast(message) {
    let toast = document.getElementById('customToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'customToast';
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Bind events
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayResult();
    bindResultEvents();
});

// Prevent back navigation without result
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const savedResult = localStorage.getItem('quizResult');
        if (!savedResult) {
            window.location.href = 'index.html';
        }
    }
});