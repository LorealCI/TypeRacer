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
            "The quick brown fox jumps over the lazy dog."
        ],
        hard: [
            "To be or not to be, that is the question.",
            "In the beginning, there was the word, and the word was with God.",
            "She sells seashells by the seashore."
        ]
    };

    const difficultySelect = document.getElementById('difficulty-select');
    const sampleText = document.getElementById('sample-text');

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

    difficultySelect.addEventListener('change', updateSampleText);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});