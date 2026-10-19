import { size } from "../config/Constants.js";

export class Brick {

    constructor() {

        this.level = null;
        this.remain = null;
    }

    set(level) {

        this.level = level.map(r => r.slice());
        this.remain = 0;

        for ( let j in this.level ) {
            for ( let i in this.level[j] ) {

                if ( this.level[j][i] === 1 ) this.remain++;
            }
        }
    }

    update(ball) {

        if ( !this.level && !ball.move ) return;

        const r = ball.size/2;
        const prevX = ball.prevX;
        const prevY = ball.prevY;
        const currX = ball.position.x;
        const currY = ball.position.y;

        // BALL COLLISION WITH BRICKS
        for ( let j = 0; j < this.level.length; j++ ) {
            for ( let i = 0; i < this.level[j].length; i++ ) {

                if ( this.level[j][i] !== 1 ) continue;

                const x = i * size * 2 + 4;
                const y = j * size + 4;
                const w = size * 2 - 8;
                const h = size - 8;

                if (
                    currX + r <= x ||
                    currX - r >= x + w ||
                    currY + r <= y ||
                    currY - r >= y + h
                ) continue;

                // BOUNCE HORIZONTALY
                if ( prevX + r <= x || prevX - r >= x + w )
                    ball.speedX *= -1;

                // BOUNCE VERTICALY
                else if ( prevY + r <= y || prevY - r >= y + h )
                    ball.speedY *= -1;

                // REMOVE BRICK THAT WAS HIT
                this.removeBrick(i, j);

                return true;
            }
        }

        return false;
    }

    removeBrick(x, y) {

        this.level[y][x] = 100;
        this.remain--;
    }

    /**
     * @param {CanvasRenderingContext2D} g
     */
    draw(g) {

        for ( let j = 0; j < this.level.length; j++ ) {
            for ( let i = 0; i < this.level[j].length; i++ ) {

                if ( this.level[j][i] === 0 ) continue;

                switch ( j ) {
                    case 0:
                        g.fillStyle = "red";
                        break;
                    case 1:
                        g.fillStyle = "aqua";
                        break;
                    case 2:
                        g.fillStyle = "green";
                        break;
                    case 3:
                        g.fillStyle = "violet";
                        break;
                    case 4:
                        g.fillStyle = "chocolate";
                        break;
                    case 5:
                        g.fillStyle = "yellow";
                        break;
                };

                // FADE OUT REMOVED BRICK
                if ( this.level[j][i] !== 1 ) {

                    const a = this.level[j][i] / 100;
                    g.fillStyle = `rgba(255,255,255,${a})`;
                    this.level[j][i] = this.level[j][i] - 10;
                    if ( this.level[j][i] < 10 )
                        this.level[j][i] = 0;
                }

                const x = i * size * 2;
                const y = j * size;
                const w = size * 2;
                const h = size;

                g.fillRect(
                    x + 3,
                    y + 3,
                    w - 6,
                    h - 6
                );
            }
        }
    }
}