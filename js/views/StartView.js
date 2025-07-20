class StartView {
    constructor() {
        this.container = document.getElementById('game-container');
        this.template = document.getElementById('start-screen-template').innerHTML;
    }

    render() {
        this.container.innerHTML = this.template;
    }

    bindStartGame(handler) {
        const startButton = document.getElementById('start-game');
        startButton.addEventListener('click', () => {
            const playerName = document.getElementById('player-name').value;
            const selectedPokemon = document.querySelector('.starter-option.selected');
            if (playerName && selectedPokemon) {
                const pokemonName = selectedPokemon.dataset.pokemon;
                handler(playerName, pokemonName);
            } else {
                alert('Please enter your name and choose a Pokémon!');
            }
        });
    }

    bindStarterSelection() {
        const starterOptions = document.querySelectorAll('.starter-option');
        starterOptions.forEach(option => {
            option.addEventListener('click', () => {
                starterOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    }
}
