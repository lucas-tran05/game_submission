document.addEventListener('DOMContentLoaded', () => {
    const startTutorial = () => {
        const intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: document.querySelector('.game-title'),
                    intro: "Welcome to Echoes of Tomorrow! This is a game where you manage a coastal town facing climate change.",
                    position: 'bottom'
                },
                {
                    element: document.getElementById('startButton'),
                    intro: "Click here to begin your 10-year journey as the town manager.",
                    position: 'right'
                },
                {
                    element: document.getElementById('howToPlayButton'),
                    intro: "Read the rules and objectives of the game here.",
                    position: 'right'
                },
                {
                    element: document.getElementById('tutorialButton'),
                    intro: "You can restart this tutorial anytime by clicking this button.",
                    position: 'right'
                },
                {
                    title: 'Game Screen',
                    intro: 'Now, lets look at the main game interface. Click Next and I will switch to the game screen for you.'
                }
            ],
            showBullets: false,
            showProgress: true,
            exitOnOverlayClick: false
        });

        intro.onbeforechange(function () {
            if (this._currentStep === 4) {
                // User is about to move to the game screen part of the tutorial
                document.getElementById('menuScreen').classList.remove('active');
                document.getElementById('gameScreen').classList.add('active');
                
                // Need to refresh introjs to find the new elements
                intro.refresh();

                intro.setOptions({
                    steps: [
                        {
                            element: document.querySelector('.dashboard'),
                            intro: "This is your dashboard. It shows the current status of your town's <strong>Economy</strong>, <strong>Environment</strong>, and <strong>Community</strong>. Your goal is to keep them balanced and above zero.",
                            position: 'bottom'
                        },
                        {
                            element: document.querySelector('.year-info'),
                            intro: "This shows the current year of your 10-year term.",
                            position: 'bottom'
                        },
                        {
                            element: document.getElementById('climateChart'),
                            intro: "This chart visualizes the trends of your town's key metrics over the years. It helps you understand the long-term impact of your decisions.",
                            position: 'top'
                        },
                        {
                            element: document.querySelector('.decision-section'),
                            intro: "Each year, you will face a critical event here. You will have to make a choice that will affect your town's future.",
                            position: 'top'
                        },
                        {
                            element: document.querySelector('.notification-area'),
                            intro: "After each decision, you will receive feedback and letters from citizens here. Pay attention to their opinions!",
                            position: 'left'
                        }
                    ]
                });
            }
        });

        intro.onexit(function () {
            // Switch back to menu screen if the user exits early
            if (!document.getElementById('gameScreen').classList.contains('game-active')) {
                document.getElementById('gameScreen').classList.remove('active');
                document.getElementById('menuScreen').classList.add('active');
            }
        });

        intro.start();
    };

    const tutorialButton = document.getElementById('tutorialButton');
    if (tutorialButton) {
        tutorialButton.addEventListener('click', startTutorial);
    }
});
