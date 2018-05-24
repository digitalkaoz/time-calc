import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { Provider } from 'react-redux'
import createStore from './../../logic/store'

import Form from '../Form/Form'
import TimeList from '../TimeList/TimeList'

import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import moment from 'moment'

const styles = () => ({
  root: {
    flexGrow: 1
  }
})

const App = ({classes}) => <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}><Provider store={createStore()}>
  <Grid container className={classes.root} spacing={16}>
    <AppBar position='static' color='default'>
      <Toolbar>
        <Typography variant='title' color='inherit'>Timesheet</Typography>
      </Toolbar>
    </AppBar>
    <Grid item xs={12}>
      <Form />
    </Grid>
    <Grid item xs={12}>
      <Paper>
        <TimeList />
      </Paper>
    </Grid>
  </Grid>
</Provider>
</MuiPickersUtilsProvider>

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
