class Player {
    constructor(name) {
        this.name = name;
        this.pokemon = [];
        this.starterPokemon = null;
    }

    addPokemon(pokemon) {
        this.pokemon.push(pokemon);
        if (!this.starterPokemon) {
            this.starterPokemon = pokemon;
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('player', JSON.stringify(this));
    }

    static loadFromLocalStorage() {
        const playerData = localStorage.getItem('player');
        if (playerData) {
            const parsedData = JSON.parse(playerData);
            const player = new Player(parsedData.name);
            // We need to re-create the pokemon instances
            parsedData.pokemon.forEach(p => {
                const pokemon = new Pokemon(p.name, p.level);
                Object.assign(pokemon, p); // copy over other properties
                player.addPokemon(pokemon);
            });
            player.starterPokemon = player.pokemon.find(p => p.name === parsedData.starterPokemon.name);
            return player;
        }
        return null;
    }
}
