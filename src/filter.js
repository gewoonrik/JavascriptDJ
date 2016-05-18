export default class Filter {
    constructor(wavesurfer) {
        this.player = wavesurfer;
        var lowpass = wavesurfer.backend.ac.createBiquadFilter();
        lowpass.type = "lowpass";

        this.lowpass = lowpass;

        var highpass = wavesurfer.backend.ac.createBiquadFilter();
        highpass.type = "highpass";
        this.highpass = highpass;
    }

    setFilter(value) {
        console.log(value);
        var defaultFrequency = 6000;
        if(value > 10) {
            this.player.backend.setFilter(this.highpass);
            this.highpass.frequency.value = Math.abs(value)/100 * defaultFrequency;
        }
        else if(value < -10) {
            this.player.backend.setFilter(this.lowpass);
            this.lowpass.frequency.value = defaultFrequency - Math.abs(value)/100 * defaultFrequency;
        }
        else {
            this.highpass.frequency.value = 0;
            this.lowpass.frequency.value = defaultFrequency;
        }
    }
}