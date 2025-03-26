import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography, Chip } from "@mui/material";
import { Code, Science, Calculate, AutoStories } from "@mui/icons-material"; // Icons for categories

const assessments = [
  { title: "Programming for AI with Python", category: "Python", icon: <Code /> },
  { title: "Model Development for AI Engineers", category: "Python", icon: <Code />, status: "Calibrating" },
  { title: "AWS Cloud Practitioner", category: "Theory", icon: <AutoStories />, status: "Calibrating" },
  { title: "Azure Fundamentals", category: "Theory", icon: <AutoStories /> },
  { title: "Data Storytelling", category: "STEM", icon: <Calculate /> },
  { title: "AI Fundamentals", category: "STEM", icon: <Calculate /> },
  { title: "Quantum Mechanics Basics", category: "Physics", icon: <Science /> },
  { title: "Organic Chemistry Reactions", category: "Chemistry", icon: <Science /> }
];

const categories = ["All", "Physics", "Chemistry", "Science", "Technology", "Engineering", "Mathematics"];  

const AssessmentUI = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAssessments = selectedCategory === "All"
    ? assessments
    : assessments.filter(a => a.category === selectedCategory);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Category Filter Buttons */}
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        {filteredAssessments.length} Assessments
      </Typography>

      {/* Assessment Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
        {filteredAssessments.map((test, index) => (
          <Card key={index} sx={{ padding: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">ASSESSMENT</Typography>
              {test.status && (
                <Chip
                  label={test.status}
                  color="secondary"
                  sx={{ position: "absolute", top: 10, right: 10 }}
                />
              )}
              <Typography variant="h6" sx={{ mt: 1 }}>{test.title}</Typography>

              {/* Category & Actions */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {test.icon}
                  <Typography variant="body2">{test.category}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" sx={{ textTransform: "none" }}>Topics</Button>
                  <Button variant="outlined" size="small"
                  onClick = {() => alert("Start Assessment")} 
                  >Start</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AssessmentUI;
