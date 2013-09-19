requirejs.config({
    "baseUrl": "js",
    "paths": {
		"app": "app",
		"jquery": "jquery-1.7.1.min",
		"full":"full",
		"responsive":"responsive",
		"jcarousel":"jquery.jcarousel.min",
		"tooltip":"jquery.tooltip.min.js",
		"hashchange":"jquery.ba-hashchange.min",
		"validate":"jquery.validate.min-1.9.0",
		"jqzoom":"jquery.jqzoom.dw",
		"dwanalytics":"dwanalytics"
    }
});
require(["jquery", "full","responsive","jcarousel","tooltip","hashchange","validate","jqzoom","dwanalytics"], function($) {
    $(function() {
        $('body').beta();
    });
});