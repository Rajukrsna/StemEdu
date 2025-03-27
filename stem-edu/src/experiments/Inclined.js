import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Grid, Slider } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";
const InclinedPlaneExperiment = () => {
  const sceneRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [angle, setAngle] = useState(30); // Incline angle in degrees
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState({ x: 200, y: 100 });
const experimentName = "Inclined Plane";
  useEffect(() => {
    let timer;
    if (!isCompleted) {
      timer = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    }

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: { width: 600, height: 400, wireframes: false, background: "#f4f4f4" },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Ground and Inclined Plane
    const ground = Bodies.rectangle(300, 390, 600, 20, { isStatic: true });
    const incline = Bodies.rectangle(300, 250, 300, 20, { isStatic: true, angle: (Math.PI / 180) * angle });

    // Block with friction & restitution
    const block = Bodies.rectangle(200, 100, 40, 40, {
      restitution: 0.2,
      friction: 0.05,
      density: 0.01,
    });

    Composite.add(world, [ground, incline, block]);

    // Mouse Dragging Support
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);

    // Capture velocity & position in real time
    Events.on(engine, "beforeUpdate", () => {
      setVelocity(block.velocity.x.toFixed(2));
      setPosition({ x: block.position.x.toFixed(0), y: block.position.y.toFixed(0) });
    });

    return () => {
      clearInterval(timer);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isCompleted, angle]);
  const handleMarkComplete = () => {
    setIsCompleted(true);
  };
  return (
    <Grid container spacing={4} padding={4}>
      {/* Simulation Section */}
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Inclined Plane Experiment
          </Typography>
          <Box ref={sceneRef} />
        </Card>
      </Grid>

      {/* Controls & Info Section */}
      <Grid item xs={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Drag the block to any position and release it to observe how it moves down the plane.
              You can also adjust the incline angle.
            </Typography>

            {/* Incline Angle Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Adjust Incline Angle ({angle}°)
              </Typography>
              <Slider
                value={angle}
                min={10}
                max={60}
                step={1}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setAngle(newValue)}
              />
            </Box>

            {/* Time Spent */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* Real-time Data */}
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Velocity: {velocity} m/s
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Position: X = {position.x}, Y = {position.y}
              </Typography>
            </Box>

            {/* Buttons */}
             {/* Time Spent */}
             <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* Mark as Complete Button */}
            {/* End Experiment Button */}
            <Box mt={3}>
              <EndExperimentButton
                experimentName={experimentName}
                timeSpent={timeSpent}
                route="/torque"
                track="physics" 
                onEnd={handleMarkComplete}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InclinedPlaneExperiment;
