import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return <Box>{children}</Box>;
};
