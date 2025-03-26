import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import STEM from "../assets/STEM1.png";  
import BackgroundImage from "../assets/Back.jpg";  // Replace with your actual background image

const HeroContainer = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh", // Ensures full viewport height
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(252, 252, 252, 0.3)", // Adds a semi-transparent overlay
  zIndex: 1,
});

const HeroSection = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "1200px",
  width: "100%",
  padding: "20px",
  position: "relative",
  zIndex: 2, // Ensures content is above the overlay
});

const TextSection = styled("div")({
  maxWidth: "50%",
  color: "#fff", // White text for better contrast
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

const Home = () => {
  return (
    <HeroContainer>
      <Overlay />
      <HeroSection>
        {/* Left Section - Text */}
        <TextSection>
          <Typography variant="h4" color="primary">
            Education System
          </Typography>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
 Gain High <HighlightText>knowledge</HighlightText>
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s.
          </Typography>

          <StyledButton component={Link} to="/learn">
            Enter the World →
          </StyledButton>
        </TextSection>
        <ImageSection>
          <StyledImage src={STEM} alt="Education" />
        </ImageSection>
       
      </HeroSection>
    </HeroContainer>
  );
};

export default Home;
