import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Button, Grid, Slider, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const PendulumExperiment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sceneRef = useRef(null);
  const experimentName = "Pendulum Experiment";

  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [engine, setEngine] = useState(null);
  const [runner, setRunner] = useState(null);
  const [render, setRender] = useState(null);
  const [gravity, setGravity] = useState(1);

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
    world.gravity.y = gravity;

    // Responsive canvas dimensions
    const canvasWidth = isMobile ? 320 : 600;
    const canvasHeight = isMobile ? 240 : 400;

    const renderInstance = Render.create({
      element: sceneRef.current,
      engine: engineInstance,
      options: { 
        width: canvasWidth, 
        height: canvasHeight, 
        wireframes: false, 
        background: "#f0f8ff" 
      },
    });

    const runnerInstance = Runner.create();
    Render.run(renderInstance);
    Runner.run(runnerInstance, engineInstance);

    // Responsive physics objects - scale for mobile
    const supportWidth = isMobile ? 120 : 200;
    const supportX = canvasWidth / 2;
    const supportY = isMobile ? 30 : 50;
    
    const support = Bodies.rectangle(
      supportX, 
      supportY, 
      supportWidth, 
      20, 
      { isStatic: true, render: { fillStyle: "#333" } }
    );

    const bobSize = isMobile ? 20 : 30;
    const bobX = supportX + (isMobile ? 50 : 100);
    const bobY = isMobile ? 150 : 250;
    
    const pendulumBob = Bodies.circle(
      bobX, 
      bobY, 
      bobSize, 
      { restitution: 1, render: { fillStyle: "#ff5722" } }
    );

    const constraintLength = isMobile ? 100 : 150;
    const constraint = Constraint.create({
      bodyA: support,
      pointA: { x: 0, y: 10 },
      bodyB: pendulumBob,
      stiffness: 0.9,
      length: constraintLength,
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
  }, [isCompleted, gravity, isMobile]);

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
    <Box sx={{ 
      p: isMobile ? 1 : 4,
      paddingTop: isMobile ? "100px" : "90px", // Navbar clearance
      minHeight: "100vh"
    }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {/* Pendulum Simulation - Full width on mobile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: isMobile ? 1 : 2, boxShadow: 3, bgcolor: "#ffffff" }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              align="center" 
              gutterBottom 
              fontWeight="bold" 
              color="primary"
              sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
            >
              🕰️ Pendulum Experiment
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

        {/* Instructions and Controls - Full width on mobile, stacked below */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: isMobile ? 2 : 3, boxShadow: 3, bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography 
                variant="h6" 
                color="secondary" 
                fontWeight="bold" 
                gutterBottom
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                📜 Instructions
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                Observe how the pendulum moves and interacts with gravity. You can adjust gravity to see its effect.
              </Typography>

              {/* Gravity Control */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
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
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                  ]}
                  sx={{ 
                    mt: 1,
                    '& .MuiSlider-markLabel': {
                      fontSize: isMobile ? '0.75rem' : '0.875rem'
                    }
                  }}
                />
              </Box>

              {/* Timer Display */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  ⏳ Time Spent: {timeSpent} seconds
                </Typography>
              </Box>

              {/* Buttons */}
              <Box mt={isMobile ? 2 : 3} display="flex" flexDirection="column" gap={isMobile ? 1.5 : 2}>
                <Button 
                  variant="contained" 
                  color="warning" 
                  fullWidth 
                  onClick={handleReset}
                  size={isMobile ? "medium" : "large"}
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  🔄 Restart Experiment
                </Button>

                <Button
                  variant="contained"
                  color={isCompleted ? "success" : "primary"}
                  fullWidth
                  onClick={handleMarkComplete}
                  disabled={isCompleted}
                  size={isMobile ? "medium" : "large"}
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
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
    </Box>
  );
};

export default PendulumExperiment;