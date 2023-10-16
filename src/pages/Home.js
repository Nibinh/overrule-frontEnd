import React, { useEffect, useState } from "react";
import Navabar from "../components/Navabar";
import { Grid } from "@mui/material";

function Home() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("user"));
  }, []);

  return (
    <div>
      <Navabar />
      <Grid container>
        <Grid container spacing={2} sx={{ marginTop: 5, padding: 5 }}>
          <Grid item lg={2} md={2} sm={2} xs={2} textAlign="left"></Grid>

          <Grid item lg={8} md={8} sm={8} xs={8} textAlign="center">
            <Grid> Welcome {userName} </Grid>
          </Grid>

          <Grid item lg={2} md={2} sm={2} xs={2} textAlign="right"></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
