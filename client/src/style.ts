import { Box, styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FlexBox } from "./components/flex-box";

export const StyledImage = styled("img")(() => ({
  aspectRatio: "1",
  height: "20rem",
  width: "20rem",
  ":hover": {
    transform: "scale(1.03)",
    transition: "0.0.2s ease-in",
    cursor: "pointer",
  },
}));
export const ImageContainer = styled(Box)(() => ({
  borderRadius: "5px",
  border: "1px solid #ccc",
  flex: "1",
  backgroundColor: "#fde252",
  alignSelf: "center",
}));
export const StyledNavLink = styled(NavLink)(() => ({
  margin: "0 1rem",
  textDecoration: "none",
  color: "black",
  "&.active": {
    textDecoration: "underline",
  },
}));
export const StyledFlexBox = styled(FlexBox)(({ theme }: { theme: any }) => ({
  gap: "2rem",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "1rem",
  },
}));
export const StyledForm = styled("form")(() => ({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
}));
