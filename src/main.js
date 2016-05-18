var $ = require('jquery');
import Player from "./player";
var dj = (function(){
    var player1, player2;
    function init() {
        this.player1 = new Player($("#player1"), $("#tempo1"));
        this.player2 = new Player($("#player2"), $("#tempo2"));
    }

    return {
        init: init,
        player1: player1,
        player2: player2
    };
})();
$(document).ready(function() {
    dj.init();
    var $track1 = $("#track1");
    var $track2 = $("#track2");

    $("#track1Form").submit(function(e) {
        e.preventDefault();
        dj.player1.loadTrack($track1.val());
    });
    $("#track2Form").submit(function(e) {
        e.preventDefault();
        dj.player2.loadTrack($track2.val());
    });

    var isPressingDownButton = "";

    $(document).on ('keydown', function (e) {
        e.preventDefault();

        var key = String.fromCharCode(e.which).toLowerCase();

        // LEFT
        if(key === "%") {
            dj.player1.skipBackward();
        }

        // RIGHT
        if(key === "'") {
            dj.player1.skipForward();
        }


        if (isPressingDownButton === key) { return; }
        isPressingDownButton = key;

        if(key === "a"){
            dj.player1.playPause();
        }
        if(key === "s"){
            dj.player2.playPause();
        }
        if(key === "q") {
            dj.player1.handleCue(1);
        }
        if(key === "w")  {
            dj.player2.handleCue(1);
        }
    });

    $(document).on ('keyup', function (e) {
        e.preventDefault();
        var key = String.fromCharCode(e.which).toLowerCase();
        isPressingDownButton = "";

        if(key === "q") {
            dj.player1.handleCue(0);
        }
        if(key === "w")  {
            dj.player2.handleCue(0);
        }
    });

});

module.exports = dj;