import { SillyMagnetic } from "./module/sillymagneticcursor.js";

window.addEventListener('DOMContentLoaded', (event) => {
  let elements = document.querySelectorAll('.please');


  window.addEventListener('mousemove', (event) => {
    // [...elements].forEach((element) => {
    //   new SillyMagnetic(element, {
    //     debug: false,
    //     easing: 'linear',
    //     enableOnMobile: false,
    //     movement: 'xy',
    //     originX: 50,
    //     originY: 50,
    //     unit: "px",
    //     unitMultiplier: 2
    //   });
    // });
  
    let el2 = new SillyMagnetic('.square', {
      debug: false,
      invertDirection: true,
      movement: 'xy',
      originX: 50,
      originY: 50,
      unit: 'vh',
      unitDivider: 2
    });
  
    let el3 = new SillyMagnetic('.circle', {
      debug: false,
      easing: 'ease',
      enableOnMobile: true,
      movement: 'y',
      originX: 50,
      originY: 50,
      unit: "px",
      unitMultiplier: 3
    });
  });
  

});




