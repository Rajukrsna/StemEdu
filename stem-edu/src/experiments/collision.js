import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Slider, Grid, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";  

const CollisionExperiment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sceneRef = useRef(null);
  const [restitution, setRestitution] = useState(1);
  const [friction, setFriction] = useState(0);
  const [frictionAir, setFrictionAir] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const experimentName = "Collision";

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
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    const world = engine.world;
    engine.gravity.x = 0;
    engine.gravity.y = 0;

    // Responsive canvas dimensions
    const canvasWidth = isMobile ? 300 : 600;
    const canvasHeight = isMobile ? 200 : 400;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: "#f4f4f4",
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    let balls = [];
    let numBalls = isMobile ? 25 : 50; // Fewer balls on mobile
    for (let i = 0; i < numBalls; i++) {
      let ball = Bodies.circle(
        50 + i * (isMobile ? 5 : 10), 
        10, 
        isMobile ? 8 : 10, // Smaller balls on mobile
        {
          restitution,
          friction,
          frictionAir,
          render: { fillStyle: "blue" },
        }
      );

      Body.setVelocity(ball, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });

      balls.push(ball);
    }
    Composite.add(world, balls);

    // Responsive walls
    const walls = [
      Bodies.rectangle(canvasWidth/2, 0, canvasWidth, 20, { isStatic: true }),
      Bodies.rectangle(canvasWidth/2, canvasHeight, canvasWidth, 20, { isStatic: true }),
      Bodies.rectangle(canvasWidth, canvasHeight/2, 20, canvasHeight, { isStatic: true }),
      Bodies.rectangle(0, canvasHeight/2, 20, canvasHeight, { isStatic: true }),
    ];
    Composite.add(world, walls);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } },
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
  }, [restitution, friction, frictionAir, isCompleted, isMobile]);

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
        {/* Experiment Canvas - Full width on mobile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: isMobile ? 1 : 2, boxShadow: 3 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              align="center" 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
            >
              Collision Experiment
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
                Instructions
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                This experiment simulates balls colliding inside a container. Adjust the physics properties using the sliders below.
              </Typography>

              {/* Restitution Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Restitution ({restitution})
                </Typography>
                <Slider
                  value={restitution}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e, value) => setRestitution(value)}
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* Friction Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Friction ({friction})
                </Typography>
                <Slider
                  value={friction}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e, value) => setFriction(value)}
                  color="secondary"
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* Air Friction Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Air Friction ({frictionAir})
                </Typography>
                <Slider
                  value={frictionAir}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e, value) => setFrictionAir(value)}
                  color="success"
                  sx={{ mt: 1 }}
                />
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
                  route="/collision"
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

export default CollisionExperiment;