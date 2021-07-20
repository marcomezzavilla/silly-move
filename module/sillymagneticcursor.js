// v0.1
const mobileDevice = matchMedia("(pointer:coarse)").matches;
const supportedMovements = ['xy', 'x', 'y'];
const supportedUnits = ['px', '%', 'vh', 'vw', 'em', 'rem'];
let cursorPercentageX;
let cursorPercentageY;
let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;

let defaultOptions = {
  debug: true,
  easings: 'linear',
  enableOnMobile: false,
  invertDirection: false,
  movement: 'xy',
  originX: 50,
  originY: 50,
  unit: 'px'
};

class SillyMagnetic {
  constructor(target, options) {
    let direction;
    let easing;
    let moveX;
    let moveY;
    let movement;
    let originX;
    let originY;
    let queryTarget;
    let unit;
    let unitModifier;

    options = {
      ...defaultOptions,
      ...options,
    };

    window.addEventListener('resize', reportViewportSize);
    window.addEventListener('mousemove', reportMousePosition);

    // target
    queryTarget = getTargetElement(target);
    if (!queryTarget) {
      console.error('Bad target: ' + target);
    }

    // originX, originY
    if (typeof options.originX === "number") {
      originX = options.originX;
    } else {
      console.error('originX is not a number');
    }

    if (typeof options.originY === "number") {
      originY = options.originY;
    } else {
      console.error('originY is not a number');
    }

    // direction
    if (options.invertDirection) {
      direction = 1;
    } else {
      direction = -1;
    }

    // movement unit
    if (supportedUnits.includes(options.unit)) {
      unit = options.unit;
    } else {
      console.error('Bad unit: ' + options.unit);
    }

    // movement axis
    if (supportedMovements.includes(options.movement)) {
      movement = options.movement;
    } else {
      console.error('Bad movement: ' + options.movement);
    }

    // disable on mobile
    if (mobileDevice && !options.enableOnMobile) {
      if (options.debug) {
        console.log('disabled on mobile devices');
      }
      return;
    }

    // unit modifier (division takes precedence)
    if (options.unitMultiplier && options.unitDivider) {
      unitModifier = `${1 / options.unitDivider}`;
    } else if (options.unitDivider) {
      unitModifier = `${1 / options.unitDivider}`;
    } else if (options.unitMultiplier) {
      unitModifier = `${options.unitMultiplier}`;
    } else {
      unitModifier = 1;
    }

    // movement easing
    if (options.easing === 'ease') {
      easing = `3`;
      unitModifier = `${unitModifier / 2500}`;
    } else {
      easing = `1`;
    }

    // distance values
    moveX = `${direction * (- originX + cursorPercentageX) ** easing * unitModifier}`;
    moveY = `${direction * (- originY + cursorPercentageY) ** easing * unitModifier}`;

    // rounded distance values
    moveX = Math.round(moveX * 10) / 10;
    moveY = Math.round(moveY * 10) / 10;

    // let's dance
    moveTarget(queryTarget, movement, moveX, moveY, unit);

    function moveTarget(queryTarget, movement, moveX, moveY, unit) {
      if (movement === 'xy') {
        queryTarget.style.transform = `translate(${moveX}${unit}, ${moveY}${unit})`;
      } else if (movement === 'x') {
        queryTarget.style.transform = `translate(${moveX}${unit}, 0)`;
      } else if (movement === 'y') {
        queryTarget.style.transform = `translate(0, ${moveY}${unit})`;
      }
    }

    function getTargetElement(target) {
      if (typeof target === 'string') {
        return document.querySelector(target);
      }
      return target;
    }

    function reportViewportSize() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;

      if (options.debug) {
        console.log(`viewport: ${viewportWidth}px ✕ ${viewportHeight}px`);
      }
    };

    function reportMousePosition(e) {
      cursorPercentageX = (e.x / viewportWidth * 100);
      cursorPercentageY = (e.y / viewportHeight * 100);
  
      if (options.debug) {
        console.log(`x: ${cursorPercentageX}%, y: ${cursorPercentageY}%`);
      }
    }
  }
}

export { SillyMagnetic };
