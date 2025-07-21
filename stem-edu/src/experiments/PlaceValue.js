import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Grid, Button, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const BallDropExperiment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sceneRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const experimentName = "Ball Drop";
  const worldRef = useRef(null); // Store the Matter.js world reference

  // **Function to Add a Ball (Now accessible to buttons)**
  const addBall = (x, color) => {
    if (!worldRef.current) return; // Ensure world is initialized
    
    // Responsive ball size and position
    const ballSize = isMobile ? 12 : 15;
    const ballX = isMobile ? x * 0.8 : x; // Scale position for mobile
    
    const ball = Matter.Bodies.circle(ballX, 120, ballSize, { 
      restitution: 0.5,
      friction: 0.05,
      density: 0.01,
      render: { fillStyle: color }
    });
    Matter.Composite.add(worldRef.current, ball);
  };

  useEffect(() => {
    let timer;
    if (!isCompleted) {
      timer = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    }

    const { Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    worldRef.current = engine.world; // Store the world reference

    // Responsive canvas dimensions
    const canvasWidth = isMobile ? 320 : 400;
    const canvasHeight = isMobile ? 400 : 500;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: { 
        width: canvasWidth, 
        height: canvasHeight, 
        wireframes: false, 
        background: "#e3f2fd" 
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Responsive table dimensions
    const tableX = isMobile ? 30 : 50;
    const tableY = isMobile ? 80 : 100;
    const tableWidth = isMobile ? 260 : 300;
    const tableHeight = isMobile ? 280 : 350;
    const columnWidth = tableWidth / 2;

    // Create table walls with responsive sizing
    Composite.add(worldRef.current, [
      // Bottom wall
      Bodies.rectangle(tableX + tableWidth / 2, tableY + tableHeight, tableWidth, 10, { 
        isStatic: true, 
        render: { fillStyle: "#000" } 
      }),
      // Left wall
      Bodies.rectangle(tableX, tableY + tableHeight / 2, 10, tableHeight, { 
        isStatic: true, 
        render: { fillStyle: "#000" } 
      }),
      // Right wall
      Bodies.rectangle(tableX + tableWidth, tableY + tableHeight / 2, 10, tableHeight, { 
        isStatic: true, 
        render: { fillStyle: "#000" } 
      }),
      // Middle divider
      Bodies.rectangle(tableX + columnWidth, tableY + tableHeight / 2, 10, tableHeight, { 
        isStatic: true, 
        render: { fillStyle: "#000" } 
      })
    ]);

    const updateBallCounts = () => {
      let left = 0;
      let right = 0;

      Composite.allBodies(worldRef.current).forEach(body => {
        if (body.label === "Circle Body") { 
          if (body.position.x < tableX + columnWidth) {
            left++;
          } else {
            right++;
          }
        }
      });

      setLeftCount(left);
      setRightCount(right);
    };

    Events.on(engine, 'afterUpdate', updateBallCounts);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(worldRef.current, mouseConstraint);
    render.mouse = mouse;

    return () => {
      clearInterval(timer);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(worldRef.current);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isCompleted, isMobile]);

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
              ⚽ Ball Drop Experiment
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

        {/* Controls - Full width on mobile, stacked below */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: isMobile ? 2 : 3, boxShadow: 3 }}>
            <CardContent>
              <Typography 
                variant="h6" 
                color="primary" 
                gutterBottom
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
              >
                📋 Instructions
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                Click the buttons below to drop balls into the table and observe the count of each side.
              </Typography>

              {/* Ball Counts */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  🔵 Left Side Count: {leftCount}
                </Typography>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  🔴 Right Side Count: {rightCount}
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

              {/* Ball Drop Buttons */}
              <Box 
                mt={isMobile ? 2 : 3} 
                display="flex" 
                flexDirection={isMobile ? "column" : "row"}
                justifyContent="space-between"
                gap={isMobile ? 1.5 : 0}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => addBall(isMobile ? 100 : 125, "#2196f3")}
                  size={isMobile ? "medium" : "large"}
                  sx={{ 
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    flex: isMobile ? 1 : 'none'
                  }}
                >
                  🔵 Add Blue Ball
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => addBall(isMobile ? 220 : 275, "#f44336")}
                  size={isMobile ? "medium" : "large"}
                  sx={{ 
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    flex: isMobile ? 1 : 'none'
                  }}
                >
                  🔴 Add Red Ball
                </Button>
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

              {/* End Experiment Button */}
              <Box mt={isMobile ? 2 : 3}>
                <EndExperimentButton
                  experimentName={experimentName}
                  timeSpent={timeSpent}
                  route="/next-experiment"
                  track="physics" 
                  onEnd={() => setIsCompleted(true)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BallDropExperiment;