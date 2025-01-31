document.addEventListener('DOMContentLoaded', function() {
    const texts = {
        easy: [
            "The cat sat on the mat.",
            "A quick brown fox jumps over the lazy dog.",
            "Hello world!"
        ],
        medium: [
            "Typing is a skill that improves with practice.",
            "JavaScript is a versatile programming language.",
            "All that glitters is not gold."
        ],
        hard: [
            "To be or not to be, that is the question.",
            "In the beginning, there was the word, and the word was with God.",
            "She sells seashells by the seashore."
        ]
    };

    const difficultySelect = document.getElementById('difficulty-select');
    const sampleText = document.getElementById('sample-text');
    const typingArea = document.getElementById('typing-area');
    const resultTime = document.getElementById('result-time');
    const resultWpm = document.getElementById('result-wpm');
    const resultLevel = document.getElementById('result-level');
    const retryButton = document.getElementById('retry-button');
    let startTime, endTime;
    let testStarted = false;

    function getRandomText(difficulty) {
        const options = texts[difficulty];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleText.textContent = randomText;
    }

    function startTest() {
        startTime = new Date();
        testStarted = true;
        typingArea.disabled = false;
        typingArea.value = '';
        typingArea.focus();
        retryButton.disabled = true;
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        resultTime.textContent = timeTaken.toFixed(2);
        typingArea.disabled = true;
        testStarted = false;
        retryButton.disabled = false;

        const typedText = typingArea.value.trim();
        const sampleWords = sampleText.textContent.trim().split(/\s+/);
        const typedWords = typedText.split(/\s+/);
        let correctWords = 0;

        for (let i = 0; i < sampleWords.length; i++) {
            if (sampleWords[i] === typedWords[i]) {
                correctWords++;
            }
        }

        const wpm = Math.round((correctWords / timeTaken) * 60);
        resultWpm.textContent = wpm;
        resultLevel.textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);
    }

    function updateTypingFeedback() {
        if (!testStarted) {
            startTest();
        }

        const typedText = typingArea.value.trim();
        const sampleWords = sampleText.textContent.trim().split(/\s+/);
        const typedWords = typedText.split(/\s+/);
        let feedbackHtml = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (typedWords[i] === undefined) {
                feedbackHtml += `<span>${sampleWords[i]}</span> `;
            } else if (sampleWords[i] === typedWords[i]) {
                feedbackHtml += `<span style="color: blue;">${sampleWords[i]}</span> `;
            } else {
                feedbackHtml += `<span style="color: red;">${sampleWords[i]}</span> `;
            }
        }

        sampleText.innerHTML = feedbackHtml.trim();
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            stopTest();
        }
    }

    function retryTest() {
        updateSampleText();
        startTest();
    }

    difficultySelect.addEventListener('change', updateSampleText);
    typingArea.addEventListener('input', updateTypingFeedback);
    typingArea.addEventListener('keypress', handleKeyPress);
    retryButton.addEventListener('click', retryTest);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});