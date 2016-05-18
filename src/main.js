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

    dj.player1.loadTrack($track1.val());
    $("#track1Form").submit(function(e) {
        e.preventDefault();
        dj.player1.loadTrack($track1.val());
    });
    dj.player2.loadTrack($track2.val());
    $("#track2Form").submit(function(e) {
        e.preventDefault();
        dj.player2.loadTrack($track2.val());
    });

    var isPressingDownButton = "";
    var playAfterReleaseDeck1 = false;
    var playAfterReleaseDeck2 = false;

    $(document).on ('keydown', function (e) {

        var key = String.fromCharCode(e.which).toLowerCase();
        console.log(key);
        // LEFT
        if(key === "%") {
            dj.player1.skipBackward();
            e.preventDefault();
        }

        //up
        if(key == "&") {
            dj.player1.filter.frequency.value += 100;
        }

        if(key == "(") {
            dj.player1.filter.frequency.value -= 100;
        }

        // RIGHT
        if(key === "'") {
            dj.player1.skipForward();
            e.preventDefault();
        }

        if (key === "a" && isPressingDownButton === "q") {
            console.log("playAfterRelease set true");
            playAfterReleaseDeck1 = true;
            isPressingDownButton = "q";
            return;
        }
        if (key === "s" && isPressingDownButton === "w") {
            console.log("playAfterRelease set true");
            playAfterReleaseDeck2 = true;
            isPressingDownButton = "w";
            return;
        }

        if (isPressingDownButton === key) { return; }
        isPressingDownButton = key;

        if(key === "a"){
            dj.player1.playPause();
            e.preventDefault();
        }
        if(key === "s"){
            dj.player2.playPause();
            e.preventDefault();
        }
        if(key === "q") {
            dj.player1.handleCue(1, false);
            e.preventDefault();
        }
        if(key === "w")  {
            dj.player2.handleCue(1, false);
            e.preventDefault();
        }
    });

    $(document).on ('keyup', function (e) {
        e.preventDefault();
        var key = String.fromCharCode(e.which).toLowerCase();
        isPressingDownButton = "";
        
        if(key === "q") {
            console.log("playAfterReleaseDeck1 is" + playAfterReleaseDeck1);
            dj.player1.handleCue(0, playAfterReleaseDeck1);
            playAfterReleaseDeck1 = false;
            e.preventDefault();
        }
        if(key === "w")  {
            console.log("playAfterRelease is" + playAfterReleaseDeck2);
            dj.player2.handleCue(0, playAfterReleaseDeck2);
            playAfterReleaseDeck2 = false;
            e.preventDefault();
        }
    });

});

module.exports = dj;