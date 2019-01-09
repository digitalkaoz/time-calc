import React from "react";
import { Provider } from "react-redux";
import Helmet from "react-helmet";
import universal from "react-universal-component";

import { withSiteData } from "react-static";

import {
  Grid,
  LinearProgress,
  Chip,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

//TODO flip out momentjs
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

import createStore from "./connectors/redux";

const Failed = context =>
  (context.error && console.error(context.error)) || (
    <Chip label="Failed loading Component" />
  );

const Loading = () => <LinearProgress />;

const Form = universal(import("./components/Form/Form"), {
  loading: Loading,
  error: Failed
});

const TimeList = universal(import("./components/TimeList/TimeList"), {
  loading: Loading,
  error: Failed
});

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d47a1"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const App = ({ title, classes, description }) => (
  <Provider store={createStore()}>
    <MuiThemeProvider theme={theme}>
      <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no" />
        <script src="/register-service-worker.js" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en"
        />
      </Helmet>
      <Grid container className={classes.root} spacing={16}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Form />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TimeList />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  </Provider>
);

export default withStyles(styles)(withSiteData(App));
