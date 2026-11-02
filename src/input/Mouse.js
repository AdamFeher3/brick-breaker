import { state } from "../game/GameState.js";
import { dom } from "../config/Constants.js";

export class Mouse {

    static init(paddle, ball, game) {

        // MOUSE / MOBILE CONTROLS
        let hold = false;

        document.addEventListener("pointerdown", () => {
            if ( game.state !== state.PLAY ) return;
            hold = true;
            if ( !ball.move ) ball.move = true;
        });

        document.addEventListener("pointerup", () => { hold = false; });

        document.addEventListener("pointermove", (e) => {
            if ( game.state !== state.PLAY || !hold ) return;

            const rect = dom.canvas.getBoundingClientRect();
            
            paddle.position.x = e.clientX - rect.left;

            if ( paddle.position.x < 0 )
                paddle.position.x = 0;
            else if ( paddle.position.x + paddle.width > dom.canvas.width )
                paddle.position.x = dom.canvas.width - paddle.width;
        });
    }
}