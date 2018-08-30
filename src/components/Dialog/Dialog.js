import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  Slide
} from "@material-ui/core";

const Transition = props => <Slide direction="up" {...props} />;

export default WrappedComponent =>
  withMobileDialog()(
    class WrappedDialog extends React.PureComponent {
      static propTypes = {
        onOk: PropTypes.func.isRequired,
        fullScreen: PropTypes.bool.isRequired
      };

      state = {
        open: false,
        title: "",
        help: "",
        context: null
      };

      constructor(props) {
        super(props);

        //TODO autobind doesnt work in HOC?
        this.toggleDialog = this.toggleDialog.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }

      handleOk = () => {
        this.handleClose();
        this.props.onOk(this.state.context);
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      toggleDialog(context, title, help) {
        this.setState({ open: !this.state.open, title, help, context });
      }

      render() {
        const { fullScreen } = this.props;

        return (
          <React.Fragment>
            <WrappedComponent
              {...this.props}
              toggleDialog={this.toggleDialog}
            />
            <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby={this.state.title.replace(" ", "-").toLowerCase()}
            >
              <DialogTitle
                id={this.state.title.replace(" ", "-").toLowerCase()}
              >
                {this.state.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>{this.state.help}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Gimme a Sec
                </Button>
                <Button onClick={this.handleOk} color="primary" autoFocus>
                  Do It
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        );
      }
    }
  );
