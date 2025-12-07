import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Container = styled("div")(() => ({
  position: "fixed", // <-- changed from absolute
  top: "25%",
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingRight: "10px",
  zIndex: 100,
}));

const SlideAlert = styled(Alert)(({ visible }) => ({
  transform: visible ? "translateX(0)" : "translateX(100%)",
  transition: "transform 0.4s ease, opacity 0.4s ease",
  opacity: visible ? 1 : 0,
}));

export default function DisplayAlert({ severity, message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in
    setVisible(true);

    // Fade out after 2 seconds
    const timer = setTimeout(() => setVisible(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Stack spacing={2}>
        <SlideAlert
          variant="filled"
          severity={severity}
          visible={visible ? 1 : 0}
        >
          {message}
        </SlideAlert>
      </Stack>
    </Container>
  );
}
