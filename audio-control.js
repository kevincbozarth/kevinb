// audio-control.js

// Wait until the HTML layout is fully parsed before running code
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".audioButton");
    const players = document.querySelectorAll(".audioPlayer");
    const PLAY_ICON_PATH = "images/icons/play.png";
    const PAUSE_ICON_PATH = "images/icons/pause.png";

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
            associatedAudio.play()
                .then(() => {
                    button.classList.add("playing");
                    
                    // Find the image inside the button and change its source to pause
                    const iconImg = button.querySelector(".audioIcon");
                    if (iconImg) {
                        iconImg.src = PAUSE_ICON_PATH;
                    }
                })
                .catch((error) => {
                    console.error("Audio playback failed:", error);
                });

        });

        associatedAudio.addEventListener("ended", () => {
            resetButtonState(button);
        });
    });

    // Helper function to restore a button back to its play state
    function resetButtonState(buttonElement) {
        buttonElement.classList.remove("playing");
        
        // Find the image inside the button and change its source back to play
        const iconImg = buttonElement.querySelector(".audioIcon");
        if (iconImg) {
            iconImg.src = PLAY_ICON_PATH;
        }
    }
});
