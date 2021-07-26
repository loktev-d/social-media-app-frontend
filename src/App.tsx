import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Paper,
  Typography,
} from "@material-ui/core";

import useStyles from "./style";
import logo from "./logo.png";
import Navigation from "./navigation/Navigation";

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <AppBar position="fixed">
        <Container maxWidth="md">
          <Toolbar className={classes.toolbar}>
            <img className={classes.logo} src={logo} alt="logo" />
            <Typography className={classes.logoHeader} variant="h5">
              Awesome Web App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid className={classes.gridContainer} container spacing={3}>
        <Grid item xs={3}>
          <Paper>
            <Navigation />
          </Paper>
        </Grid>
        <Grid item xs={9}></Grid>
      </Grid>
    </Container>
  );
}

export default App;
