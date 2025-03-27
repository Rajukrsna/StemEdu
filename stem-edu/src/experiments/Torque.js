import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Typography, Button, Paper, Slider, Grid } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const PhysicsSimulation = () => {
  const sceneRef = useRef(null);
  const experimentName = "Torque";
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [friction, setFriction] = useState(0.001);
  const [angle, setAngle] = useState(0.06);
  const [applyTorque, setApplyTorque] = useState(false);
  const [torqueValue, setTorqueValue] = useState(0.02);
  const [block, setBlock] = useState(null);

  useEffect(() => {
    let timer;
    if (!isCompleted) {
      timer = setInterval(() => setTimeSpent((prevTime) => prevTime + 1), 1000);
    }

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;
    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        showVelocity: true,
        background: "linear-gradient(135deg, #eceff1, #b0bec5)",
      },
    });

    const runner = Runner.create();

    // Walls and Ramps
    const ground = Bodies.rectangle(400, 600, 800, 50, { isStatic: true });
    const leftWall = Bodies.rectangle(0, 300, 50, 600, { isStatic: true });
    const rightWall = Bodies.rectangle(800, 300, 50, 600, { isStatic: true });

    const ramp = Bodies.rectangle(300, 350, 700, 20, {
      isStatic: true,
      angle: Math.PI * angle,
      render: { fillStyle: "#1e88e5" },
    });

    // Movable Object
    const movingBlock = Bodies.rectangle(300, 250, 40, 40, {
      friction: friction,
      render: { fillStyle: "#ff9800" },
    });

    Composite.add(world, [ground, leftWall, rightWall, ramp, movingBlock]);
    setBlock(movingBlock);

    // Mouse Dragging
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Apply Torque Logic
    const applyTorqueInterval = setInterval(() => {
      if (applyTorque && block) {
        Body.applyForce(block, { x: block.position.x, y: block.position.y }, { x: 0, y: -torqueValue });
      }
    }, 100);

    Render.run(render);
    Runner.run(runner, engine);

    return () => {
      clearInterval(timer);
      clearInterval(applyTorqueInterval);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [friction, angle, applyTorque, torqueValue]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  return (
    <Grid container spacing={2} p={2}>
      {/* Physics Simulation */}
      <Grid item xs={8}>
        <Box ref={sceneRef} sx={{ border: "2px solid #ccc", borderRadius: "10px", boxShadow: 3 }} />
      </Grid>

      {/* Controls & Instructions */}
      <Grid item xs={4}>
        <Paper elevation={4} sx={{ p: 3, bgcolor: "#eceff1", textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Torque Experiment
          </Typography>

          <Typography variant="body2" gutterBottom>
            Drag objects to interact with the environment. Adjust friction and angles below.
          </Typography>

          {/* Sliders */}
          <Box mt={2}>
            <Typography>Adjust Friction: {friction.toFixed(4)}</Typography>
            <Slider
              value={friction}
              min={0}
              max={0.1}
              step={0.0005}
              onChange={(e, val) => setFriction(val)}
            />
          </Box>

          <Box mt={2}>
            <Typography>Adjust Ramp Angle: {(angle * 180 / Math.PI).toFixed(2)}°</Typography>
            <Slider
              value={angle}
              min={0.02}
              max={0.2}
              step={0.01}
              onChange={(e, val) => setAngle(val)}
            />
          </Box>

          {/* Apply Torque */}
          <Box mt={3}>
            <Typography>Apply Torque</Typography>
            <Button
              variant="contained"
              color={applyTorque ? "error" : "primary"}
              onClick={() => setApplyTorque(!applyTorque)}
            >
              {applyTorque ? "Stop Torque" : "Start Torque"}
            </Button>
          </Box>

          <Box mt={2}>
            <Typography>Torque Strength: {torqueValue}</Typography>
            <Slider
              value={torqueValue}
              min={0.005}
              max={0.05}
              step={0.005}
              onChange={(e, val) => setTorqueValue(val)}
            />
          </Box>

          {/* Time Spent */}
          <Box mt={3}>
            <Typography fontWeight="bold">Time Spent: {timeSpent} seconds</Typography>
          </Box>

          {/* End Experiment Button */}
          <Box mt={3}>
            <EndExperimentButton experimentName={experimentName} track="physics"  timeSpent={timeSpent} route="/torque" onEnd={handleMarkComplete} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PhysicsSimulation;
