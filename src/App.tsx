import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Paper,
  Typography,
} from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";

import useStyles from "./style";
import logo from "./images/logo.png";
import Navigation from "./components/navigation/Navigation";
import routes from "./routes";

function App() {
  let classes = useStyles();

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
        <Grid item xs={9}>
          <Switch>
            {Object.entries(routes).map(([key, value]) => (
              <Route key={key} path={value.path} component={value.component} />
            ))}
            <Route path="/">
              <Redirect to="/feed" />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
