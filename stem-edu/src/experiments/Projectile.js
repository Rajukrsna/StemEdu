import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Slider, Button, Grid, useTheme, useMediaQuery } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const ProjectileMotion = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const sceneRef = useRef(null);
  const experimentName = "Projectile Motion";
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(10);
  const [gravity, setGravity] = useState(1);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isLaunched, setIsLaunched] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    let timer;
    if (isLaunched && !isCompleted) {
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
        background: "#e3f2fd" 
      },
    });

    // Responsive physics objects - scaled for canvas size
    const ground = Bodies.rectangle(
      canvasWidth/2, 
      canvasHeight - 10, 
      canvasWidth, 
      20, 
      { isStatic: true }
    );
    
    const projectileSize = isMobile ? 8 : 10;
    const projectile = Bodies.circle(
      isMobile ? 30 : 50, 
      canvasHeight - 40, 
      projectileSize, 
      { restitution: 0.8 }
    );

    if (isLaunched) {
      const angleRad = (angle * Math.PI) / 180;
      const scaledVelocity = isMobile ? velocity * 0.8 : velocity; // Adjust for mobile
      Body.setVelocity(projectile, {
        x: scaledVelocity * Math.cos(angleRad),
        y: -scaledVelocity * Math.sin(angleRad),
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
  }, [isLaunched, angle, velocity, gravity, isMobile, isCompleted]);

  const handleLaunch = () => {
    setIsLaunched(true);
    setTimeSpent(0);
  };

  const handleReset = () => {
    setIsLaunched(false);
    setTimeSpent(0);
    setIsCompleted(false);
  };

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
              🚀 Projectile Motion Experiment
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
                🎯 Controls
              </Typography>

              {/* Instructions */}
              <Typography 
                variant="body2" 
                color="textSecondary" 
                gutterBottom
                sx={{ fontSize: isMobile ? '0.875rem' : '0.875rem' }}
              >
                Adjust the angle, velocity, and gravity to see how they affect the projectile's path.
              </Typography>

              {/* Angle Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Launch Angle ({angle}°)
                </Typography>
                <Slider 
                  value={angle} 
                  min={0} 
                  max={90} 
                  step={1} 
                  onChange={(e, value) => setAngle(value)}
                  disabled={isLaunched}
                  marks={[
                    { value: 0, label: "0°" },
                    { value: 45, label: "45°" },
                    { value: 90, label: "90°" },
                  ]}
                  sx={{
                    mt: 1,
                    '& .MuiSlider-markLabel': {
                      fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }
                  }}
                />
              </Box>

              {/* Velocity Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Initial Velocity ({velocity} m/s)
                </Typography>
                <Slider 
                  value={velocity} 
                  min={5} 
                  max={50} 
                  step={1} 
                  onChange={(e, value) => setVelocity(value)}
                  disabled={isLaunched}
                  marks={[
                    { value: 5, label: "5" },
                    { value: 25, label: "25" },
                    { value: 50, label: "50" },
                  ]}
                  sx={{
                    mt: 1,
                    '& .MuiSlider-markLabel': {
                      fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }
                  }}
                />
              </Box>

              {/* Gravity Slider */}
              <Box mt={isMobile ? 2 : 3}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Gravity ({gravity} m/s²)
                </Typography>
                <Slider 
                  value={gravity} 
                  min={0.1} 
                  max={10} 
                  step={0.1} 
                  onChange={(e, value) => setGravity(value)}
                  marks={[
                    { value: 0.1, label: "0.1" },
                    { value: 1, label: "Earth" },
                    { value: 10, label: "10" },
                  ]}
                  sx={{
                    mt: 1,
                    '& .MuiSlider-markLabel': {
                      fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }
                  }}
                />
              </Box>

              {/* Control Buttons */}
              <Box mt={isMobile ? 2 : 3} display="flex" flexDirection="column" gap={isMobile ? 1.5 : 2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleLaunch}
                  disabled={isLaunched}
                  size={isMobile ? "medium" : "large"}
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  🚀 Launch Projectile
                </Button>

                <Button 
                  variant="outlined" 
                  color="warning" 
                  fullWidth 
                  onClick={handleReset}
                  size={isMobile ? "medium" : "large"}
                  sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  🔄 Reset Experiment
                </Button>
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
                  route="/projectile"
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

export default ProjectileMotion;