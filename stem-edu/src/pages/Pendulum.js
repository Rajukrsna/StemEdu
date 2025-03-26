import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";

const PendulumExperiment = () => {
  const sceneRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

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

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: { width: 600, height: 400, wireframes: false, background: "#f4f4f4" },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const support = Bodies.rectangle(300, 50, 200, 20, { isStatic: true });
    const pendulumBob = Bodies.circle(300, 200, 30, { restitution: 1 });

    const constraint = Constraint.create({
      bodyA: support,
      pointA: { x: 0, y: 10 },
      bodyB: pendulumBob,
      stiffness: 0.9,
      length: 150,
    });

    Composite.add(world, [support, pendulumBob, constraint]);

    return () => {
      clearInterval(timer);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isCompleted]);

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Pendulum Experiment
          </Typography>
          <Box ref={sceneRef}></Box>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Observe the motion of a pendulum and its oscillations.
            </Typography>
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>
            <Box mt={3}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => setIsCompleted(true)}
                disabled={isCompleted}
              >
                {isCompleted ? "Lab Completed" : "Mark as Complete"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PendulumExperiment;
