class Battle {
    constructor(playerPokemon, wildPokemon) {
        this.playerPokemon = playerPokemon;
        this.wildPokemon = wildPokemon;
        this.isPlayerTurn = true;
        this.isOver = false;
    }

    attack(word, correct) {
        if (this.isPlayerTurn) {
            if (correct) {
                this.playerPokemon.attack(this.wildPokemon);
            } else {
                console.log("Attack missed!");
            }
            if (this.wildPokemon.hp <= 0) {
                this.isOver = true;
                this.playerPokemon.gainXp(10); // Simple XP gain
            }
        } else {
            // Wild pokemon's turn
            this.wildPokemon.attack(this.playerPokemon);
            if (this.playerPokemon.hp <= 0) {
                this.isOver = true;
            }
        }
        this.isPlayerTurn = !this.isPlayerTurn;
    }
}
