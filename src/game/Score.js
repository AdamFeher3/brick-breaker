import { dom } from "../config/Constants.js";

export class Score {

    constructor() {

        this.score = 0;
        this.level = 1;
    }

    add(newLevel) {

        // INCREASE SCORE
        this.score++;
        dom.score.textContent = this.score;

        dom.score.style.color = "green";
        setTimeout(() => {
            dom.score.style.color = "rgb(220,220,220)";
        }, 150);

        // INCREASE LEVEL SCORE
        if ( newLevel ) {

            this.level++;
            dom.level.textContent = this.level;

            dom.level.style.color = "green";
            setTimeout(() => {
                dom.level.style.color = "rgb(220,220,220)";
            }, 150);
        }
    }
}