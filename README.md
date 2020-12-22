# delta-touch

A JavaScript class object that converts Touch Events to delta numbers (like the delta from Wheel Event)

Helps avoid scrolling to negative values or outside of the div in mobile browsers.

## 

Contains class `DeltaTouchClass` and 3 objects of this class:

`DeltaTouch` (default) - converts X and Y dimensions

`DeltaTouchX` - converts only X dimension

`DeltaTouchY` - converts only Y dimension

## example

    import { DeltaTouchY } from "./delta-touch";
    
    function touchScroll(delta) {
        element.scrollLeft += delta;
    }
    
    element.addEventListener('touchstart', e => DeltaTouchY.start(e));
    element.addEventListener('touchmove', e => DeltaTouchY.move(e, touchScroll));
    element.addEventListener('touchend', e => DeltaTouchY.end(e, touchScroll));

*This piece of code convert Touch Scrolling to Wheel Scrolling*