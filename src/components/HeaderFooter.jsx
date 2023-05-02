import { useState, useEffect } from "react";

import { Box, Link, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const SOCIAL_MEDIA = [
  { id: 1, icon: InstagramIcon },
  { id: 2, icon: WhatsAppIcon },
  { id: 3, icon: TelegramIcon },
  { id: 4, icon: TwitterIcon },
];

const getCurrentDimension = () => {
  return {
    height: window.innerHeight,
  };
};

export const HeaderFooter = (props) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "primary.main",
          display: "flex",
          width: "100%",
          height: "70px",
          justifyContent: "center",
          boxShadow: "0px 3px 10px 0px #999",
        }}
      >
        <Link href="#">
          <img src="images/logo.png" alt="Logo" style={{ width: "70px" }} />
        </Link>
      </Box>
      <Box
        sx={{
          bgcolor: "background.main",
          minHeight: `${screenSize.height - 140}px`,
        }}
      >
        {props.children}
      </Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px -3px 10px 0px #999",
          width: "100%",
          height: "70px",
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "40px",
            backgroundColor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {SOCIAL_MEDIA.map((social) => (
            <social.icon
              key={social.id}
              sx={{
                display: "flex",
                width: { xs: 15, md: 20 },
                height: { xs: 15, md: 20 },
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.3)",
                  color: "secondary.main",
                  cursor: "pointer",
                },
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "0.4rem", bxs: "0.6rem", bs: "0.8rem" },
          }}
        >
          تمام حقوق مادی و معنوی این سایت متعلق به شرکت صنایع سبز پاسارگاد
          میباشد. ©
        </Typography>
      </Box>
    </>
  );
};
