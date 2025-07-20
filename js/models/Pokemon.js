class Pokemon {
    constructor(name, level = 1) {
        this.name = name;
        this.level = level;
        this.hp = level * 10; // Simple HP calculation
        this.xp = 0;
    }

    attack(target) {
        // Simple attack logic
        const damage = this.level * 2;
        target.hp -= damage;
        console.log(`${this.name} attacks ${target.name} for ${damage} damage.`);
    }

    gainXp(amount) {
        this.xp += amount;
        if (this.xp >= this.level * 10) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xp = 0;
        this.hp = this.level * 10;
        console.log(`${this.name} grew to level ${this.level}!`);
    }
}
