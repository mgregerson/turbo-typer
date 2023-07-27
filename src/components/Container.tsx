import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function BasicContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc" }}>{children}</Box>
      </Container>
    </React.Fragment>
  );
}
