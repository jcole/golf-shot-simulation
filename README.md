# Golf Shot Simulation

![Golf Shot Simulation](https://dl.dropboxusercontent.com/u/68151165/jcole-golf-shot-simulation.png)

A visualization of golf shot physics using three.js.

## Description

This project simulates the trajectory of a golf shot based on the following input parameters:

* club speed (initSpeedMPH)
* club angle of attack (initVerticalAngle)
* club path in-to-out (initHorizontalAngle)
* ball spin (initBackspinRPM)
* ball spin axis tilt (initSpinAngle)

The following physical forces on the ball are modelled:

* gravity
* drag
* lift

The discrete integration method for the physics is currently using *Euler* integration.  A more accurate simulation might use Runge-Kutta or such.

## How to run

Open [index.html](index.html).   A shot will be simulated automatically.  You can play with the sliders on the input box and click "shoot" to simulate another shot.

## How to run tests

Open [test/spec_runner.html](test/spec_runner.html).

The [test/spec/trackman-data.js](test/spec/trackman-data.js) specs are based on some Trackman data pulled from the web for actual shot trajectories based on similar input variables.  A passing set of tests would show trajectories matching the Trackman data for a similar set of input criteria.  Currently, they do not pass.  :)  The physics modelling therefore needs some more work.
