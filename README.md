progSlider.js
=============

Ultra-light jQuery Progress Slider

Designed to be ultra light at only 2kb (js) 0.9kb (css) - requires HTML5/CSS3 support.

USAGE:

1. Download the minimized/optimized JS and CSS
2. Link to both in the HEAD section of your page, change the CSS as required


Simply call .progSlider() on any element to convert it into a slider - note that the library has been designed to work best on <div> elements with height and width set.

When creating a new slider, the following options are available:
```
.progSlider({options}):
```

```
min: // minimum value for the slider, defaults to 0 (integer)
max: // maximum value for the slider, defaults to 100 (integer)
start: // maximum value for the slider, defaults to 50 (integer)
vertical: // is the slider avertical (boolean) - if not set will calculate based on element orientation
change: // (function) to call when the slider value is changed, passed one argument- the sliders new value
```

Methods:
```
.setProgSlider(value, trigger)
```
Sets the selected slider to the passed value. If the value is less than the minimum allowed or greater than the maximum, it defaults to the respective value.

trigger is an optional boolean noting whether to trigger the change event specified when defining the slider options
```
.getProgSlider()
```
Returns the current value for the selected slider


Additional

An existing slider can be passed new options and redefined at any point by simply calling .progSlider({options}) on it again.

The slider has been designed with only the minimum options/events but in an open ended way providing flexibility for extension. As such there are no tooltips or related value fields- however these can be linked to/defined etc and referenced in the change event of a slider. Note that defined slider elements.

----------------------

Please view the Creative Commons License (CC BY 3.0)

http://creativecommons.org/licenses/by/3.0/

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">colorflow.js</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.samwheeler.info" property="cc:attributionName" rel="cc:attributionURL">Sam Wheeler</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US">Creative Commons Attribution 3.0 Unported License</a>.
