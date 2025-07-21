class GameView {
    constructor() {
        this.container = document.getElementById('game-container');
        this.template = document.getElementById('main-game-template').innerHTML;
    }

    render(player, gameWorld) {
        this.container.innerHTML = this.template;
        document.getElementById('player-name-display').textContent = player.name;
        const playerPokemon = player.starterPokemon;
        if (playerPokemon) {
            document.getElementById('player-pokemon-name').textContent = playerPokemon.name;
            document.getElementById('player-pokemon-level').textContent = `Lv. ${playerPokemon.level}`;
            document.getElementById('player-pokemon-sprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonId(playerPokemon.name)}.png`;
        }
        this.renderMap(gameWorld);
    }

    renderMap(gameWorld) {
        const gameWorldContainer = document.getElementById('game-world');
        gameWorldContainer.innerHTML = ''; // Clear previous map
        for (let y = 0; y < gameWorld.height; y++) {
            for (let x = 0; x < gameWorld.width; x++) {
                const cell = document.createElement('div');
                cell.classList.add('map-cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                if (x === gameWorld.playerX && y === gameWorld.playerY) {
                    const playerSprite = document.createElement('img');
                    playerSprite.src = 'https://i.imgur.com/7N3p6lG.png'; // Trainer sprite
                    cell.appendChild(playerSprite);
                }
                gameWorldContainer.appendChild(cell);
            }
        }
    }

    getPokemonId(name) {
        const pokemonIds = {
            "Bulbasaur": 1,
            "Charmander": 4,
            "Squirtle": 7,
            "Pidgey": 16
        };
        return pokemonIds[name.charAt(0).toUpperCase() + name.slice(1)];
    }

    renderBattle(battle) {
        const gameWorldContainer = document.getElementById('game-world');
        const battleTemplate = document.getElementById('battle-scene-template').innerHTML;
        gameWorldContainer.innerHTML = battleTemplate;

        this.updateBattle(battle);
    }

    updateBattle(battle) {
        // Player
        const playerPokemon = battle.playerPokemon;
        document.getElementById('player-battle-name').textContent = playerPokemon.name;
        document.getElementById('player-battle-level').textContent = `Lv. ${playerPokemon.level}`;
        document.getElementById('player-battle-sprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.getPokemonId(playerPokemon.name)}.png`;
        const playerHp = document.getElementById('player-hp');
        playerHp.style.width = `${(playerPokemon.hp / (playerPokemon.level * 10)) * 100}%`;

        // Opponent
        const wildPokemon = battle.wildPokemon;
        document.getElementById('opponent-name').textContent = wildPokemon.name;
        document.getElementById('opponent-level').textContent = `Lv. ${wildPokemon.level}`;
        document.getElementById('opponent-sprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonId(wildPokemon.name)}.png`;
        const opponentHp = document.getElementById('opponent-hp');
        opponentHp.style.width = `${(wildPokemon.hp / (wildPokemon.level * 10)) * 100}%`;
    }

    bindPokedex(player) {
        const pokedexButton = document.getElementById('pokedex-button');
        const pokedexModal = document.getElementById('pokedex-modal');
        const closeButton = document.querySelector('.close-button');
        const pokedexEntries = document.getElementById('pokedex-entries');

        pokedexButton.addEventListener('click', () => {
            pokedexEntries.innerHTML = '';
            player.pokemon.forEach(p => {
                const entry = document.createElement('div');
                entry.classList.add('pokedex-entry');
                const sprite = document.createElement('img');
                sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonId(p.name)}.png`;
                const name = document.createElement('span');
                name.textContent = p.name;
                entry.appendChild(sprite);
                entry.appendChild(name);
                pokedexEntries.appendChild(entry);
            });
            pokedexModal.classList.remove('hidden');
        });

        closeButton.addEventListener('click', () => {
            pokedexModal.classList.add('hidden');
        });

        window.addEventListener('click', (event) => {
            if (event.target === pokedexModal) {
                pokedexModal.classList.add('hidden');
            }
        });
    }
}
