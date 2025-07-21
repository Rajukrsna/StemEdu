import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Grid, Slider, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const InclinedPlaneExperiment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sceneRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [angle, setAngle] = useState(30);
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

    // Responsive canvas dimensions
    const canvasWidth = isMobile ? 320 : 600;
    const canvasHeight = isMobile ? 240 : 400;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: { 
        width: canvasWidth, 
        height: canvasHeight, 
        wireframes: false, 
        background: "#f4f4f4" 
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Responsive physics objects
    const ground = Bodies.rectangle(
      canvasWidth/2, 
      canvasHeight - 10, 
      canvasWidth, 
      20, 
      { isStatic: true }
    );
    
    const incline = Bodies.rectangle(
      canvasWidth/2, 
      canvasHeight * 0.625, 
      canvasWidth * 0.5, 
      20, 
      { isStatic: true, angle: (Math.PI / 180) * angle }
    );

    // Block with responsive size
    const blockSize = isMobile ? 30 : 40;
    const block = Bodies.rectangle(
      canvasWidth * 0.33, 
      canvasHeight * 0.25, 
      blockSize, 
      blockSize, 
      {
        restitution: 0.2,
        friction: 0.05,
        density: 0.01,
      }
    );

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
  }, [isCompleted, angle, isMobile]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 4,
      paddingTop: isMobile ? "100px" : "90px", // Navbar clearance
      minHeight: "100vh"
    }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {/* Simulation Section - Full width on mobile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: isMobile ? 1 : 2, boxShadow: 3 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              align="center" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
            >
              Inclined Plane Experiment
            </Typography>
            <Box 
              ref={sceneRef} 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            />
          </Card>
        </Grid>

        {/* Controls & Info Section - Full width on mobile, stacked below */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: isMobile ? 2 : 3, boxShadow: 3 }}>
            <CardContent>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                Instructions
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                Drag the block to any position and release it to observe how it moves down the plane.
                You can also adjust the incline angle.
              </Typography>

              {/* Incline Angle Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Adjust Incline Angle ({angle}°)
                </Typography>
                <Slider
                  value={angle}
                  min={10}
                  max={60}
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={(e, newValue) => setAngle(newValue)}
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* Real-time Data */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                >
                  Velocity: {velocity} m/s
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                >
                  Position: X = {position.x}, Y = {position.y}
                </Typography>
              </Box>

              {/* Time Spent */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
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
    </Box>
  );
};

export default InclinedPlaneExperiment;