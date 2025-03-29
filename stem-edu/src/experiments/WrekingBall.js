import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Slider, Grid, Button } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";  

const WreckingBallExperiment = () => {
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

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 400,
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

    // Create a stack of boxes
    const rows = 6;
    let stack = Composites.stack(300, 400 - 25 - 40 * rows, 5, rows, 0, 0, (x, y) => 
      Bodies.rectangle(x, y, 40, 40, { render: { fillStyle: getRandomColor() } })
    );

    // Create Wrecking Ball
    let ball = Bodies.circle(100, 300, 40, { density: 0.04, frictionAir });
    
    // Create Rope Constraint
    let rope = Constraint.create({
      pointA: { x: 200, y: 50 },
      bodyB: ball
    });

    // Walls
    const walls = [
      Bodies.rectangle(300, 0, 600, 20, { isStatic: true }),
      Bodies.rectangle(300, 400, 600, 20, { isStatic: true }),
      Bodies.rectangle(600, 200, 20, 400, { isStatic: true }),
      Bodies.rectangle(0, 200, 20, 400, { isStatic: true })
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
  }, [frictionAir, isCompleted]);

  const handleMarkComplete = () => setIsCompleted(true);

  return (
    <Grid container spacing={4} padding={4}>
      {/* Experiment Canvas */}
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Wrecking Ball Experiment
          </Typography>
          <Box ref={sceneRef}></Box>
        </Card>
      </Grid>

      {/* Instruction and Controls */}
      <Grid item xs={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This experiment simulates a wrecking ball demolishing stacked blocks. Adjust the air friction to see how it affects motion.
            </Typography>

            {/* Friction Air Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Air Friction ({frictionAir.toFixed(3)})
              </Typography>
              <Slider
                value={frictionAir}
                min={0}
                max={0.1}
                step={0.001}
                onChange={(e, value) => setFrictionAir(value)}
                color="primary"
              />
            </Box>

            {/* Time Spent */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* Mark as Complete Button */}
            <Box mt={3}>
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
  );
};

export default WreckingBallExperiment;
