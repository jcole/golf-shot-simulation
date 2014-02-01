function validateShot(options, expected) {
  var shot = new Shot(options);
  var firstPoint = shot.points[0];
  var lastPoint = shot.points[shot.points.length - 1];

  it("should have correct initial position", function() {
    expect(firstPoint.position.x).toBeCloseTo(0, 2);
    expect(firstPoint.position.y).toBeCloseTo(0, 2);
    expect(firstPoint.position.z).toBeCloseTo(0, 2);
  });

  it("should have correct initial velocity", function() {
    expect(firstPoint.velocity.x).toBeCloseTo(expected.initVx, 2);
    expect(firstPoint.velocity.y).toBeCloseTo(expected.initVy, 2);
    expect(firstPoint.velocity.z).toBeCloseTo(expected.initVz, 2);
  });

  it("should have correct shot time", function(){
    var expectedTime = expected.totalTime; // seconds
    var allowedDeltaTime = 0.01; // seconds
    var expectedNumPoints = expectedTime * (1 / options.dt);
    var allowedDeltaPoints = allowedDeltaTime * (1 / options.dt);

    expect(shot.points.length).toBeGreaterThan(expectedNumPoints - allowedDeltaPoints);
    expect(shot.points.length).toBeLessThan(expectedNumPoints + allowedDeltaPoints);
  });

  it("should have correct final position", function() {
    expect(lastPoint.position.z).toBeCloseTo(expected.totalDistance, 2);
  });

  it("should have correct max height", function() {
    var maxActualHeight = 0.0;
    for(var i=0; i < shot.points.length; i++) {
      var height = shot.points[i].position.y;
      if (height > maxActualHeight) {
        maxActualHeight = height;
      }
    }
    expect(maxActualHeight).toBeCloseTo(expected.maxHeight, 2);
  });
}

function baseOptions() {
  return {
    initSpeedMPH: 0,
    initVerticalAngleDegrees: 0,
    initHorizontalAngleDegrees: 0,
    initBackspinRPM: 0,
    initSpinAngle: 0,
    dragCoefficient: 0,
    liftCoefficient: 0,
    dt: 0.0001
  }
}