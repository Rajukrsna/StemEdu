import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Button, Grid, Slider } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment"; // Assuming you have this component


const PendulumExperiment = () => {
  const sceneRef = useRef(null);
  const experimentName = "Pendulum Experiment";

  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [engine, setEngine] = useState(null);
  const [runner, setRunner] = useState(null);
  const [render, setRender] = useState(null);
  const [gravity, setGravity] = useState(1); // Default gravity

  useEffect(() => {
    let timer;
    if (!isCompleted) {
      timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    }

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint;

    const engineInstance = Engine.create();
    const world = engineInstance.world;
    world.gravity.y = gravity; // Set initial gravity

    const renderInstance = Render.create({
      element: sceneRef.current,
      engine: engineInstance,
      options: { width: 600, height: 400, wireframes: false, background: "#f0f8ff" },
    });

    const runnerInstance = Runner.create();
    Render.run(renderInstance);
    Runner.run(runnerInstance, engineInstance);

    const support = Bodies.rectangle(300, 50, 200, 20, { isStatic: true, render: { fillStyle: "#333" } });
    const pendulumBob = Bodies.circle(400, 250, 30, { restitution: 1, render: { fillStyle: "#ff5722" } });

    const constraint = Constraint.create({
      bodyA: support,
      pointA: { x: 0, y: 10 },
      bodyB: pendulumBob,
      stiffness: 0.9,
      length: 150,
    });

    Composite.add(world, [support, pendulumBob, constraint]);

    setEngine(engineInstance);
    setRunner(runnerInstance);
    setRender(renderInstance);

    return () => {
      clearInterval(timer);
      Matter.Render.stop(renderInstance);
      Matter.Runner.stop(runnerInstance);
      Matter.World.clear(world);
      Matter.Engine.clear(engineInstance);
      renderInstance.canvas.remove();
    };
  }, [isCompleted, gravity]); // Reacts to gravity changes

  const handleReset = () => {
    if (engine && runner && render) {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    }
    setTimeSpent(0);
    setIsCompleted(false);
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  const handleGravityChange = (event, newValue) => {
    setGravity(newValue);
    if (engine) {
      engine.world.gravity.y = newValue;
    }
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Pendulum Simulation */}
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3, bgcolor: "#ffffff" }}>
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="primary">
            🕰️ Pendulum Experiment
          </Typography>
          <Box ref={sceneRef}></Box>
        </Card>
      </Grid>

      {/* Instructions and Controls */}
      <Grid item xs={4}>
        <Card sx={{ p: 3, boxShadow: 3, bgcolor: "#f9f9f9" }}>
          <CardContent>
            <Typography variant="h6" color="secondary" fontWeight="bold" gutterBottom>
              📜 Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Observe how the pendulum moves and interacts with gravity. You can adjust gravity to see its effect.
            </Typography>

            {/* Gravity Control */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                🌍 Gravity: {gravity.toFixed(1)}
              </Typography>
              <Slider
                value={gravity}
                onChange={handleGravityChange}
                min={0}
                max={2}
                step={0.1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 1, label: "1 (Normal)" },
                  { value: 2, label: "2 (High)" },
                ]}
              />
            </Box>

            {/* Timer Display */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                ⏳ Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* Buttons */}
            <Box mt={3} display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" color="warning" fullWidth onClick={handleReset}>
                🔄 Restart Experiment
              </Button>

              <Button
                variant="contained"
                color={isCompleted ? "success" : "primary"}
                fullWidth
                onClick={handleMarkComplete}
                disabled={isCompleted}
              >
                {isCompleted ? "✅ Lab Completed" : "✅ Mark as Complete"}
              </Button>

              {/* End Experiment Button */}
              <EndExperimentButton
                experimentName={experimentName}
                timeSpent={timeSpent}
                route="/pendulum"
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

export default PendulumExperiment;
