import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Slider, Grid, Button } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";  
const CollisionExperiment = () => {
  const sceneRef = useRef(null);
  const [restitution, setRestitution] = useState(1);
  const [friction, setFriction] = useState(0);
  const [frictionAir, setFrictionAir] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
const experimentName= "Collision"
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

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: "#f4f4f4",
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    let balls = [];
    let numBalls = 50;
    for (let i = 0; i < numBalls; i++) {
      let ball = Bodies.circle(50 + i * 10, 10, 10, {
        restitution,
        friction,
        frictionAir,
        render: { fillStyle: "blue" },
      });

      Body.setVelocity(ball, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });

      balls.push(ball);
    }
    Composite.add(world, balls);

    const walls = [
      Bodies.rectangle(300, 0, 600, 20, { isStatic: true }),
      Bodies.rectangle(300, 400, 600, 20, { isStatic: true }),
      Bodies.rectangle(600, 200, 20, 400, { isStatic: true }),
      Bodies.rectangle(0, 200, 20, 400, { isStatic: true }),
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
  }, [restitution, friction, frictionAir, isCompleted]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    alert(`Lab marked as completed! You spent ${timeSpent} seconds in the lab.`);
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Experiment Canvas */}
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Collision Experiment
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
              This experiment simulates balls colliding inside a container. Adjust the physics properties using the sliders below.
            </Typography>

            {/* Restitution Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Restitution ({restitution})
              </Typography>
              <Slider
                value={restitution}
                min={0}
                max={1}
                step={0.1}
                onChange={(e, value) => setRestitution(value)}
                color="primary"
              />
            </Box>

            {/* Friction Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Friction ({friction})
              </Typography>
              <Slider
                value={friction}
                min={0}
                max={1}
                step={0.1}
                onChange={(e, value) => setFriction(value)}
                color="secondary"
              />
            </Box>

            {/* Air Friction Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Air Friction ({frictionAir})
              </Typography>
              <Slider
                value={frictionAir}
                min={0}
                max={1}
                step={0.1}
                onChange={(e, value) => setFrictionAir(value)}
                color="success"
              />
            </Box>

            {/* Time Spent */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* Mark as Complete Button */}
            {/* End Experiment Button */}
            <Box mt={3}>
              <EndExperimentButton
                experimentName={experimentName}
                timeSpent={timeSpent}
                route="/collision"
                onEnd={handleMarkComplete}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CollisionExperiment;
