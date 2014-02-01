describe("A shot shot with no lift or drag should match theoretical trajectory calculation", function() { 
  // trajectory calculator:
  // http://www.mrmont.com/teachers/physicsteachershelper-proj.html

  function baseOptions() {
    return {
      initHorizontalAngleDegrees: 0,
      initBackspinRPM: 0,
      initSpinAngle: 0,
      dragCoefficient: 0,
      liftCoefficient: 0,
      dt: 0.0001,
      smashFactor: 1.0
    }
  }

  describe("for a 30mph shot with 30 degree angle", function() {
    options = baseOptions();
    options.initSpeedMPH = 30;
    options.initVerticalAngleDegrees = 30;

    expected = {
      totalTime: 1.368, //s
      initVx: 0.0,
      initVy: 6.7056,
      initVz: 11.61443,
      totalDistance: 15.89,
      maxHeight: 2.294
    }

    validateShot(options, expected);
  });

  describe("for a 150mph shot with 12 degree angle", function() {
    options = baseOptions();
    options.initSpeedMPH = 150;
    options.initVerticalAngleDegrees = 12;

    expected = {
      totalTime: 2.845, //s
      initVx: 0.0,
      initVy: 13.9417,
      initVz: 65.5906,
      totalDistance: 186.62,
      maxHeight: 9.9169
    }

    validateShot(options, expected);
  }); 
});

