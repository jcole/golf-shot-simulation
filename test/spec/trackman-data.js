describe("A shot with no side-spin should match Trackman calculated data", function() { 
  // http://www.alecrobertsgolf.com/trackman/
  // http://www.alecrobertsgolf.com/app/download/5792548446/Trackman+Averages.pdf

  function baseOptions() {
    return {
      initHorizontalAngleDegrees: 0,
      initSpinAngle: 0,
      dt: 0.0001
    }
  }

  describe("for a 112mph drive", function() {
    options = baseOptions();
    options.initSpeedMPH = 112;
    options.initVerticalAngleDegrees = 11.2;
    options.initBackspinRPM = 2685;
    options.smashFactor = 1.49;

    expected = {
      totalDistance: toMeters(269),
      maxHeight: toMeters(31)
    }

    validateShot(options, expected);
  });


  describe("for a 75mph shot", function() {
    options = baseOptions();
    options.initSpeedMPH = 75;
    options.initVerticalAngleDegrees = 14.6;
    options.initBackspinRPM = 3722;
    options.smashFactor = 1.49;

    expected = {
      totalDistance: toMeters(143)
    }

    validateShot(options, expected);
  });


});

