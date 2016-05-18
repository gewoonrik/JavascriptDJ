var wavesurfer = require('wavesurfer.js');
var soundcloud = require('soundcloud');

var clientId = "306478cc250f67f9f7f55ad511a11f53";
soundcloud.initialize({client_id: clientId});

import Analyzer from "./analyzer";
import Drawer from "./drawer";
import Filter from "./filter";

const ForwardSkipTime = 25;
const BackwardsSkipTime = 25;

export default class Player {
    constructor(container,slider)    {
        this.url = "";
        this.drawer = new Drawer(container);
        this.player = wavesurfer.create({
            container: this.drawer.player.get(0),
            waveColor: 'red',
            progressColor: 'purple',
            barWidth: 0.5
        });
        this.filter = new Filter(this.player);
        this.analyzer = new Analyzer();
        this.player.on('ready', () => {
            this.analyzer.analyze(this.player.backend, this.onBpm.bind(self));
            console.log("ready");
            this.cue = localStorage.getItem(this.url) || 0;
            this.player.seekTo(this.cue);
        });

        this.cue = null;
        this.bpm = null;
        this.drawer.slider.bind("input change", () => {
            var tempo = 0.003 * self.drawer.slider.val() + 0.85;
            this.setTempo(tempo);
        });

        this.drawer.filter.bind("input change", () => {
            var tempo = self.drawer.filter.val();
            this.filter.setFilter(tempo);
        });
        this.drawer.filter.dblclick(function(e){
            this.drawer.filter.val(0);
            this.filter.setFilter(0);
        });

        this.drawer.slider.dblclick(() => {
            this.setTempo(1);
            this.drawer.slider.val(50);
        });

    }

    setTempo(rate)  {
        this.drawer.bpm.html(rate*this.bpm);
        this.player.setPlaybackRate(rate);
    }

    onBpm(bpm) {
        this.bpm = bpm;
        this.drawer.bpm.html(bpm);
    }


    loadTrack(url) {
        this.url = url;
        soundcloud.get('/resolve?url='+url+"").then((result) => {
            var stream = result.stream_url+"?client_id="+clientId;
            this.player.load(stream);
        });
    }

    handleCue(state, continueAfterRelease) {
        console.log("HANDLE CUE: " + state);
        var currentTime = this.player.getCurrentTime()/this.player.getDuration();
        if (this.player.isPlaying() && state === 0 && !continueAfterRelease) {
            this.player.pause();
            this.player.seekTo(this.cue);
        }
        else if(this.cue == currentTime && state === 1) {
            this.player.play();
        }
        else if (!this.player.isPlaying() && state === 1) {
            this.setCuePoint();
        }
    }

    setCuePoint() {
        console.log("setCuePoint");
        this.cue = Math.abs(this.player.getCurrentTime()/this.player.getDuration());
        localStorage.setItem(this.url, this.cue);
    }

    playPause() {
        console.log("playpause");
        this.player.playPause();
    }

    skipForward() {
        this.player.play();
        setTimeout(() => {
            this.player.pause();
        }, ForwardSkipTime);
    }

    skipBackward() {
        this.player.setPlaybackRate(-1);
        this.player.play();
        setTimeout(() => {
            this.player.pause();
            this.player.setPlaybackRate(1);
        }, BackwardsSkipTime);
    }
}

