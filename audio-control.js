// Wait until the HTML layout is fully parsed before running code
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".audioButton");
    const players = document.querySelectorAll(".audioPlayer");

    buttons.forEach((button, index) => {
        // Match the button to its corresponding audio element by its position index
        const associatedAudio = players[index];

        button.addEventListener("click", () => {
            
            // Scenario 1: The clicked track is already running -> Pause and reset it
            if (!associatedAudio.paused) {
                associatedAudio.pause();
                associatedAudio.currentTime = 0;
                resetButtonState(button);
                return;
            }

            // Scenario 2: A new track is clicked -> Silence all other tracks first
            players.forEach((player, playerIndex) => {
                player.pause();
                player.currentTime = 0;
                resetButtonState(buttons[playerIndex]);
            });

            // Play the chosen file and set button to pause mode
            associatedAudio.play();
            button.classList.add("playing");
            const trackName = button.textContent.replace("▶️ Play ", "");
            button.textContent = `⏸️ Pause ${trackName}`;
        });
    });

    // Helper function to restore a button back to its play state
    function resetButtonState(buttonElement) {
        buttonElement.classList.remove("playing");
        const trackName = buttonElement.textContent
            .replace("⏸️ Pause ", "")
            .replace("▶️ Play ", "");
        buttonElement.textContent = `▶️ Play ${trackName}`;
    }
});