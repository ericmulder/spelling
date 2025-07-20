class GameWorld {
    constructor(width = 10, height = 10) {
        this.width = width;
        this.height = height;
        this.playerX = 0;
        this.playerY = 0;
        this.locations = {
            "0,0": { name: "Pallet Town", npc: "Professor Oak" }
        };
    }

    movePlayer(dx, dy) {
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;

        if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
            this.playerX = newX;
            this.playerY = newY;
            return true;
        }
        return false;
    }

    getCurrentLocation() {
        return this.locations[`${this.playerX},${this.playerY}`];
    }
}
