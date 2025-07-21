import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Slider, Grid, Button, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";  

const WreckingBallExperiment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sceneRef = useRef(null);
  const [frictionAir, setFrictionAir] = useState(0.005);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const experimentName = "Wrecking Ball";
  
  useEffect(() => {
    let timer;
    if (!isCompleted) {
      timer = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
    }

    const { Engine, Render, Runner, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint } = Matter;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    // Responsive canvas dimensions
    const canvasWidth = isMobile ? 320 : 600;
    const canvasHeight = isMobile ? 240 : 400;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: "#f4f4f4"
      }
    });
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Function to generate random colors
    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Responsive stack positioning and sizing
    const boxSize = isMobile ? 25 : 40;
    const rows = isMobile ? 4 : 6;
    const cols = isMobile ? 3 : 5;
    const stackX = canvasWidth * 0.6;
    const stackY = canvasHeight - 25 - boxSize * rows;
    
    let stack = Composites.stack(stackX, stackY, cols, rows, 0, 0, (x, y) => 
      Bodies.rectangle(x, y, boxSize, boxSize, { 
        render: { fillStyle: getRandomColor() } 
      })
    );

    // Responsive Wrecking Ball
    const ballSize = isMobile ? 25 : 40;
    const ballX = canvasWidth * 0.2;
    const ballY = canvasHeight * 0.6;
    let ball = Bodies.circle(ballX, ballY, ballSize, { 
      density: 0.04, 
      frictionAir 
    });
    
    // Responsive Rope Constraint
    const ropeAnchorX = canvasWidth * 0.35;
    const ropeAnchorY = isMobile ? 30 : 50;
    let rope = Constraint.create({
      pointA: { x: ropeAnchorX, y: ropeAnchorY },
      bodyB: ball
    });

    // Responsive Walls
    const walls = [
      Bodies.rectangle(canvasWidth/2, 0, canvasWidth, 20, { isStatic: true }),
      Bodies.rectangle(canvasWidth/2, canvasHeight, canvasWidth, 20, { isStatic: true }),
      Bodies.rectangle(canvasWidth, canvasHeight/2, 20, canvasHeight, { isStatic: true }),
      Bodies.rectangle(0, canvasHeight/2, 20, canvasHeight, { isStatic: true })
    ];

    // Add objects to world
    Composite.add(world, [stack, ball, rope, ...walls]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.5, render: { visible: false } }
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    return () => {
      clearInterval(timer);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [frictionAir, isCompleted, isMobile]);

  const handleMarkComplete = () => setIsCompleted(true);

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 4,
      paddingTop: isMobile ? "100px" : "90px", // Navbar clearance
      minHeight: "100vh"
    }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {/* Experiment Canvas - Full width on mobile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: isMobile ? 1 : 2, boxShadow: 3 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              align="center" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
            >
              🏗️ Wrecking Ball Experiment
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

        {/* Instruction and Controls - Full width on mobile, stacked below */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: isMobile ? 2 : 3, boxShadow: 3 }}>
            <CardContent>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                🎯 Instructions
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                This experiment simulates a wrecking ball demolishing stacked blocks. 
                Drag the ball to position it, then release to see the destruction! 
                Adjust air friction to see how it affects motion.
              </Typography>

              {/* Friction Air Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Air Friction ({frictionAir.toFixed(3)})
                </Typography>
                <Slider
                  value={frictionAir}
                  min={0}
                  max={0.1}
                  step={0.001}
                  onChange={(e, value) => setFrictionAir(value)}
                  color="primary"
                  marks={[
                    { value: 0, label: "0" },
                    { value: 0.05, label: "0.05" },
                    { value: 0.1, label: "0.1" },
                  ]}
                  sx={{
                    mt: 1,
                    '& .MuiSlider-markLabel': {
                      fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }
                  }}
                />
              </Box>

              {/* Physics Info */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                >
                  💡 <strong>Tip:</strong> Higher air friction slows down the ball more quickly. 
                  Try different values to see the effect!
                </Typography>
              </Box>

              {/* Time Spent */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  ⏳ Time Spent: {timeSpent} seconds
                </Typography>
              </Box>

              {/* Reset Button */}
              <Box mt={isMobile ? 2 : 3}>
                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  onClick={() => window.location.reload()}
                  size={isMobile ? "medium" : "large"}
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  🔄 Reset Experiment
                </Button>
              </Box>

              {/* Mark as Complete Button */}
              <Box mt={isMobile ? 2 : 3}>
                <EndExperimentButton
                  experimentName={experimentName}
                  timeSpent={timeSpent}
                  route="/wrecking-ball"
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

export default WreckingBallExperiment;