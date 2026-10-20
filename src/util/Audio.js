export class AudioManager {

    constructor() {
        this.audios = new Map();
    }

    playSound(url, time = 0) {

        let audio = this.audios.get(url);

        if ( !audio ) {
            audio = new Audio();
            audio.src = `./src/res/audio/${url}.mp3`;
            this.audios.set(url, audio);
        }

        audio.pause();
        audio.currentTime = time;
        audio.play();
    }
}