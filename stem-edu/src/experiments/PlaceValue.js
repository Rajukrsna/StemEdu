import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import EndExperimentButton from "../components/EndExperiment";

const BallDropExperiment = () => {
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
      const ball = Matter.Bodies.circle(x, 120, 15, { 
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
  
      const render = Render.create({
        element: sceneRef.current,
        engine: engine,
        options: { width: 400, height: 500, wireframes: false, background: "#e3f2fd" },
      });
  
      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);
  
      const tableX = 50;
      const tableY = 100;
      const tableWidth = 300;
      const tableHeight = 350;
      const columnWidth = tableWidth / 2;
  
      Composite.add(worldRef.current, [
        Bodies.rectangle(tableX + tableWidth / 2, tableY + tableHeight, tableWidth, 10, { isStatic: true, render: { fillStyle: "#000" } }),
        Bodies.rectangle(tableX, tableY + tableHeight / 2, 10, tableHeight, { isStatic: true, render: { fillStyle: "#000" } }),
        Bodies.rectangle(tableX + tableWidth, tableY + tableHeight / 2, 10, tableHeight, { isStatic: true, render: { fillStyle: "#000" } }),
        Bodies.rectangle(tableX + columnWidth, tableY + tableHeight / 2, 10, tableHeight, { isStatic: true, render: { fillStyle: "#000" } })
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
    }, [isCompleted]);
  
    return (
      <Grid container spacing={4} padding={4}>
        <Grid item xs={8}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Ball Drop Experiment
            </Typography>
            <Box ref={sceneRef} />
          </Card>
        </Grid>
  
        <Grid item xs={4}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Click the buttons below to drop balls into the table and observe the count of each side.
              </Typography>
  
              <Box mt={3}>
                <Typography variant="body1" fontWeight="bold">
                  Left Side Count: {leftCount}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Right Side Count: {rightCount}
                </Typography>
              </Box>
  
              <Box mt={3}>
                <Typography variant="body1" fontWeight="bold">
                  Time Spent: {timeSpent} seconds
                </Typography>
              </Box>
  
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => addBall(125, "#2196f3")}
                >
                  Add Blue Ball
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => addBall(275, "#f44336")}
                >
                  Add Red Ball
                </Button>
              </Box>
  
              <Box mt={3}>
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
    );
  };
  
  export default BallDropExperiment;
  