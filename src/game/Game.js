import { dom, size } from "../config/Constants.js";
import { state } from "./GameState.js";
import { GameLoop } from "./GameLoop.js";
import { Paddle } from "../entity/Paddle.js";
import { Keyboard } from "../input/Keyboard.js";
import { Ball } from "../entity/Ball.js";
import { Brick } from "../entity/Brick.js";
import { level } from "../level/Level.js";
import { Score } from "./Score.js";
import { Health } from "./Health.js";

export class Game {

    constructor(audio) {

        this.state = state.MENU;

        this.gridSize = 16;

        this.gameLoop = new GameLoop(this);
        this.paddle = new Paddle();
        this.ball = new Ball();
        this.brick = new Brick();
        this.score = new Score();
        this.health = new Health(3);

        this.audio = audio;

        Keyboard.init(this.paddle, this.ball, this);

        /** @type {CanvasRenderingContext2D} */
        this.ctx = dom.canvas.getContext("2d");
    }

    start() {

        // SET CANVAS DIMENSIONS
        dom.canvas.width = size * this.gridSize;
        dom.canvas.height = size * this.gridSize;

        this.ctx.imageSmoothingEnabled = false;

        this.paddle.init();
        this.ball.init(this.paddle);

        // SET CURRENT LEVEL
        const currentLevel = Math.floor(Math.random() * level.length);
        this.brick.set(level[currentLevel]);

        // START GAME LOOP
        this.gameLoop.start();
    }

    update(dt) {

        this.paddle.update(dt);
        this.ball.update(this.paddle, this.audio, dt);

        // CHECK IF BALL MISS PADDLE
        const missPaddle = this.ball.fall(this.paddle);
        if ( missPaddle ) {

            this.audio.playSound("health");

            // IF BALL MISSES PADDLE LOSE HEALTH
            const gameEnd = this.health.loseHealth();

            // IF LOSES ALL HEALTH END GAME
            if ( gameEnd ) this.gameOver();

            // STOP BALL
            this.ball.move = false;
            this.ball.speedY = -Math.abs(this.ball.speedY);
            this.ball.speedX = 0;

            return;
        }

        // CHECK IF BALL HIT BRICK
        const removeBrick = this.brick.update(this.ball);
        if ( removeBrick ) {

            this.audio.playSound("ball", 0.15);

            // CHECK IF ALL BRICKS ARE BREAKED
            if ( this.brick.remain <= 0 ) {

                // INCREASE SCORE AND GET NEW LEVEL
                this.score.add(true);

                const currentLevel = Math.floor(Math.random() * level.length);
                this.brick.set(level[currentLevel]);

                // STOP BALL
                this.ball.move = false;
                this.ball.speedY = -Math.abs(this.ball.speedY);
                this.ball.speedX = 0;

                return;
            }

            // INCREASE SCORE
            this.score.add(false);
        }
    }

    draw() {
        
        this.ctx.clearRect(
            0, 0,
            dom.canvas.width, dom.canvas.height
        );

        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.brick.draw(this.ctx);
    }

    pause() {

        // PAUSE GAME
        this.state = state.PAUSE;

        dom.canvas.style.display = "none";
        dom.pause.screen.style.display = "flex";
    }

    resume() {

        // RESUME GAME
        this.state = state.PLAY;

        dom.pause.screen.style.display = "none";
        dom.canvas.style.display = "flex";
    }

    gameOver() {

        // GAME OVER
        this.state = state.OVER;

        setTimeout(() => {
            this.audio.playSound("game-over");
            dom.canvas.style.display = "none";
            dom.over.screen.style.display = "flex";
        }, 300);

        if ( this.gameLoop.loop !== null ) {
            cancelAnimationFrame(this.gameLoop.loop);
            this.gameLoop.loop = null;
        }
    }

    restart() {

        // RESTART GAME
        this.state = state.MENU;

        dom.over.screen.style.display = "none";
        dom.canvas.style.display = "flex";
        dom.game.screen.style.display = "none";
        dom.menu.screen.style.display = "flex";

        this.ball.speedY = -Math.abs(this.ball.speedY);
        this.ball.speedX = 0;
        this.ball.move = false;

        dom.live.forEach(l => {
            l.style.backgroundColor = "rgb(220,220,220)";
        });

        this.health.live = this.health.maxHealth;

        this.score.score = 0;
        this.score.level = 1;
        dom.score.textContent = 0;
        dom.level.textContent = 1;
    }
}