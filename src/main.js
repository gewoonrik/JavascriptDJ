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

    $(document).on ('keypress', function (e) {
        var key = String.fromCharCode(e.which);
        if(key == "a"){
            dj.player1.playPause();
        }
        if(key == "s"){
            dj.player2.playPause();
        }
        if(key == "q") {
            dj.player1.handleCue();
        }
        if(key == "w")  {
            dj.player2.handleCue();
        }

    });


});

module.exports = dj;