import { dom } from "../config/Constants.js";

export class Health {

    constructor(lives) {

        this.maxHealth = lives;
        this.live = this.maxHealth;
    }

    loseHealth() {

        const num = this.live-1;

        dom.live[num].style.backgroundColor = "red";
        setTimeout(() => {
            dom.live[num].style.background = "none";
        }, 150);

        this.live--;

        // CHECK IF THERE ARE REMAINING LIVES
        if ( this.live <= 0 ) return true;
        else return false;
    }
}