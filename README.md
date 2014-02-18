progSlider.js
=============

Ultra-light jQuery Progress Slider

Designed to be ultra light at only 2kb (js) 0.9kb (css)

Simply call .progSlider() on any element to convert it into a slider - note that the library has been designed to work best on <div> elements with height and width set.

When creating a new slider, the following options are available:

.progSlider({options}:

min: // minimum value for the slider, defaults to 0
max: // maximum value for the slider, defaults to 100
start: // maximum value for the slider, defaults to 50
change: // function to call when the slider value is changed, passed one argument- the sliders new value


Methods:

.setProgSlider(value, trigger)

Sets the selected slider to the passed value. If the value is less than the minimum allowed or greater than the maximum, it defaults to the respective value.

trigger is an optional boolean noting whether to trigger the change event specified when defining the slider options

.getProgSlider()

Returns the current value for the selected slider


Additional

An existing slider can be passed new options and redefined at any point by simply calling .progSlider({options}) on it again.
