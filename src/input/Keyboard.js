import { state } from "../game/GameState.js";

export class Keyboard {

    static init(paddle, ball, game) {

        const leftKey = /(KeyA|ArrowLeft)/i;
        const rightKey = /(KeyD|ArrowRight)/i;
        const spaceKey = /Space/i;
        const pauseKey = /(KeyP|Escape)/i;

        // KEYBOARD CONTROLS
        document.addEventListener("keydown", (e) => {

            const key = e.code;

            if (
                game.state !== state.PLAY &&
                game.state !== state.PAUSE
            ) return;

            if ( [leftKey, rightKey, spaceKey, pauseKey].some(k => k.test(key)) )
                e.preventDefault();

            // PAUSE / RESUME GAME
            if ( pauseKey.test(key) ) {

                if ( e.repeat ) return;

                if ( game.state === state.PLAY ) game.pause();
                else if ( game.state === state.PAUSE ) game.resume();
            }

            if ( game.state !== state.PLAY ) return;

            // PADDLE CONTROLS
            if ( leftKey.test(key) ) paddle.moveLeft = true;
            if ( rightKey.test(key) ) paddle.moveRight = true;

            // START BALL
            if ( spaceKey.test(key) && !ball.move ) ball.move = true;
        });

        document.addEventListener("keyup", (e) => {

            const key = e.code;

            if ( leftKey.test(key) ) paddle.moveLeft = false;
            if ( rightKey.test(key) ) paddle.moveRight = false;
        });
    }
}