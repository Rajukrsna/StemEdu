import { Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Footer Container
const Footer = styled("footer")({
  position: "fixed", // Sticks at the bottom
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#222", // Dark background
  color: "#fff",
  textAlign: "center",
  padding: "8px 0", // Small padding for a thin footer
  fontSize: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000, // Ensure it stays above content
});

// Social Media Icons Container
const SocialIcons = styled("div")({
  display: "flex",
  gap: "10px",
  paddingLeft: "20px", // Align with page content
});

// Social Media Icon Button
const SocialIconButton = styled(IconButton)({
  color: "#f4a261", // Orange shade
  "&:hover": {
    color: "#ffa726", // Slightly lighter orange on hover
  },
});

const FooterText = styled(Typography)({
  paddingRight: "20px",
  fontSize: "12px",
});

const ThinFooter = () => {
  return (
    <Footer>
      <SocialIcons>
        <SocialIconButton component={Link} to="https://facebook.com">
          <FacebookIcon />
        </SocialIconButton>
        <SocialIconButton component={Link} to="https://twitter.com">
          <TwitterIcon />
        </SocialIconButton>
        <SocialIconButton component={Link} to="https://instagram.com">
          <InstagramIcon />
        </SocialIconButton>
        <SocialIconButton component={Link} to="https://linkedin.com">
          <LinkedInIcon />
        </SocialIconButton>
      </SocialIcons>

      <FooterText variant="body2">
        © {new Date().getFullYear()} STEMedu. All rights reserved.
      </FooterText>
    </Footer>
  );
};

export default ThinFooter;
