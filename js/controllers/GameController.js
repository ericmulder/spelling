class GameController {
    constructor() {
        this.game = new Game();
        this.startView = new StartView();
        this.gameView = new GameView(); // We'll implement this later
        this.isDialogActive = false;
    }

    start() {
        if (this.game.loadGame()) {
            // If a game is saved, go directly to the main game
            this.showMainGame();
        } else {
            // Otherwise, show the start screen
            this.showStartScreen();
        }
    }

    showStartScreen() {
        this.startView.render();
        this.startView.bindStarterSelection();
        this.startView.bindStartGame(this.handleStartGame.bind(this));
    }

    handleStartGame(playerName, pokemonName) {
        this.game.startGame(playerName, pokemonName);
        this.showMainGame();
    }

    showMainGame() {
        this.gameView.render(this.game.player, this.game.world);
        this.gameView.bindPokedex(this.game.player);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.checkCurrentLocation();
    }

    handleKeyDown(event) {
        if (this.isDialogActive) return;

        let dx = 0, dy = 0;
        switch (event.key) {
            case 'ArrowUp': dy = -1; break;
            case 'ArrowDown': dy = 1; break;
            case 'ArrowLeft': dx = -1; break;
            case 'ArrowRight': dx = 1; break;
            default: return;
        }

        if (this.game.movePlayer(dx, dy)) {
            this.gameView.renderMap(this.game.world);
            this.checkCurrentLocation();
            this.checkEncounter();
        }
    }

    checkEncounter() {
        // 30% chance of encounter on non-town squares
        if (Math.random() < 0.3 && !this.game.world.getCurrentLocation()) {
            const wildPokemon = new Pokemon("Pidgey", 2); // For now, always a Pidgey
            this.startBattle(wildPokemon);
        }
    }

    startBattle(wildPokemon) {
        this.game.battle = new Battle(this.game.player.starterPokemon, wildPokemon);
        this.gameView.renderBattle(this.game.battle);
        this.showSpellingChallenge();
    }

    showSpellingChallenge() {
        const difficulty = this.game.player.starterPokemon.level < 5 ? 'easy' : 'medium';
        const challenge = getWord(difficulty);
        const word = challenge.word;

        this.showDialog(`Spel het woord: ${word}`, true, (answer) => {
            const correct = answer.toLowerCase() === word;
            this.showFeedback(correct, word);
            this.game.battle.attack(word, correct);
            if (!this.game.battle.isOver) {
                // Opponent's turn
                this.game.battle.attack(null, true); // Opponent always hits for now
                if (!this.game.battle.isOver) {
                    this.gameView.updateBattle(this.game.battle);
                    this.showSpellingChallenge();
                } else {
                    this.showDialog("Je hebt verloren!", false);
                    // could teleport back to town here
                }
            } else {
                this.showDialog(`Je hebt de ${this.game.battle.wildPokemon.name} verslagen!`, false);
                this.game.battle = null;
                this.gameView.renderMap(this.game.world); // Go back to map
            }
        });
    }

    checkCurrentLocation() {
        const location = this.game.world.getCurrentLocation();
        if (location && location.npc === "Professor Oak" && !this.game.initialDialogCompleted) {
            this.showDialog(`Welkom, ${this.game.player.name}! Om je reis te beginnen, moet je bewijzen dat je goed instructies kunt lezen. Typ de volgende zin correct over: \`Ik ben er klaar voor\``, true, (answer) => {
                if (answer.toLowerCase() === "Ik ben er klaar voor") {
                    this.showDialog("Goed gedaan! Je avontuur kan beginnen.", false, () => {
                        this.game.initialDialogCompleted = true;
                        this.gameView.renderMap(this.game.world);
                    });
                } else {
                    this.showDialog("Dat is niet helemaal juist. Probeer het opnieuw.", true, () => {
                        this.checkCurrentLocation(); // Show the prompt again
                    });
                }
            });
        }
    }

    showDialog(text, showInput, callback) {
        this.isDialogActive = true;
        const dialogBox = document.getElementById('dialog-box');
        const dialogText = document.getElementById('dialog-text');
        const spellInput = document.getElementById('spell-input');
        const spellSubmit = document.getElementById('spell-submit');

        dialogText.textContent = text;
        dialogBox.classList.remove('hidden');
        spellInput.value = '';

        if (showInput) {
            spellInput.classList.remove('hidden');
            spellSubmit.classList.remove('hidden');
            spellInput.focus();
            spellSubmit.onclick = () => {
                if(callback) {
                    callback(spellInput.value);
                }
            };
        } else {
            spellInput.classList.add('hidden');
            spellSubmit.classList.add('hidden');
            setTimeout(() => {
                dialogBox.classList.add('hidden');
                this.isDialogActive = false;
                // if there's a callback, and we are not showing input, call it.
                if(callback) callback();
            }, 2000); // Auto-hide dialog
        }
    }

    showFeedback(correct, word) {
        const feedbackEl = document.getElementById('feedback');
        feedbackEl.classList.remove('hidden', 'correct', 'incorrect');
        if (correct) {
            feedbackEl.textContent = 'Goed zo!';
            feedbackEl.classList.add('correct');
        } else {
            feedbackEl.textContent = `Helaas, het juiste antwoord was: ${word}`;
            feedbackEl.classList.add('incorrect');
        }
        setTimeout(() => feedbackEl.classList.add('hidden'), 2000);
    }
}
