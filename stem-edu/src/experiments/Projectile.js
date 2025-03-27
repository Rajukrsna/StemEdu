import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Slider, Button, Grid } from "@mui/material";

const ProjectileMotion = () => {
  const sceneRef = useRef(null);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(10);
  const [gravity, setGravity] = useState(1);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isLaunched, setIsLaunched] = useState(false);
  
  useEffect(() => {
    let timer;
    if (isLaunched) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Body = Matter.Body;

    const engine = Engine.create();
    engine.gravity.y = gravity;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: { width: 600, height: 400, wireframes: false, background: "#e3f2fd" },
    });

    const ground = Bodies.rectangle(300, 390, 600, 20, { isStatic: true });
    const projectile = Bodies.circle(50, 350, 10, { restitution: 0.8 });

    if (isLaunched) {
      const angleRad = (angle * Math.PI) / 180;
      Body.setVelocity(projectile, {
        x: velocity * Math.cos(angleRad),
        y: -velocity * Math.sin(angleRad),
      });
    }

    Composite.add(engine.world, [ground, projectile]);
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      clearInterval(timer);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [isLaunched, angle, velocity, gravity]);

  const handleLaunch = () => {
    setIsLaunched(true);
    setTimeSpent(0);
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Experiment Canvas */}
      <Grid item xs={8}>
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Projectile Motion Experiment
          </Typography>
          <Box ref={sceneRef}></Box>
        </Card>
      </Grid>

      {/* Controls */}
      <Grid item xs={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Controls
            </Typography>

            {/* Angle Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Launch Angle ({angle}°)
              </Typography>
              <Slider value={angle} min={0} max={90} step={1} onChange={(e, value) => setAngle(value)} />
            </Box>

            {/* Velocity Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Initial Velocity ({velocity} m/s)
              </Typography>
              <Slider value={velocity} min={5} max={50} step={1} onChange={(e, value) => setVelocity(value)} />
            </Box>

            {/* Gravity Slider */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Gravity ({gravity} m/s²)
              </Typography>
              <Slider value={gravity} min={0.1} max={10} step={0.1} onChange={(e, value) => setGravity(value)} />
            </Box>

            {/* Launch Button */}
            <Box mt={3}>
              <Button variant="contained" color="primary" fullWidth onClick={handleLaunch}>
                Launch Projectile
              </Button>
            </Box>

            {/* Time Spent */}
            <Box mt={3}>
              <Typography variant="body1" fontWeight="bold">
                Time Spent: {timeSpent} seconds
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProjectileMotion;
