module GameOfLifeJs {
    export class Timer {
        tick: number;
        timer: any;

        defaults() {
        }

        initialize() {
            this.tick = 2000;
        }

        start() {
            if (!this.timer) {
                this.timer = window.setInterval(this.onTick, this.tick);
            }
        }

        stop() {
            if (this.timer) {
                this.timer = clearInterval(this.timer);
            }
        }

        changeSpeed(newSpeed) {
            this.tick = newSpeed;
            if (this.timer) {
                this.stop();
                this.start();
            }
        }

        onTick() {
            BackBoneEvents.trigger("Timer:tick");
        }
    }
}  