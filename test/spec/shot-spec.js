describe("A shot", function() {
 
  describe("shot works", function() {

    it("shot should go forward", function() {
      var shot = new Shot();
      expect(shot.points.length).toBeGreaterThan(0);

      var lastPoint = shot.points[shot.points.length - 1];
      var lastPosition = lastPoint.position;

      expect(lastPosition.z).toBeGreaterThan(0.0);
    });

  });

});
