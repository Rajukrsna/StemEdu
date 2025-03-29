import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const NewtonCradleExperiment = () => {
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

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: { width: 600, height: 400, wireframes: false, background: "#f4f4f4" },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Random color function (Moved Above)
    const getRandomColor = () => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    // Create Newton's Cradle
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
          render: { fillStyle: getRandomColor() }, // Now it works correctly
        });

        const string = Constraint.create({
          pointA: { x: x + i * (size * offset), y: y },
          bodyB: ball,
        });

        Composite.add(cradle, [ball, string]);
      }
      return cradle;
    };

    // Add Newton's Cradle
    const cradle = createNewtonsCradle(280, 100, 5, 30, 200);
    Composite.add(world, cradle);

    // Pull first ball to the left
    Matter.Body.translate(cradle.bodies[0], { x: -180, y: -100 });

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
  }, [isCompleted]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Simulation Section */}
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Newton's Cradle Experiment
          </Typography>
          <Box ref={sceneRef} />
        </Card>
      </Grid>

      {/* Controls & Info Section */}
      <Grid item xs={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Observe how momentum is transferred through the balls. Drag the balls to start an oscillation.
            </Typography>

            {/* Time Spent */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>

            {/* End Experiment Button */}
            <Box mt={3}>
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
  );
};

export default NewtonCradleExperiment;
