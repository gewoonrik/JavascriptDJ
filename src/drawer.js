var $ = require('jquery');

export default class Drawer {
    constructor(container) {
        var self = this;
        this.bpm = $("<span></span>")
        this.slider = $('<input type="range" orient="vertical" />');
        var sliderContainer = $("<div class='col-xs-2'></div>").append(this.bpm).append(this.slider);

        this.player = $("<div class='col-xs-10'></div>");
        this.filter = $('<input type="range" min="-100" max="100" orient="horizontal" />');

        var row = $("<div class='row'></div>");

        row.append(sliderContainer).append(this.player).append(this.filter);

        container.append(row);
    }

}

