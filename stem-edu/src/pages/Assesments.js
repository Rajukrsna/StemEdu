import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Modal, 
  Radio, 
  RadioGroup, 
  FormControlLabel,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Stack,
  IconButton,
  Fade,
  Grid
} from "@mui/material";
import { 
  Science, 
  Calculate, 
  AutoStories, 
  Functions, 
  Biotech, 
  Engineering,
  Close as CloseIcon,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  School
} from "@mui/icons-material";
import { 
  Award, 
  Trophy, 
  Target, 
  Zap, 
  BookOpen, 
  FolderOpen, 
  Clock, 
  FileText, 
  Star 
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock data for assessments
const assessments = [
  { 
    title: "General_Mathematics", 
    category: "Mathematics", 
    icon: <Functions />, 
    track: "maths",
    difficulty: "Intermediate",
    duration: "15 min",
    questions: 10,
    color: "#2196F3"
  },
  { 
    title: "Newtonian_Laws_and_Physics", 
    category: "Physics", 
    icon: <Biotech />, 
    status: "Calibrating", 
    track: "physics",
    difficulty: "Advanced",
    duration: "20 min",
    questions: 10,
    color: "#FF5722"
  },
  { 
    title: "Human_Anatomy", 
    category: "Science", 
    icon: <AutoStories />, 
    status: "Calibrating", 
    track: "biology",
    difficulty: "Beginner",
    duration: "12 min",
    questions: 10,
    color: "#4CAF50"
  },
  { 
    title: "Fluid_Mechanics", 
    category: "Physics", 
    icon: <Engineering />, 
    track: "physics",
    difficulty: "Advanced",
    duration: "18 min",
    questions: 10,
    color: "#FF5722"
  },
  { 
    title: "Data_Storytelling", 
    category: "Engineering", 
    icon: <Calculate />, 
    track: "physics",
    difficulty: "Intermediate",
    duration: "15 min",
    questions: 10,
    color: "#9C27B0"
  },
  { 
    title: "AI_Fundamentals", 
    category: "Technology", 
    icon: <Calculate />, 
    track: "physics",
    difficulty: "Intermediate",
    duration: "16 min",
    questions: 10,
    color: "#607D8B"
  },
  { 
    title: "Quantum_Mechanics_Basics", 
    category: "Physics", 
    icon: <Science />, 
    track: "physics",
    difficulty: "Expert",
    duration: "25 min",
    questions: 10,
    color: "#FF5722"
  },
  { 
    title: "Organic_Chemistry_Reactions", 
    category: "Chemistry", 
    icon: <Science />, 
    track: "chemistry",
    difficulty: "Advanced",
    duration: "22 min",
    questions: 10,
    color: "#FF9800"
  },
];

const categories = ["All", "Physics", "Chemistry", "Science", "Technology", "Engineering", "Mathematics"];
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AssessmentUI = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);

  const userId = localStorage.getItem("userId");

  const questionsData = {
    General_Mathematics: [
        { question: "Solve for x: 3x - 7 = 11", options: ["2", "3", "6", "5"], correct: "6" },
        { question: "What is the Least Common Multiple (LCM) of 12 and 18?", options: ["36", "24", "18", "12"], correct: "36" },
        { question: "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?", options: ["30 cm²", "40 cm²", "45 cm²", "50 cm²"], correct: "40 cm²" },
        { question: "Convert 34 3/4 into a decimal.", options: ["34.3", "34.75", "35.5", "33.25"], correct: "34.75" },
        { question: "A car travels 150 miles in 3 hours. What is its average speed?", options: ["30 mph", "50 mph", "60 mph", "45 mph"], correct: "50 mph" },
        { question: "What is the sum of the interior angles of a pentagon?", options: ["360°", "540°", "720°", "180°"], correct: "540°" },
        { question: "Factorize: x² - 9x + 20", options: ["(x-5)(x-4)", "(x-4)(x+5)", "(x+4)(x+5)", "(x-3)(x-7)"], correct: "(x-5)(x-4)" },
        { question: "What is the probability of rolling an even number on a standard six-sided die?", options: ["1/3", "1/2", "2/3", "1/6"], correct: "1/2" },
        { question: "Solve for x: 2x² - 8 = 0", options: ["x=±2", "x=±4", "x=0", "x=8"], correct: "x=±2" },
        { question: "If the interest rate is 5% per year, how much interest will be earned on $1000 after 2 years?", options: ["$50", "$100", "$200", "$150"], correct: "$100" }
    ],
    Newtonian_Laws_and_Physics: [
        { question: "Which law states that an object in motion stays in motion unless acted upon by an external force?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Inertia"], correct: "Newton's First Law" },
        { question: "What is the equation representing Newton’s Second Law?", options: ["F=ma", "E=mc²", "P=IV", "V=IR"], correct: "F=ma" },
        { question: "A 10 kg object is pushed with a force of 50 N. What is its acceleration?", options: ["5 m/s²", "10 m/s²", "50 m/s²", "0.5 m/s²"], correct: "5 m/s²" },
        { question: "How does Newton’s Third Law explain rocket propulsion?", options: ["Action and reaction forces", "Gravity", "Acceleration", "Momentum conservation"], correct: "Action and reaction forces" },
        { question: "What force keeps an object at rest according to Newton’s First Law?", options: ["Friction", "Gravity", "Normal force", "Inertia"], correct: "Inertia" },
        { question: "If a person applies a force on a wall and the wall doesn’t move, which law is demonstrated?", options: ["First Law", "Second Law", "Third Law", "Law of Conservation"], correct: "Third Law" },
        { question: "How does mass affect acceleration according to Newton’s Second Law?", options: ["Higher mass, lower acceleration", "Higher mass, higher acceleration", "Mass has no effect", "Acceleration is constant"], correct: "Higher mass, lower acceleration" },
        { question: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], correct: "Newton" },
        { question: "Why do passengers lurch forward when a car suddenly stops?", options: ["Inertia", "Momentum", "Gravity", "Friction"], correct: "Inertia" },
        { question: "Give a real-life example of Newton’s Third Law.", options: ["Walking", "Driving a car", "Throwing a ball", "Jumping off a boat"], correct: "Jumping off a boat" }
    ],
    Human_Anatomy: [
        { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], correct: "Skin" },
        { question: "Which organ is responsible for filtering blood in the body?", options: ["Liver", "Kidney", "Heart", "Lungs"], correct: "Kidney" },
        { question: "What is the function of the alveoli in the lungs?", options: ["Oxygen exchange", "Blood filtration", "Nutrient absorption", "Hormone secretion"], correct: "Oxygen exchange" },
        { question: "Which part of the brain controls voluntary movements?", options: ["Cerebrum", "Cerebellum", "Medulla", "Pons"], correct: "Cerebrum" },
        { question: "Name the longest bone in the human body.", options: ["Femur", "Tibia", "Humerus", "Radius"], correct: "Femur" },
        { question: "What is the primary function of red blood cells?", options: ["Oxygen transport", "Immunity", "Blood clotting", "Digestive function"], correct: "Oxygen transport" },
        { question: "Which organ produces insulin?", options: ["Liver", "Pancreas", "Kidney", "Spleen"], correct: "Pancreas" },
        { question: "What is the function of the small intestine?", options: ["Digest food", "Absorb nutrients", "Store waste", "Produce hormones"], correct: "Absorb nutrients" },
        { question: "Which system in the body is responsible for hormone regulation?", options: ["Endocrine system", "Nervous system", "Circulatory system", "Digestive system"], correct: "Endocrine system" },
        { question: "What is the main function of the spinal cord?", options: ["Transmit signals", "Pump blood", "Store energy", "Produce enzymes"], correct: "Transmit signals" }
    ],
    Fluid_Mechanics: [
      { question: "What is the SI unit of pressure?", options: ["Pascal", "Newton", "Joule", "Watt"], correct: "Pascal" },
      { question: "What principle explains why ships float?", options: ["Archimedes' Principle", "Bernoulli's Principle", "Pascal's Principle", "Newton's Law"], correct: "Archimedes' Principle" },
      { question: "How does viscosity affect fluid flow?", options: ["Increases resistance", "Decreases resistance", "No effect", "Increases speed"], correct: "Increases resistance" },
      { question: "What is Bernoulli’s Principle?", options: ["Increase in speed decreases pressure", "Decrease in speed increases pressure", "Speed and pressure are independent", "Fluid follows a linear path"], correct: "Increase in speed decreases pressure" },
      { question: "What is the difference between laminar and turbulent flow?", options: ["Smooth vs chaotic flow", "Fast vs slow flow", "Thick vs thin fluid", "High vs low pressure"], correct: "Smooth vs chaotic flow" },
      { question: "How does Pascal’s Principle apply to hydraulic systems?", options: ["Force is transmitted equally in fluid", "Fluid changes shape", "Fluid moves faster", "Pressure decreases"], correct: "Force is transmitted equally in fluid" },
      { question: "What is the equation of continuity in fluid dynamics?", options: ["A1V1 = A2V2", "F=ma", "P=IV", "V=IR"], correct: "A1V1 = A2V2" },
      { question: "Define Reynolds number and its significance.", options: ["Predicts flow type", "Measures fluid pressure", "Calculates viscosity", "Determines speed"], correct: "Predicts flow type" },
      { question: "What is the effect of increasing temperature on the viscosity of a liquid?", options: ["Decreases viscosity", "Increases viscosity", "No effect", "Increases pressure"], correct: "Decreases viscosity" },
      { question: "How does the Venturi effect work in a pipe?", options: ["Narrower section increases speed and decreases pressure", "Wider section increases speed", "Fluid remains constant", "Pressure increases in narrow section"], correct: "Narrower section increases speed and decreases pressure" }
  ],
  Data_Storytelling: [
      { question: "What is the primary goal of data storytelling?", options: ["Communicate insights", "Make data look good", "Store data", "Analyze numbers"], correct: "Communicate insights" },
      { question: "What are the three key elements of data storytelling?", options: ["Data, visuals, narrative", "Graphs, charts, numbers", "AI, ML, statistics", "Tables, spreadsheets, dashboards"], correct: "Data, visuals, narrative" },
      { question: "How does data visualization help in storytelling?", options: ["Makes data easier to understand", "Adds complexity", "Reduces accuracy", "Removes patterns"], correct: "Makes data easier to understand" },
      { question: "What is the role of audience analysis in data storytelling?", options: ["Tailors message to audience", "Has no impact", "Only affects color choice", "Irrelevant to storytelling"], correct: "Tailors message to audience" },
      { question: "Name one common tool used for data visualization.", options: ["Tableau", "Excel", "Notepad", "Word"], correct: "Tableau" },
      { question: "Why is it important to remove biases in data storytelling?", options: ["Ensures accuracy", "Makes it look better", "Increases engagement", "Bias is unavoidable"], correct: "Ensures accuracy" },
      { question: "What type of graph is best for showing trends over time?", options: ["Line graph", "Pie chart", "Bar chart", "Histogram"], correct: "Line graph" },
      { question: "How can storytelling make data-driven decisions more impactful?", options: ["Engages the audience", "Removes uncertainty", "Hides complexity", "Avoids visualization"], correct: "Engages the audience" },
      { question: "What is an example of a misleading data visualization?", options: ["Truncated Y-axis", "Properly scaled graph", "Balanced comparison", "Correctly labeled chart"], correct: "Truncated Y-axis" },
      { question: "What is a data narrative?", options: ["A story told using data", "Random numbers", "Unstructured data", "A chart"], correct: "A story told using data" }
  ],
  AI_Fundamentals: [
      { question: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Information", "Applied Informatics", "Advanced Innovation"], correct: "Artificial Intelligence" },
      { question: "What is the difference between machine learning and deep learning?", options: ["Deep learning uses neural networks", "They are the same", "ML is hardware-based", "DL does not use data"], correct: "Deep learning uses neural networks" },
      { question: "What is the Turing Test?", options: ["A test for AI intelligence", "A computer speed test", "A game theory model", "A math theorem"], correct: "A test for AI intelligence" },
      { question: "What are the three main types of AI?", options: ["Narrow, General, Super", "Fast, Slow, Medium", "Cloud, Edge, Hybrid", "Reactive, Predictive, Generative"], correct: "Narrow, General, Super" },
      { question: "What is supervised learning?", options: ["Training AI with labeled data", "Training AI with no data", "Training AI with random data", "Training AI using only images"], correct: "Training AI with labeled data" },
      { question: "What is an artificial neural network?", options: ["A model inspired by the human brain", "A cloud server", "A data storage system", "A statistical method"], correct: "A model inspired by the human brain" },
      { question: "Name one real-world application of AI.", options: ["Self-driving cars", "Washing machines", "Printed books", "Handwritten letters"], correct: "Self-driving cars" },
      { question: "What is the main purpose of Natural Language Processing (NLP)?", options: ["Understand human language", "Generate random numbers", "Encrypt data", "Analyze images"], correct: "Understand human language" },
      { question: "What is reinforcement learning?", options: ["AI learns by trial and error", "AI learns from humans", "AI follows fixed rules", "AI does not learn"], correct: "AI learns by trial and error" },
      { question: "What ethical concerns arise with AI development?", options: ["Bias, privacy, job loss", "No concerns", "Only speed issues", "It is always ethical"], correct: "Bias, privacy, job loss" }
  ],
  Quantum_Mechanics_Basics: [
    { question: "What is the fundamental unit of quantum information?", options: ["Qubit", "Bit", "Photon", "Electron"], correct: "Qubit" },
    { question: "What principle states that a particle’s position and momentum cannot both be precisely known?", options: ["Uncertainty Principle", "Superposition Principle", "Pauli Exclusion Principle", "Quantum Entanglement"], correct: "Uncertainty Principle" },
    { question: "What is quantum superposition?", options: ["A particle existing in multiple states simultaneously", "A particle's fixed state", "A classical physics concept", "A method for measuring particles"], correct: "A particle existing in multiple states simultaneously" },
    { question: "What is quantum entanglement?", options: ["A strong correlation between particles", "A particle's spin", "A measurement method", "A classical mechanics concept"], correct: "A strong correlation between particles" },
    { question: "What does Schrödinger’s cat thought experiment illustrate?", options: ["Quantum superposition", "Wave-particle duality", "Quantum entanglement", "Uncertainty principle"], correct: "Quantum superposition" },
    { question: "What is the wave-particle duality of light?", options: ["Light behaves as both a wave and a particle", "Light is only a wave", "Light is only a particle", "Light has no defined nature"], correct: "Light behaves as both a wave and a particle" },
    { question: "What is Planck’s constant used for?", options: ["Relating energy and frequency", "Measuring mass", "Determining temperature", "Measuring velocity"], correct: "Relating energy and frequency" },
    { question: "What is a qubit?", options: ["A unit of quantum information", "A classical bit", "A type of transistor", "A chemical compound"], correct: "A unit of quantum information" },
    { question: "How do quantum computers differ from classical computers?", options: ["They use qubits instead of bits", "They use only mechanical parts", "They are slower", "They use conventional binary logic"], correct: "They use qubits instead of bits" },
    { question: "What is the uncertainty principle?", options: ["It limits precise knowledge of position and momentum", "It defines atomic structure", "It explains wave interference", "It is a principle of classical physics"], correct: "It limits precise knowledge of position and momentum" }
],
Organic_Chemistry_Reactions: [
    { question: "What type of reaction forms an ester from a carboxylic acid and an alcohol?", options: ["Esterification", "Hydrolysis", "Oxidation", "Reduction"], correct: "Esterification" },
    { question: "What is a nucleophile?", options: ["An electron donor", "An electron acceptor", "A neutral molecule", "A charged molecule"], correct: "An electron donor" },
    { question: "What happens in an oxidation reaction?", options: ["Loss of electrons", "Gain of electrons", "Formation of water", "Formation of a precipitate"], correct: "Loss of electrons" },
    { question: "What is the general formula for an alkene?", options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"], correct: "CnH2n" },
    { question: "What catalyst is commonly used in hydrogenation reactions?", options: ["Nickel", "Iron", "Gold", "Copper"], correct: "Nickel" },
    { question: "What is a polymerization reaction?", options: ["Formation of polymers from monomers", "Breaking down of polymers", "Formation of salts", "Oxidation reaction"], correct: "Formation of polymers from monomers" },
    { question: "How do substitution and elimination reactions differ?", options: ["Substitution replaces an atom; elimination removes a group", "Both replace atoms", "Both remove groups", "Both are identical processes"], correct: "Substitution replaces an atom; elimination removes a group" },
    { question: "What is Markovnikov’s rule in addition reactions?", options: ["The hydrogen adds to the carbon with more hydrogen atoms", "The hydrogen adds to the carbon with fewer hydrogen atoms", "Atoms are added randomly", "The reaction does not follow a rule"], correct: "The hydrogen adds to the carbon with more hydrogen atoms" },
    { question: "What is an electrophile?", options: ["An electron acceptor", "An electron donor", "A neutral molecule", "A non-reactive species"], correct: "An electron acceptor" },
    { question: "What is the difference between SN1 and SN2 reactions?", options: ["SN1 is two-step, SN2 is one-step", "Both are the same", "SN1 is one-step, SN2 is two-step", "SN2 involves a carbocation intermediate"], correct: "SN1 is two-step, SN2 is one-step" }
]

    // Add other question sets here...
  }

  const filteredAssessments = selectedCategory === "All"
    ? assessments
    : assessments.filter(a => a.category === selectedCategory);

  const handleOptionChange = (event) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: event.target.value });
  };

  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment); 
    setOpenModal(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    const category = assessment.title;
    setQuestions(questionsData[category] || []); 
  };
  
  const handleSubmit = async () => {
    const correctAnswers = questions.filter((q, i) => selectedAnswers[i] === q.correct).length;
    if (correctAnswers >= 5) {
      try {
        await axios.post(`${backendUrl}/api/saveAssesment`, {
          userId, 
          track: selectedAssessment.track
        });
        toast.success("10 XP added to your account!", { position: "top-right" });
      } catch (error) {
        toast.error("Error saving assessment. Please try again.", { position: "top-right" });
      }
    } else {
      toast.error("Not enough correct answers. Please reattempt the test!", { position: "top-right" });
    }
    setTimeout(() => setOpenModal(false), 3000);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': '#4CAF50',
      'Intermediate': '#FF9800', 
      'Advanced': '#FF5722',
      'Expert': '#9C27B0'
    };
    return colors[difficulty] || '#757575';
  };

  const getDifficultyIcon = (difficulty) => {
    const icons = {
      'Beginner': <Target size={16} />,
      'Intermediate': <Award size={16} />,
      'Advanced': <Trophy size={16} />,
      'Expert': <Zap size={16} />
    };
    return icons[difficulty] || <School />;
  };

  return (
    <Box 
     sx={{ 
    p: isMobile ? 2 : 4,
    maxWidth: '100%',
    minHeight: '100vh',
   
  }}
      className={isMobile ? "mobile-full-width" : ""}
    >
      <ToastContainer />
      
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <BookOpen size={isMobile ? 24 : 32} color="#2196F3" />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              fontWeight: 'bold', 
              background: 'linear-gradient(45deg, #2196F3, #9C27B0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Assessment Center
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}
        >
          Test your knowledge and earn XP points!
        </Typography>
      </Box>

      {/* Category Filter - Mobile Responsive */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <FolderOpen size={20} color="#666" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Categories
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: "flex", 
            gap: 1, 
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start"
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              onClick={() => setSelectedCategory(cat)}
              sx={{
                minWidth: isMobile ? "auto" : "100px",
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                px: isMobile ? 1.5 : 2,
                py: isMobile ? 0.5 : 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal'
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Assessment Count */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Target size={20} color="#FF5722" />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: isMobile ? '1.1rem' : '1.25rem'
          }}
        >
          {filteredAssessments.length} Assessments Available
        </Typography>
      </Box>

      {/* Assessment Cards - Responsive Grid */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {filteredAssessments.map((test, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                minHeight: '320px',        // Add minimum height
                borderRadius: 3,
                position: "relative",
                transition: "all 0.3s ease",
                border: `2px solid ${test.color}20`,
                background: `linear-gradient(135deg, ${test.color}08, ${test.color}03)`,
                "&:hover": {
                  transform: isMobile ? "none" : "translateY(-8px)",
                  boxShadow: `0 12px 24px ${test.color}30`,
                  border: `2px solid ${test.color}40`
                }
              }}
            >
              <CardContent sx={{ p: isMobile ? 2 : 3, 
                   pb: isMobile ? 2 : 3,    // Remove extra bottom padding
            height: '100%',           // Add this
            display: 'flex',          // Add this
            flexDirection: 'column',  
                 }}>
                {/* Status Chip */}
                {test.status && (
                  <Chip 
                    label={test.status} 
                    color="secondary" 
                    size="small"
                    sx={{ 
                      position: "absolute", 
                      top: 12, 
                      right: 12,
                      fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }} 
                  />
                )}

                {/* Assessment Type */}
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary"
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: isMobile ? '0.7rem' : '0.75rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  ASSESSMENT
                </Typography>

                {/* Title */}
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  sx={{ 
                    mt: 1, 
                    mb: 2,
                    fontWeight: 'bold',
                    color: test.color,
                    lineHeight: 1.3,
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}
                >
                  {test.title.replace(/_/g, ' ')}
                </Typography>

                {/* Assessment Details */}
                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getDifficultyIcon(test.difficulty)}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getDifficultyColor(test.difficulty),
                        fontWeight: 'bold',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {test.difficulty}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Clock size={14} color="#666" />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                    >
                      {test.duration}
                    </Typography>
                    <FileText size={14} color="#666" />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                    >
                      {test.questions} questions
                    </Typography>
                  </Box>
                </Stack>

                {/* Category and Start Button */}
                <Box sx={{ 
                   display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            mt: 'auto',              // Push to bottom
            mb: 1,
            gap: 2
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 , flex: "1 1 auto",          // Add this
    minWidth: 0  }}>
                    <Box sx={{ 
                      color: test.color, 
                      display: 'flex', 
                      alignItems: 'center' 
                    }}>
                      {test.icon}
                    </Box>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontWeight: 'medium',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {test.category}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    size={isMobile ? "small" : "medium"}
                    onClick={() => startAssessment(test)}
                    sx={{
                      backgroundColor: test.color,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: isMobile ? 2 : 3,
                            py: isMobile ? 0.5 : 0.75,    // Add proper vertical padding

                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      minHeight: isMobile ? '32px' : '36px',
                       minWidth: isMobile ? 'auto' : '120px',  // Add minimum width for desktop
                      flexShrink: 0,                          // Prevent button from shrinking
                      whiteSpace: 'nowrap', 
                      "&:hover": {
                        backgroundColor: test.color,
                        filter: 'brightness(0.9)'
                      }
                    }}
                  >
                    Start Test
                  </Button>
                </Box>

                {/* XP Badge - Fixed positioning */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 1 
                }}>
                  <Box
                    sx={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: isMobile ? '0.7rem' : '0.75rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Star size={14} />
                    10 XP
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Modal - Mobile Responsive */}
      <Modal 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={{ 
            width: isMobile ? '95%' : '600px',
            maxWidth: '95vw',
            maxHeight: '95vh',
            bgcolor: "white", 
            p: isMobile ? 2 : 4,
            mx: "auto", 
            my: isMobile ? 1 : 4,
            borderRadius: 3,
            boxShadow: 24,
            overflow: 'auto'
          }}>
            {questions.length > 0 ? (
              <>
                {/* Modal Header */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3,
                  pb: 2,
                  borderBottom: '2px solid #f0f0f0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FileText size={isMobile ? 20 : 24} color={selectedAssessment?.color} />
                    <Typography 
                      variant={isMobile ? "h6" : "h5"}
                      sx={{ fontWeight: 'bold', color: selectedAssessment?.color }}
                    >
                      {selectedAssessment?.title.replace(/_/g, ' ')}
                    </Typography>
                  </Box>
                  <IconButton 
                    onClick={() => setOpenModal(false)}
                    size={isMobile ? "small" : "medium"}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Progress Bar */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mb: 1 
                  }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                    >
                      Question {currentQuestion + 1} of {questions.length}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                    >
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={((currentQuestion + 1) / questions.length) * 100}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: selectedAssessment?.color
                      }
                    }}
                  />
                </Box>

                {/* Question */}
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ 
                    mb: 3,
                    fontWeight: 'bold',
                    lineHeight: 1.4,
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}
                >
                  {questions[currentQuestion].question}
                </Typography>

                {/* Answer Options */}
                <RadioGroup 
                  value={selectedAnswers[currentQuestion] || ""} 
                  onChange={handleOptionChange}
                  sx={{ mb: 3 }}
                >
                  {questions[currentQuestion].options.map((opt, idx) => (
                    <FormControlLabel 
                      key={idx} 
                      value={opt} 
                      control={
                        <Radio 
                          sx={{
                            color: selectedAssessment?.color,
                            '&.Mui-checked': {
                              color: selectedAssessment?.color
                            }
                          }}
                        />
                      } 
                      label={
                        <Typography sx={{ 
                          fontSize: isMobile ? '0.875rem' : '1rem',
                          py: 0.5
                        }}>
                          {opt}
                        </Typography>
                      }
                      sx={{
                        mb: 1,
                        p: 1.5,
                        borderRadius: 2,
                        border: '2px solid transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: `${selectedAssessment?.color}10`,
                          border: `2px solid ${selectedAssessment?.color}30`
                        }
                      }}
                    />
                  ))}
                </RadioGroup>

                {/* Navigation Buttons */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: 'center',
                  gap: 2,
                  pt: 2,
                  borderTop: '1px solid #f0f0f0'
                }}>
                  {currentQuestion > 0 ? (
                    <Button 
                      onClick={() => setCurrentQuestion(currentQuestion - 1)} 
                      variant="outlined"
                      startIcon={<ArrowBack />}
                      sx={{
                        borderColor: selectedAssessment?.color,
                        color: selectedAssessment?.color,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        minHeight: isMobile ? '36px' : '42px',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}
                    >
                      Previous
                    </Button>
                  ) : (
                    <Box />
                  )}

                  {currentQuestion < questions.length - 1 ? (
                    <Button 
                      onClick={() => setCurrentQuestion(currentQuestion + 1)} 
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: selectedAssessment?.color,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        minHeight: isMobile ? '36px' : '42px',
                        fontSize: isMobile ? '0.75rem' : '0.875rem',
                        "&:hover": {
                          backgroundColor: selectedAssessment?.color,
                          filter: 'brightness(0.9)'
                        }
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit} 
                      variant="contained" 
                      color="success"
                      endIcon={<CheckCircle />}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        minHeight: isMobile ? '36px' : '42px',
                        fontSize: isMobile ? '0.75rem' : '0.875rem'
                      }}
                    >
                      Submit Test
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No questions available for this assessment.
                </Typography>
                <Button 
                  onClick={() => setOpenModal(false)}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Close
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AssessmentUI;