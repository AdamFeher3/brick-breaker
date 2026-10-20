import { dom, size } from "../config/Constants.js";

export class Ball {

    constructor() {

        this.position = {
            x: 0, y: 0
        };

        this.prevX = null;
        this.prevY = null;

        this.size = size/2;

        this.speedX = null;
        this.speedY = -280;

        this.move = false;
    }

    init(paddle) {

        if ( this.speedX === null ) this.speedX = 0;

        // SET BALL STARTING POSITION
        this.position.x = paddle.position.x + paddle.width/2;
        this.position.y = paddle.position.y - this.size;
    }

    update(paddle, audio, dt) {

        if ( !this.move ) {

            this.position.x = paddle.position.x + paddle.width/2;
            this.position.y = paddle.position.y - this.size;
            return;
        }

        // SAVE PREVIOUS POSITION
        this.prevX = this.position.x;
        this.prevY = this.position.y;

        // BALL MOVING
        this.position.x += this.speedX * dt;
        this.position.y += this.speedY * dt;

        // BOUNCE BALL OFF PADDLE
        if (
            this.position.x + this.size/2 > paddle.position.x &&
            this.position.x - this.size/2 < paddle.position.x + paddle.width &&
            this.position.y + this.size/2 > paddle.position.y &&
            this.position.y - this.size/2 < paddle.position.y + paddle.height
        ) {
            audio.playSound("paddle", 0.15);

            // BOUNCE VERTICALY
            this.speedY = -Math.abs(this.speedY);

            const ballCenter = this.position.x;
            const paddleCenter = paddle.position.x + paddle.width/2;

            const direction = ballCenter - paddleCenter;

            // BOUNCE HORIZONTALY
            this.speedX = direction * 8;
        }

        // BOUNCE BALL OFF WALLS
        const leftSide = this.position.x - this.size/2 < 0;
        const rightSide = this.position.x + this.size/2 > dom.canvas.width;
        const topSide = this.position.y - this.size/2 < 0;

        if ( leftSide ) {

            this.position.x = this.size/2;
            this.speedX = Math.abs(this.speedX);
        }
        else if ( rightSide ) {

            this.position.x = dom.canvas.width - this.size/2;
            this.speedX = -Math.abs(this.speedX);
        }

        if ( topSide )
            this.speedY = Math.abs(this.speedY);

        if (
            leftSide ||
            rightSide ||
            topSide
        ) audio.playSound("ball", 0.15);
    }

    fall = () => this.position.y > dom.canvas.height;

    /**
     * @param {CanvasRenderingContext2D} g
     */
    draw(g) {

        g.fillStyle = "rgb(255,255,255)";
        g.beginPath();
        g.arc(
            this.position.x,
            this.position.y,
            this.size/2,
            0, Math.PI * 2
        );
        g.fill();
    }
}