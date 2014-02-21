function progSliderCalcPos(el, event) {
    var vertical = (el.attr('data-progSlider-vertical') === 'true' ? true : false),
        perc = (vertical ? 1 - ((event.pageY - el.offset().top) / el.height()) :  (event.pageX - el.offset().left) / el.width()),
        val = parseInt(el.attr('data-progSlider-max') * perc, 10);
    if (val <= el.attr('data-progSlider-max') && val >= el.attr('data-progSlider-min')) {
        el.children('.progSlider-progress').css(vertical ? 'height' : 'width', Math.floor(perc * 100) + '%');
        el.trigger('onSlide', [val]);
    }
}

$('html').on('mouseup', function () {
    var progSlider = $('[data-progSlider-drag=true]');
    if (progSlider.length > 0) {
        $('body, html').css({
          '-moz-user-select': '',
          '-khtml-user-select': '',
          '-webkit-user-select': '',
          'user-select': ''
        });
        progSlider.attr('data-progSlider-drag', false).trigger('onSet', [progSlider.getProgSlider()]);
    }
});
$('html').on('mousemove', function (event) {
    var el = $('[data-progSlider-drag=true]');
    if (el.length > 0) {
        progSliderCalcPos(el, event);
    }
});
$.fn.extend({
    progSlider: function (options) {
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
            var progSlider = $(this),
                isInit = progSlider.attr('data-progSlider') === 'true' ? true : false;
            config.vertical = (options && options.vertical) || (progSlider.height() > progSlider.width() ? true : false);
            if (!isInit) {
                progSlider.html('').append("<div class='progSlider-progress'><div class='progSlider-handle'></div></div>");
            }
            progSlider.children('.progSlider-progress').css(config.vertical ? 'height' : 'width', Math.floor(100 * config.start / config.max) + '%');
            progSlider.attr({
                'data-progSlider': true,
                'data-progSlider-min': config.min,
                'data-progSlider-max': config.max,
                'data-progSlider-start': config.start,
                'data-progSlider-handle': config.handle,
                'data-progSlider-vertical': config.vertical
            });
            progSlider.on('onSlide', function (event, val) {
                if (config.onSlide) {config.onSlide(val); }
                if (config.onChange) {progSlider.trigger('onChange', [val]); }
            });
            progSlider.on('onSet', function (event, val) {
                if (config.onSet) {config.onSet(val); }
                if (config.onChange) {progSlider.trigger('onChange', [val]); }
            });
            progSlider.on('onChange', function (event, val) {
                if (config.onChange) {config.onChange(val); }
            });
            if (!isInit) {
                progSlider.on('click', function (event) {
                    progSliderCalcPos($(this), event);
                });
            }
            if (!isInit) {
                progSlider.on('mousedown', function (event) {
                    $('body, html').css({
                      '-moz-user-select': 'none',
                      '-khtml-user-select': 'none',
                      '-webkit-user-select': 'none',
                      'user-select': 'none'
                    });
                    progSlider.attr('data-progSlider-drag', true);
                });
            }
        });
    },
    setProgSlider: function (val, trigger) {
        var progSliders = $(this);
        progSliders.each(function (index, progSlider) {
            progSlider = $(progSlider);
            if (progSlider.attr('data-progSlider') === 'true') {
                var max = progSlider.attr('data-progSlider-max'),
                    vertical = (progSlider.attr('data-progSlider-vertical') === 'true') ? true : false;
                val = (val <= max) ? val : max;
                progSlider.children('.progSlider-progress').css(vertical ? 'height' : 'width', Math.floor(100 * val / max) + '%');
                if (trigger === true) {progSlider.trigger('onSet', [val]); }
            }
        });
    },
    getProgSlider: function () {
        var progSliders = $(this),
            values = [];
        progSliders.each(function (index, progSlider) {
            progSlider = $(progSlider);
            var vertical = (progSlider.attr('data-progSlider-vertical') === 'true') ? true : false,
                val = vertical ? progSlider.children('.progSlider-progress').height() / progSlider.height() : progSlider.children('.progSlider-progress').width() / progSlider.width();
            values.push(parseInt(val * progSlider.attr('data-progSlider-max'), 10));
        });
        return values.length === 1 ? values[0] : values;
    }
});
