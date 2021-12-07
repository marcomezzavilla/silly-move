import { SillyMove } from "./module/sillymove.js";

window.addEventListener('DOMContentLoaded', (event) => {
  let elements = document.querySelectorAll('.please');

  window.addEventListener('mousemove', (event) => {  
    let el1 = new SillyMove('.square', {
      debug: false,
      invertDirection: true,
      movement: 'xy',
      originX: 50,
      originY: 50,
      unit: 'vh',
      unitDivider: 2
    });
  
    let el2 = new SillyMove('.circle', {
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
