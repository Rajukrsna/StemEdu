import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";

const InclinedPlaneExperiment = () => {
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
      Composite = Matter.Composite;

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

    const ground = Bodies.rectangle(300, 390, 600, 20, { isStatic: true });
    const incline = Bodies.rectangle(300, 250, 300, 20, { isStatic: true, angle: Math.PI / 6 });
    const block = Bodies.rectangle(200, 100, 40, 40, { restitution: 0.2 });

    Composite.add(world, [ground, incline, block]);

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
            Inclined Plane Experiment
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
              Observe how gravity affects an object sliding down an inclined plane.
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

export default InclinedPlaneExperiment;
