import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const NewtonCradleExperiment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sceneRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const experimentName = "Newton's Cradle";

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
      Constraint = Matter.Constraint,
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

    // Random color function
    const getRandomColor = () => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    // Responsive Newton's Cradle
    const createNewtonsCradle = (x, y, count, size, length) => {
      const cradle = Composite.create({ label: "Newtons Cradle" });

      for (let i = 0; i < count; i++) {
        const offset = 1.9;
        const ball = Bodies.circle(x + i * (size * offset), y + length, size, {
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          slop: size * 0.02,
          label: "Ball",
          render: { fillStyle: getRandomColor() },
        });

        const string = Constraint.create({
          pointA: { x: x + i * (size * offset), y: y },
          bodyB: ball,
        });

        Composite.add(cradle, [ball, string]);
      }
      return cradle;
    };

    // Responsive cradle parameters
    const cradleX = isMobile ? canvasWidth * 0.3 : 280;
    const cradleY = isMobile ? 40 : 100;
    const ballSize = isMobile ? 20 : 30;
    const ballCount = isMobile ? 4 : 5; // Fewer balls on mobile
    const stringLength = isMobile ? 120 : 200;

    // Add Newton's Cradle
    const cradle = createNewtonsCradle(cradleX, cradleY, ballCount, ballSize, stringLength);
    Composite.add(world, cradle);

    // Pull first ball to the left - scaled for mobile
    const pullX = isMobile ? -100 : -180;
    const pullY = isMobile ? -60 : -100;
    Matter.Body.translate(cradle.bodies[0], { x: pullX, y: pullY });

    // Change color on collision
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA.label === "Ball") {
          pair.bodyA.render.fillStyle = getRandomColor();
        }
        if (pair.bodyB.label === "Ball") {
          pair.bodyB.render.fillStyle = getRandomColor();
        }
      });
    });

    // Add mouse support
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);

    // Cleanup
    return () => {
      clearInterval(timer);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isCompleted, isMobile]);

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
              ⚖️ Newton's Cradle Experiment
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
                📜 Instructions
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                Observe how momentum is transferred through the balls. Drag the balls to start an oscillation and watch the conservation of energy in action!
              </Typography>

              {/* Physics Explanation */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}
                >
                  💡 <strong>Physics Concept:</strong> When one ball hits the others, momentum and energy transfer through the stationary balls, causing the ball on the opposite end to swing out with nearly the same velocity.
                </Typography>
              </Box>

              {/* Interactive Tips */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body2" 
                  color="primary"
                  sx={{ 
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    fontStyle: 'italic'
                  }}
                >
                  🖱️ <strong>Try this:</strong> Drag multiple balls and release them simultaneously to see different effects!
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

              {/* End Experiment Button */}
              <Box mt={isMobile ? 2 : 3}>
                <EndExperimentButton
                  experimentName={experimentName}
                  timeSpent={timeSpent}
                  route="/newton-cradle"
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

export default NewtonCradleExperiment;