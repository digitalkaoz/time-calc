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

import 'typeface-roboto';

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
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
              <script type="module">{`import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs';
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/timesheet.js');

  wb.register();
}
`}</script>

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
