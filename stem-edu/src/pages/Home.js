import { Typography, Button, Card, CardContent, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import ThinFooter from "../components/ThinFooter"; // Importing the ThinFooter component
const STEM = "/assets/STEM1.png";  
const BackgroundImage = "/assets/Back.jpg"; 

// Main Wrapper with Background Image
const MainContainer = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  paddingTop: "60px",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

// Overlay to Improve Text Visibility
const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(252, 252, 252, 0.3)",
  zIndex: 1,
});

// Hero Section
const HeroSection = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "1200px",
  width: "100%",
  padding: "20px",
  position: "relative",
  zIndex: 2,
});

const TextSection = styled("div")({
  maxWidth: "50%",
  color: "#fff",
});

const HighlightText = styled("span")({
  color: "#f4a261",
  fontWeight: "bold",
  fontSize: "60px",
});

const StyledButton = styled(Button)({
  backgroundColor: "#1DBF73",
  padding: "12px 24px",
  fontSize: "18px",
  borderRadius: "8px",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#17a463",
  },
});

const ImageSection = styled("div")({
  position: "relative",
  width: "45%",
});

const StyledImage = styled("img")({
  width: "100%",
  borderRadius: "15px",
});

const Section = styled("div")({
  textAlign: "center",
  padding: "60px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background
  color: "#fff", // White text
  position: "relative",
  zIndex: 2,
  borderRadius: "15px", // Optional for a better look
});


const Home = () => {
  return (
    <MainContainer>
      <Overlay />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Hero Section */}
        <HeroSection>
          <TextSection>
            <Typography variant="h4" color="primary">
              Education System
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Gain High <HighlightText>knowledge</HighlightText>
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
            BrightMindsSTEM inspires young thinkers to explore science, technology, engineering,
             and math in creative ways. Our platform provides engaging resources and virtual lab activities to
              spark curiosity and innovation
            </Typography>
            <StyledButton component={Link} to="/learn">
              Enter the World →
            </StyledButton>
          </TextSection>
          <ImageSection>
            <StyledImage src={STEM} alt="Education" />
          </ImageSection>
        </HeroSection>

        {/* About Us Section */}
       

       <ThinFooter/>
      </Container>
    </MainContainer>
  );
};

export default Home;
