// ============================================
// script.js - Quiz logic and scoring system
// Updated with new characters: Athena, Akhenaten, Alexander the Great, Shajar Al-Durr, Saladin, Cleopatra, Nefertiti, Julius Caesar
// ============================================

// Character data for the result page
const characterData = {
    athena: {
        name: "Athena",
        nameAr: "Athena",
        color: "#808080",
        desc: "Rational, strategic, and analytical. You think before making any decision. Wisdom and understanding are your true weapons. You are the symbol of wisdom and justice.",
        sticker: "athena.png",
        emoji: "🦉"
    },
    akhenaten: {
        name: "Akhenaten",
        nameAr: "Akhenaten",
        color: "#E8A317",
        desc: "A revolutionary thinker who isn't afraid to change old beliefs and follow your own path. You have a unique vision and a bold personality that brings change to the world.",
        sticker: "akhenaten.png",
        emoji: "☀️"
    },
    alexander: {
        name: "Alexander the Great",
        nameAr: "Alexander the Great",
        color: "#C0392B",
        desc: "A great leader, ambitious, and refuses limitations. You love adventure and exploring the unknown, always striving to leave an eternal mark on history.",
        sticker: "alexander.png",
        emoji: "⚔️"
    },
    shajar: {
        name: "Shajar Al-Durr",
        nameAr: "Shajar Al-Durr",
        color: "#9B59B6",
        desc: "Strong, wise, and exceptional. An extraordinary woman who ruled and led at a time when leadership was exclusive to men. You possess an iron will.",
        sticker: "shajar.png",
        emoji: "👑"
    },
    saladin: {
        name: "Saladin",
        nameAr: "Saladin",
        color: "#2E8B57",
        desc: "Noble, just, and a calm leader. You have a wonderful balance between strength and compassion, and everyone respects you. You are the symbol of dignity and chivalry.",
        sticker: "saladin.png",
        emoji: "🛡️"
    },
    cleopatra: {
        name: "Cleopatra",
        nameAr: "Cleopatra",
        color: "#D4AF37",
        desc: "Intelligent, social, and knows how to influence others with charm and wisdom. You are a natural leader who loves excellence and beauty.",
        sticker: "cleopatra.png",
        emoji: "👑"
    },
    nefertiti: {
        name: "Nefertiti",
        nameAr: "Nefertiti",
        color: "#48C9B0",
        desc: "Calm, elegant, and balanced. You have a captivating presence without effort, and people are drawn to your peaceful energy and timeless elegance.",
        sticker: "nefertiti.png",
        emoji: "💎"
    },
    caesar: {
        name: "Julius Caesar",
        nameAr: "Julius Caesar",
        color: "#E67E22",
        desc: "Charismatic, dominant, and strategic. You know how to lead people and achieve your goals with determination and power. You are a natural decision maker.",
        sticker: "caesar.png",
        emoji: "🏛️"
    }
};

// Scoring system - each character starts at 0
const scores = {
    athena: 0,
    akhenaten: 0,
    alexander: 0,
    shajar: 0,
    saladin: 0,
    cleopatra: 0,
    nefertiti: 0,
    caesar: 0
};

// Helper function to add points to characters
function addScore(chars, points = 1) {
    chars.forEach(c => {
        if (scores[c] !== undefined) scores[c] += points;
    });
}

// Question 1: How do people usually describe you?
function q1(answer) {
    if (answer === "A") addScore(["athena", "akhenaten"]);      // Different in your thinking
    if (answer === "B") addScore(["alexander", "caesar"]);       // Strong and confident person
    if (answer === "C") addScore(["nefertiti", "saladin"]);      // Calm and easy-going
}

// Question 2: When facing a problem, what do you usually do?
function q2(answer) {
    if (answer === "A") addScore(["athena", "saladin"]);         // Think and analyze calmly
    if (answer === "B") addScore(["alexander", "cleopatra"]);     // Confront quickly and directly
    if (answer === "C") addScore(["akhenaten", "nefertiti"]);     // Step back until I understand the picture
}

// Question 3: What drives your decisions in life the most?
function q3(answer) {
    if (answer === "A") addScore(["athena", "akhenaten"]);       // Curiosity and love of understanding
    if (answer === "B") addScore(["alexander", "caesar"]);        // Achieving success and proving myself
    if (answer === "C") addScore(["nefertiti", "shajar"]);        // Living freely and comfortably without pressure
}

// Question 4: If someone bothers or wrongs you:
function q4(answer) {
    if (answer === "A") addScore(["athena", "cleopatra"]);        // Respond with reason and logic
    if (answer === "B") addScore(["alexander", "caesar"]);        // Respond quickly and decisively
    if (answer === "C") addScore(["saladin", "nefertiti"]);       // Choose calmness and withdrawal
}

// Question 5: People usually see you as:
function q5(answer) {
    if (answer === "A") addScore(["athena", "saladin"]);          // A wise and understanding person
    if (answer === "B") addScore(["alexander", "cleopatra"]);      // A leader who influences others
    if (answer === "C") addScore(["akhenaten", "shajar"]);         // A bit mysterious and hard to understand
}

// Question 6: Your approach to life is closest to:
function q6(answer) {
    if (answer === "A") addScore(["athena", "nefertiti"]);        // Think before I act
    if (answer === "B") addScore(["alexander", "caesar"]);         // Achieve my goals quickly and persistently
    if (answer === "C") addScore(["akhenaten", "shajar"]);         // Live my way without restrictions
}

// Reset all scores
function resetScores() {
    for (let key in scores) {
        scores[key] = 0;
    }
}

// Calculate result (highest score with tie-breaker)
function getResult() {
    let max = -1;
    let winners = [];

    for (let key in scores) {
        if (scores[key] > max) {
            max = scores[key];
            winners = [key];
        } else if (scores[key] === max && max !== -1) {
            winners.push(key);
        }
    }

    // In case of tie, randomly select one
    return winners[Math.floor(Math.random() * winners.length)];
}

// Check if all questions are answered
function allQuestionsAnswered() {
    for (let i = 1; i <= 6; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) return false;
    }
    return true;
}

// Update button state based on answered questions
function updateButtonState() {
    const btn = document.getElementById('showResultBtn');
    const statusDiv = document.getElementById('scoreStatus');
    if (allQuestionsAnswered()) {
        btn.disabled = false;
        if (statusDiv) statusDiv.innerHTML = "✅ All questions answered! Click to discover your personality ✅";
    } else {
        btn.disabled = true;
        let answeredCount = 0;
        for (let i = 1; i <= 6; i++) {
            if (document.querySelector(`input[name="q${i}"]:checked`)) answeredCount++;
        }
        if (statusDiv) statusDiv.innerHTML = `📝 ${answeredCount}/6 questions answered... Complete all answers to see your result 📝`;
    }
}

// Collect answers, compute scores, and return winner
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

// Show result page
function showResultPage() {
    if (!allQuestionsAnswered()) {
        alert("⚠️ Please answer all 6 questions first ⚠️");
        return;
    }

    const winnerKey = collectAnswersAndCompute();
    if (!winnerKey) {
        alert("An error occurred, please try again");
        return;
    }

    // Save result to localStorage
    localStorage.setItem('quizResult', JSON.stringify({
        characterKey: winnerKey,
        characterData: characterData[winnerKey]
    }));

    // Redirect to result page
    window.location.href = 'result.html';
}

// Bind radio change events
function bindRadioEvents() {
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateButtonState();
        });
    });
}

// Add card click effects
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

// Initialize everything
function init() {
    bindRadioEvents();
    updateButtonState();
    addCardEffects();
    
    // Bind show result button
    const showBtn = document.getElementById('showResultBtn');
    if (showBtn) {
        showBtn.addEventListener('click', showResultPage);
    }
    
    // Back button to landing page
    const backButton = document.getElementById('backToLandingBtn');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
// Back button to landing page
const backButton = document.getElementById('backToLandingBtn');
if (backButton) {
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}