import { Typography, Button, Card, CardContent, Grid, Container, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import ThinFooter from "../components/ThinFooter";

const STEM = "/assets/STEM1.png";  
const BackgroundImage = "/assets/Back.jpg"; 

// Responsive Main Container
const MainContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  paddingTop: "60px",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down('md')]: {
    paddingTop: "80px", // More space on mobile for navbar
  }
}));

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(252, 252, 252, 0.3)",
  zIndex: 1,
});

// Responsive Hero Section
const HeroSection = styled("div")(({ theme, isMobile }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isMobile ? "center" : "space-between",
  flexDirection: isMobile ? "column" : "row",
  maxWidth: "1200px",
  width: "100%",
  padding: isMobile ? "20px 10px" : "20px",
  position: "relative",
  zIndex: 2,
  gap: isMobile ? "30px" : "0",
}));

// Responsive Text Section
const TextSection = styled("div")(({ theme, isMobile }) => ({
  maxWidth: isMobile ? "100%" : "50%",
  color: "#fff",
  textAlign: isMobile ? "center" : "left",
}));

// Responsive Highlight Text
const HighlightText = styled("span")(({ theme, isMobile }) => ({
  color: "#f4a261",
  fontWeight: "bold",
  fontSize: isMobile ? "36px" : "60px",
  [theme.breakpoints.down('sm')]: {
    fontSize: "28px",
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1DBF73",
  padding: "12px 24px",
  fontSize: "18px",
  borderRadius: "8px",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#17a463",
  },
  [theme.breakpoints.down('md')]: {
    fontSize: "16px",
    padding: "10px 20px",
  }
}));

// Responsive Image Section
const ImageSection = styled("div")(({ theme, isMobile }) => ({
  position: "relative",
  width: isMobile ? "90%" : "45%",
  maxWidth: isMobile ? "400px" : "none",
}));

const StyledImage = styled("img")({
  width: "100%",
  borderRadius: "15px",
});

// Responsive Section
const Section = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "60px 20px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  position: "relative",
  zIndex: 2,
  borderRadius: "15px",
  [theme.breakpoints.down('md')]: {
    padding: "40px 15px",
  }
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MainContainer>
      <Overlay />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Hero Section */}
        <HeroSection isMobile={isMobile}>
          <TextSection isMobile={isMobile}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              color="primary"
              sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}
            >
              Education System
            </Typography>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                fontSize: isMobile ? '1.8rem' : '2.5rem',
                lineHeight: 1.2
              }}
            >
              Gain High <HighlightText isMobile={isMobile}>knowledge</HighlightText>
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              paragraph
              sx={{ 
                fontSize: isMobile ? '0.9rem' : '1rem',
                lineHeight: 1.6,
                mb: 3
              }}
            >
              BrightMindsSTEM inspires young thinkers to explore science, technology, engineering,
              and math in creative ways. Our platform provides engaging resources and virtual lab activities to
              spark curiosity and innovation
            </Typography>
            <StyledButton component={Link} to="/learn">
              Enter the World →
            </StyledButton>
          </TextSection>
          <ImageSection isMobile={isMobile}>
            <StyledImage src={STEM} alt="Education" />
          </ImageSection>
        </HeroSection>

        <ThinFooter/>
      </Container>
    </MainContainer>
  );
};

export default Home;