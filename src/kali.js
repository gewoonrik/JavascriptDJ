!function(e){function t(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){function i(e){return Math.floor(e)}var n=r(2),s=function(){function e(){this.is_initialized=!1,this.sample_rate=44100,this.channels=0,this.quick_search=!1,this.factor=0,this.search=0,this.segment=0,this.overlap=0,this.process_size=0,this.samples_in=0,this.samples_out=0,this.segments_total=0,this.skip_total=0}return e}(),o=function(){function e(e){var t=new s;t.channels=e,t.input_fifo=new n(Float32Array),t.output_fifo=new n(Float32Array),this.t=t}return e.prototype.difference=function(e,t,r){for(var i=0,n=0,n=0;r>n;n++)i+=Math.pow(e[n]-t[n],2);return i},e.prototype.tempo_best_overlap_position=function(e,t){var r,i,n,s=e.overlap_buf,o=e.search+1>>>1,a=64,p=i=e.quick_search?o:0,u=this.difference(t.subarray(e.channels*p),s,e.channels*e.overlap),f=0;if(e.quick_search){do{for(f=-1;1>=f;f+=2)for(r=1;(4>r||64==a)&&(p=o+f*r*a,!(0>p||p>=e.search));r++)n=this.difference(t.subarray(e.channels*p),s,e.channels*e.overlap),u>n&&(u=n,i=p);o=i}while(a>>>=2)}else for(p=1;p<e.search;p++)n=this.difference(t.subarray(e.channels*p),s,e.channels*e.overlap),u>n&&(u=n,i=p);return i},e.prototype.tempo_overlap=function(e,t,r,i){var n=0,s=0,o=0,a=1/e.overlap;for(n=0;n<e.overlap;n++){var p=a*n,u=1-p;for(s=0;s<e.channels;s++,o++)i[o]=t[o]*u+r[o]*p}},e.prototype.process=function(){for(var e=this.t;e.input_fifo.occupancy()>=e.process_size;){var t,r;e.segments_total?(r=this.tempo_best_overlap_position(e,e.input_fifo.read_ptr(0)),this.tempo_overlap(e,e.overlap_buf,e.input_fifo.read_ptr(e.channels*r),e.output_fifo.write_ptr(e.overlap))):(r=e.search/2,e.output_fifo.write(e.input_fifo.read_ptr(e.channels*r,e.overlap),e.overlap)),e.output_fifo.write(e.input_fifo.read_ptr(e.channels*(r+e.overlap)),e.segment-2*e.overlap);var n=e.channels*e.overlap;e.overlap_buf.set(e.input_fifo.read_ptr(e.channels*(r+e.segment-e.overlap)).subarray(0,n)),e.segments_total++,t=i(e.factor*(e.segment-e.overlap)+.5),e.input_fifo.read(null,t)}},e.prototype.input=function(e,t,r){void 0===t&&(t=null),void 0===r&&(r=0),null==t&&(t=e.length);var i=this.t;i.samples_in+=t,i.input_fifo.write(e,t)},e.prototype.output=function(e){var t=this.t,r=Math.min(e.length,t.output_fifo.occupancy());return t.samples_out+=r,t.output_fifo.read(e,r),r},e.prototype.flush=function(){var e=this.t,t=i(e.samples_in/e.factor+.5),r=t>e.samples_out?t-e.samples_out:0,n=new Float32Array(128*e.channels);if(r>0){for(;e.output_fifo.occupancy()<r;)this.input(n,128),this.process();e.samples_in=0}},e.prototype.setup=function(t,r,n,s,o,a){void 0===n&&(n=!1),void 0===s&&(s=null),void 0===o&&(o=null),void 0===a&&(a=null);var p=1,u=this.t;u.sample_rate=t,null==s&&(s=Math.max(10,e.segments_ms[p]/Math.max(Math.pow(r,e.segments_pow[p]),1))),null==o&&(o=s/e.searches_div[p]),null==a&&(a=s/e.overlaps_div[p]);var f;if(u.quick_search=n,u.factor=r,u.segment=i(t*s/1e3+.5),u.search=i(t*o/1e3+.5),u.overlap=Math.max(i(t*a/1e3+4.5),16),2*u.overlap>u.segment&&(u.overlap-=8),u.is_initialized){var h=new Float32Array(u.overlap*u.channels),l=0;u.overlap*u.channels<u.overlap_buf.length&&(l=u.overlap_buf.length-u.overlap*u.channels),h.set(u.overlap_buf.subarray(l,u.overlap_buf.length)),u.overlap_buf=h}else u.overlap_buf=new Float32Array(u.overlap*u.channels);f=i(Math.ceil(r*(u.segment-u.overlap))),u.process_size=Math.max(f+u.overlap,u.segment)+u.search,u.is_initialized||u.input_fifo.reserve(i(u.search/2)),u.is_initialized=!0},e.prototype.setTempo=function(e){var t=this.t;this.setup(t.sample_rate,e,t.quick_search)},e.segments_ms=[82,82,35,20],e.segments_pow=[0,1,.33,1],e.overlaps_div=[6.833,7,2.5,2],e.searches_div=[5.587,6,2.14,2],e}();window&&(window.Kali=o),e.exports=o},function(e,t){var r=function(){function e(e){this.begin=0,this.end=0,this.typedArrayConstructor=e,this.buffer=new e(16384)}return e.prototype.clear=function(){this.begin=this.end=0},e.prototype.reserve=function(e){for(this.begin==this.end&&this.clear();;){if(this.end+e<this.buffer.length){var t=this.end;return this.end+=e,t}if(this.begin>16384)this.buffer.set(this.buffer.subarray(this.begin,this.end)),this.end-=this.begin,this.begin=0;else{var r=new this.typedArrayConstructor(this.buffer.length+e);r.set(this.buffer),this.buffer=r}}},e.prototype.write=function(e,t){var r=this.reserve(t);this.buffer.set(e.subarray(0,t),r)},e.prototype.write_ptr=function(e){var t=this.reserve(e);return this.buffer.subarray(t,t+e)},e.prototype.read=function(e,t){t+this.begin>this.end&&console.error("Read out of bounds",t,this.end,this.begin),null!=e&&e.set(this.buffer.subarray(this.begin,this.begin+t)),this.begin+=t},e.prototype.read_ptr=function(e,t){return void 0===t&&(t=-1),t>this.occupancy()&&console.error("Read Pointer out of bounds",t),0>t&&(t=this.occupancy()),this.buffer.subarray(this.begin+e,this.begin+t)},e.prototype.occupancy=function(){return this.end-this.begin},e}();e.exports=r}]);