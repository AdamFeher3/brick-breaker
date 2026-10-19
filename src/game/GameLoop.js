import { state } from "./GameState.js";

export class GameLoop {

    constructor(game) {

        this.game = game;

        this.last = null;
        this.gameLoop = this.gameLoop.bind(this);

        this.loop = null;
    }

    start() {

        this.last = null;
        this.loop = null;

        // SET GAME STATE TO PLAYING
        this.game.state = state.PLAY;

        // START GAME LOOP
        this.loop = requestAnimationFrame(this.gameLoop);
    }

    gameLoop(time) {

        if ( this.last === null ) this.last = time;

        const dt = (time - this.last) / 1000;
        this.last = time;

        // UPDATE AND RENDER THE GAME WHILE PLAYING STATE IS ACTIVE
        if ( this.game.state === state.PLAY ) {

            this.game.update(dt);
            this.game.draw();
        }

        if ( this.game.state !== state.PLAY && this.game.state !== state.PAUSE ) return;

        this.loop = requestAnimationFrame(this.gameLoop);
    }
}