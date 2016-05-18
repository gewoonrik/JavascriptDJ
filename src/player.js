var wavesurfer = require('wavesurfer.js');
var soundcloud = require('soundcloud');

var clientId = "62bdfd1ba23c2ef7491219c96aff2e14";
soundcloud.initialize({client_id: clientId});

import Analyzer from "./analyzer";
import Kali from "./kali";
import Drawer from "./drawer";

export default class Player {
    constructor(container,slider, bpmContainer)    {
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
        this.bpmContainer = bpmContainer;
        this.bpm = null;
        this.drawer.slider.bind("input change", function(){
            var tempo = 0.003 * self.drawer.slider.val() + 0.85;
            self.setTempo(tempo);
        });

        this.drawer.slider.dblclick(function(){
           slider.val(50);
            self.setTempo(1);
        });

    }

    setTempo(rate)  {
        //this.bpmContainer.html(rate*this.bpm);
        console.log(rate);
        this.player.setPlaybackRate(rate);
        //kali.setup(44100, rate, true);
        //kali.input(this.player.backend.buffer);
        //kali.process();
        //kali.output(this.player.backend.buffer);
    }

    onBpm(bpm) {
        this.bpm = bpm;
        this.bpmContainer.html(bpm);
    }


    loadTrack(url) {
        var self = this;
        soundcloud.get('/resolve?url='+url+"").then(function(result){
            var stream = result.stream_url+"?client_id="+clientId;
            self.player.load(stream);
            self.cue = null;
        });
    }

    handleCue() {
        var currentTime = this.player.getCurrentTime()/this.player.getDuration();
        if(this.player.isPlaying()) {
            this.player.seekTo(this.cue);
        }
        else if(this.cue == currentTime)    {
            this.player.play();
        }
        else {
            this.setCuePoint();
        }
    }

    setCuePoint() {
        this.cue = this.player.getCurrentTime()/this.player.getDuration();
    }

    playPause() {
        this.player.playPause();
    }
}

