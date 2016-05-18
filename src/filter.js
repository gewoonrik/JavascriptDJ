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
        var defaultFrequency = 6000;
        if(value > 0) {
            this.player.backend.setFilter(this.highpass);
            this.highpass.frequency.value = Math.abs(value)/100 * defaultFrequency;
        }
        else {
            this.player.backend.setFilter(this.lowpass);
            this.lowpass.frequency.value = defaultFrequency - Math.abs(value)/100 * defaultFrequency;

        }
    }
}