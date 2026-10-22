import { dom } from "../config/Constants.js";
import { state } from "../game/GameState.js";

export class Menu {

    static init(game, audio) {

        // START GAME
        dom.menu.startBtn.addEventListener("click", () => {
            dom.menu.screen.style.display = "none";
            dom.game.screen.style.display = "flex";
            game.start();
        });

        // SHOW CONTROLS
        dom.menu.controlsBtn.addEventListener("click", () => {
            dom.menu.screen.style.display = "none";
            dom.controls.screen.style.display = "flex";
        });

        dom.controls.backBtn.addEventListener("click", () => {
            dom.controls.screen.style.display = "none";
            dom.menu.screen.style.display = "flex";
        });

        // RESTART GAME
        dom.over.restartBtn.addEventListener("click", () => {
            game.restart();
        });

        // PAUSE / RESUME GAME
        dom.pauseResumeBtn.addEventListener("click", () => {
            if ( game.state === state.PLAY ) {
                game.pause();
                dom.pauseResumeBtn.textContent = "►";
            }
            else if ( game.state === state.PAUSE ) {
                game.resume();
                dom.pauseResumeBtn.textContent = "||";
            }
        });

        // PLAY BUTTON SOUND
        dom.btns.forEach(btn => {
            btn.addEventListener("mouseover", () => {
                audio.playSound("button");
            });
            btn.addEventListener("click", () => {
                audio.playSound("button");
            });
        });
    }
}
