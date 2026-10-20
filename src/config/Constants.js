export const dom = {

    // MAIN MENU SCREEN
    menu: {
        screen: document.getElementById("menu"),
        startBtn: document.getElementById("start"),
        controlsBtn: document.getElementById("controlsBtn")
    },

    // CONTROLS SCREEN
    controls: {
        screen: document.getElementById("controls"),
        backBtn: document.getElementById("back")
    },

    // GAMEPLAY SCREEN
    game: {
        screen: document.getElementById("game")
    },

    // PAUSE SCREEN
    pause: {
        screen: document.getElementById("pause")
    },

    pauseResumeBtn: document.getElementById("pauseResume"),

    // GAME OVER SCREEN
    over: {
        screen: document.getElementById("over"),
        restartBtn: document.getElementById("restart")
    },

    // CANVAS
    canvas: document.getElementById("canvas"),

    // SCORE
    score: document.getElementById("score"),
    level: document.getElementById("level"),

    // LIVES
    live: document.querySelectorAll(".live"),

    // BUTTONS
    btns: document.querySelectorAll(".btn")
};

export const size = 32;