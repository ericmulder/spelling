class Game {
    constructor() {
        this.player = null;
        this.world = new GameWorld();
        this.initialDialogCompleted = false;
    }

    startGame(playerName, pokemonName) {
        this.player = new Player(playerName);
        const starterPokemon = new Pokemon(pokemonName);
        this.player.addPokemon(starterPokemon);
        this.player.saveToLocalStorage();
    }

    loadGame() {
        this.player = Player.loadFromLocalStorage();
        // We could also save and load the world state if we wanted to
        return this.player !== null;
    }

    movePlayer(dx, dy) {
        this.world.movePlayer(dx, dy);
    }
}
