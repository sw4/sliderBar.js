function sliderBarCalcPos(el, event) {
    var vertical = (el.attr('data-sliderBar-vertical') === 'true' ? true : false),
        perc = (vertical ? 1 - ((event.pageY - el.offset().top) / el.height()) :  (event.pageX - el.offset().left) / el.width()),
        val = parseInt(el.attr('data-sliderBar-max') * perc, 10);
    if (val <= el.attr('data-sliderBar-max') && val >= el.attr('data-sliderBar-min')) {
        var progressBar=el.children('.sliderBar-progress');
        progressBar.css(vertical ? 'height' : 'width', Math.floor(perc * 100) + '%');
        el.trigger('onSlide', [val]);
    }
}
$('html').on('mouseup', function () {
    var sliderBar = $('[data-sliderBar-drag=true]');
    if (sliderBar.length > 0) {
        $('body, html').css({
            '-moz-user-select': '',
            '-khtml-user-select': '',
            '-webkit-user-select': '',
            'user-select': ''
        });
        sliderBar.attr('data-sliderBar-drag', false).trigger('onSet', [sliderBar.getsliderBar()]);
    }
});
$('html').on('mousemove', function (event) {
    var el = $('[data-sliderBar-drag=true]');
    if (el.length > 0) {
        sliderBarCalcPos(el, event);
    }
});
$.fn.extend({
    sliderBar: function (options) {
        var config = {
            min: (options && options.min) || 0,
            max: (options && options.max) || 100,
            start: (options && options.start) || 50,
            handle: (options && options.handle) || false,
            onSlide: (options && options.onSlide),
            onSet: (options && options.onSet),
            onChange: (options && options.onChange)
        };
        config.min = config.min < 0 ? 0 : config.min;
        config.start = config.start < 0 ? 0 : config.start;
        config.start = config.start > config.max ? config.max : config.start;
        return this.each(function () {
            var sliderBar = $(this),
                isInit = sliderBar.attr('data-sliderBar') === 'true' ? true : false;
            config.vertical = (options && options.vertical) || (sliderBar.height() > sliderBar.width() ? true : false);
            if (!isInit) {
                sliderBar.html('').append("<div class='sliderBar-progress'><div class='sliderBar-handle'></div></div>");
            }
            sliderBar.children('.sliderBar-progress').css(config.vertical ? 'height' : 'width', Math.floor(100 * config.start / config.max) + '%');
            sliderBar.attr({
                'data-sliderBar': true,
                'data-sliderBar-min': config.min,
                'data-sliderBar-max': config.max,
                'data-sliderBar-start': config.start,
                'data-sliderBar-handle': config.handle,
                'data-sliderBar-vertical': config.vertical
            });
            sliderBar.on('onSlide', function (event, val) {
                if (config.onSlide) {config.onSlide(val); }
                if (config.onChange) {sliderBar.trigger('onChange', [val]); }
            });
            sliderBar.on('onSet', function (event, val) {
                if (config.onSet) {config.onSet(val); }
                if (config.onChange) {sliderBar.trigger('onChange', [val]); }
            });
            sliderBar.on('onChange', function (event, val) {
                if (config.onChange) {config.onChange(val); }
            });
            if (!isInit) {
                sliderBar.on('click', function (event) {
                    sliderBarCalcPos($(this), event);
                });
            }
            if (!isInit) {
                sliderBar.on('mousedown', function (event) {
                    $('body, html').css({
                        '-moz-user-select': 'none',
                        '-khtml-user-select': 'none',
                        '-webkit-user-select': 'none',
                        'user-select': 'none'
                    });
                    sliderBar.attr('data-sliderBar-drag', true);
                });
            }
        });
    },
    setsliderBar: function (val, trigger) {
        var sliderBars = $(this);
        sliderBars.each(function (index, sliderBar) {
            sliderBar = $(sliderBar);
            if (sliderBar.attr('data-sliderBar') === 'true') {
                var max = sliderBar.attr('data-sliderBar-max'),
                    vertical = (sliderBar.attr('data-sliderBar-vertical') === 'true') ? true : false;
                val = (val <= max) ? val : max;
                var progressBar=sliderBar.children('.sliderBar-progress');
                progressBar.css(vertical ? 'height' : 'width', Math.floor(100 * val / max) + '%');
                if (trigger === true) {sliderBar.trigger('onSet', [val]); }
            }
        });
    },
    getsliderBar: function () {
        var sliderBars = $(this),
            values = [];
        sliderBars.each(function (index, sliderBar) {
            sliderBar = $(sliderBar);
            var vertical = (sliderBar.attr('data-sliderBar-vertical') === 'true') ? true : false,
                val = vertical ? sliderBar.children('.sliderBar-progress').height() / sliderBar.height() : sliderBar.children('.sliderBar-progress').width() / sliderBar.width();
            values.push(parseInt(val * sliderBar.attr('data-sliderBar-max'), 10));
        });
        return values.length === 1 ? values[0] : values;
    }
});
