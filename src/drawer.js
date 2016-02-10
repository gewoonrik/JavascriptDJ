var $ = require('jquery');

export default class Drawer {
    constructor(container) {
        var self = this;
        this.bpm = $("<span></span>")
        this.slider = $('<input type="range" orient="vertical" />');
        var sliderContainer = $("<div class='col-xs-2'></div>").append(this.bpm).append(this.slider);

        this.player = $("<div class='col-xs-10'></div>");
        var row = $("<div class='row'></div>");

        row.append(sliderContainer).append(this.player);

        container.append(row);
        console.log(container)
    }

}

