import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Typography, Button, Paper, Slider, Grid, Card, CardContent, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const PhysicsSimulation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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

    // Responsive canvas dimensions
    const canvasWidth = isMobile ? 320 : 800;
    const canvasHeight = isMobile ? 240 : 600;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        showVelocity: true,
        background: "linear-gradient(135deg, #eceff1, #b0bec5)",
      },
    });

    const runner = Runner.create();

    // Responsive physics objects - scaled for canvas size
    const ground = Bodies.rectangle(canvasWidth/2, canvasHeight, canvasWidth, 50, { isStatic: true });
    const leftWall = Bodies.rectangle(0, canvasHeight/2, 50, canvasHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(canvasWidth, canvasHeight/2, 50, canvasHeight, { isStatic: true });

    const ramp = Bodies.rectangle(
      canvasWidth * 0.375, 
      canvasHeight * 0.58, 
      canvasWidth * 0.875, 
      20, 
      {
        isStatic: true,
        angle: Math.PI * angle,
        render: { fillStyle: "#1e88e5" },
      }
    );

    // Movable Object - responsive size and position
    const blockSize = isMobile ? 30 : 40;
    const movingBlock = Bodies.rectangle(
      canvasWidth * 0.375, 
      canvasHeight * 0.42, 
      blockSize, 
      blockSize, 
      {
        friction: friction,
        render: { fillStyle: "#ff9800" },
      }
    );

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
  }, [friction, angle, applyTorque, torqueValue, isMobile]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 2,
      paddingTop: isMobile ? "100px" : "90px", // Navbar clearance
      minHeight: "100vh"
    }}>
      <Grid container spacing={isMobile ? 2 : 2}>
        {/* Physics Simulation - Full width on mobile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: isMobile ? 1 : 2, boxShadow: 3 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              align="center" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
            >
              ⚙️ Torque Experiment
            </Typography>
            <Box 
              ref={sceneRef} 
              sx={{ 
                border: "2px solid #ccc", 
                borderRadius: "10px", 
                boxShadow: 3,
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden'
              }} 
            />
          </Card>
        </Grid>

        {/* Controls & Instructions - Full width on mobile, stacked below */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={4} 
            sx={{ 
              p: isMobile ? 2 : 3, 
              bgcolor: "#eceff1", 
              textAlign: "center" 
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight="bold" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
            >
              Torque Experiment
            </Typography>

            <Typography 
              variant="body2" 
              gutterBottom
              sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
            >
              Drag objects to interact with the environment. Adjust friction and angles below.
            </Typography>

            {/* Friction Slider */}
            <Box mt={isMobile ? 2 : 2}>
              <Typography 
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Adjust Friction: {friction.toFixed(4)}
              </Typography>
              <Slider
                value={friction}
                min={0}
                max={0.1}
                step={0.0005}
                onChange={(e, val) => setFriction(val)}
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Angle Slider */}
            <Box mt={isMobile ? 2 : 2}>
              <Typography 
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Adjust Ramp Angle: {(angle * 180 / Math.PI).toFixed(2)}°
              </Typography>
              <Slider
                value={angle}
                min={0.02}
                max={0.2}
                step={0.01}
                onChange={(e, val) => setAngle(val)}
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Apply Torque Button */}
            <Box mt={isMobile ? 2 : 3}>
              <Typography 
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem', mb: 1 }}
              >
                Apply Torque
              </Typography>
              <Button
                variant="contained"
                color={applyTorque ? "error" : "primary"}
                onClick={() => setApplyTorque(!applyTorque)}
                size={isMobile ? "medium" : "large"}
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                {applyTorque ? "Stop Torque" : "Start Torque"}
              </Button>
            </Box>

            {/* Torque Strength Slider */}
            <Box mt={isMobile ? 2 : 2}>
              <Typography 
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Torque Strength: {torqueValue}
              </Typography>
              <Slider
                value={torqueValue}
                min={0.005}
                max={0.05}
                step={0.005}
                onChange={(e, val) => setTorqueValue(val)}
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Time Spent */}
            <Box mt={isMobile ? 2 : 3}>
              <Typography 
                fontWeight="bold"
                sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* End Experiment Button */}
            <Box mt={isMobile ? 2 : 3}>
              <EndExperimentButton 
                experimentName={experimentName} 
                track="physics"  
                timeSpent={timeSpent} 
                route="/torque" 
                onEnd={handleMarkComplete} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PhysicsSimulation;