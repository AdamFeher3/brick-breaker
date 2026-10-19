import { dom, size } from "../config/Constants.js";

export class Paddle {

    constructor() {

        this.position = {
            x: 0, y: 0
        };

        this.width = size * 3;
        this.height = size/2;

        this.moveSpeed = 300;

        this.moveLeft = false;
        this.moveRight = false;
    }

    init() {

        // SET PADDLE STARTING POSITION
        this.position.x = dom.canvas.width/2 - this.width/2;
        this.position.y = dom.canvas.height - this.height * 1.5;
    }

    update(dt) {

        // MOVE PADDLE LEFT / RIGHT
        if ( this.moveLeft ) this.move(-1, dt);
        else if ( this.moveRight ) this.move(1, dt);
    }

    move(dx, dt) {

        this.position.x += dx * this.moveSpeed * dt;

        // STOP MOVING PADDLE IF HIT THE SIDE WALLS
        if (
            this.position.x < 0 ||
            this.position.x + this.width > dom.canvas.width
        ) {
            this.position.x -= dx * this.moveSpeed * dt;
        }
    }

    /**
     * @param {CanvasRenderingContext2D} g
     */
    draw(g) {

        g.fillStyle = "rgb(160,160,160)";
        g.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}