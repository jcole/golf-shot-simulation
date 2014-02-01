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
    if (expected.initVx != null) {
      expect(firstPoint.velocity.x).toBeCloseTo(expected.initVx, 2);
    }
    if (expected.initVy != null) {
      expect(firstPoint.velocity.y).toBeCloseTo(expected.initVy, 2);
    }
    if (expected.initVz != null) {
      expect(firstPoint.velocity.z).toBeCloseTo(expected.initVz, 2);
    }
  });

  if (expected.totalTime != null) {
    it("should have correct shot time", function(){
      var expectedTime = expected.totalTime; // seconds
      var expectedNumPoints = expectedTime * (1 / options.dt);

      validateWithinPercentAccuracy(expectedNumPoints, shot.points.length, 0.01); // within 1 percent
    });
  }

  it("should have correct final position", function() {
    validateWithinPercentAccuracy(expected.totalDistance, lastPoint.position.z, 0.01); // 1 percent
  });

  if (expected.maxHeight != null) {
    it("should have correct max height", function() {
      var maxActualHeight = 0.0;
      for(var i=0; i < shot.points.length; i++) {
        var height = shot.points[i].position.y;
        if (height > maxActualHeight) {
          maxActualHeight = height;
        }
      }
      validateWithinPercentAccuracy(expected.maxHeight, maxActualHeight, 0.01); // 1 percent
    });
  };

}

function validateWithinPercentAccuracy(expected, actual, fractionalPercent) {
    expect(actual).toBeGreaterThan(expected * (1 - fractionalPercent));
    expect(actual).toBeLessThan(expected * (1 + fractionalPercent));
}