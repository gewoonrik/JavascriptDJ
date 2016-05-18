var wavesurfer = require('wavesurfer.js');
var soundcloud = require('soundcloud');

var clientId = "306478cc250f67f9f7f55ad511a11f53";
soundcloud.initialize({client_id: clientId});

import Analyzer from "./analyzer";
import Drawer from "./drawer";

export default class Player {
    constructor(container,slider)    {
        var self = this;
        this.drawer = new Drawer(container);
        this.player = wavesurfer.create({
            container: this.drawer.player.get(0),
            waveColor: 'red',
            progressColor: 'purple',
            barWidth: 0.5
        });
        this.analyzer = new Analyzer();
        this.player.on('ready', function () {
            self.analyzer.analyze(self.player.backend, self.onBpm.bind(self))
        });
        this.cue = null;
        this.bpm = null;
        this.drawer.slider.bind("input change", function(){
            var tempo = 0.003 * self.drawer.slider.val() + 0.85;
            self.setTempo(tempo);
        });

        this.drawer.slider.dblclick(function(e){
            self.setTempo(1);

            self.drawer.slider.val(50);
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
        var self = this;
        soundcloud.get('/resolve?url='+url+"").then(function(result){
            var stream = result.stream_url+"?client_id="+clientId;
            self.player.load(stream);
            self.cue = null;
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
        this.cue = this.player.getCurrentTime()/this.player.getDuration();
    }

    playPause() {
        console.log("playpause");
        this.player.playPause();
    }

    skipForward() {
        this.player.play();
        setTimeout(() => {
            this.player.pause();
        }, 25);
    }

    skipBackward() {
        this.player.setPlaybackRate(-1);
        this.player.play();
        setTimeout(() => {
            this.player.pause();
            this.player.setPlaybackRate(1);
        }, 25);
    }
}

