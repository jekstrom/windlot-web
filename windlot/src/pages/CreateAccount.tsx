import React from 'react';
import { createStyles, Theme, makeStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, Box, Checkbox, FormControl, Input, InputLabel, TextField, Grid, CircularProgress } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import logo from './logo2.png'
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js'

const styles = (theme: any) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    button: {
      margin: theme.spacing(3)
    },
    formElement: {
      minWidth: "300px"
    }
  })

interface IProps extends WithStyles<typeof styles> {

}

interface IState {
  email: string,
  invalidEmail: boolean,
  password: string,
  invalidPassword: boolean,
  confirmPassword: string,
  invalidConfirm: boolean,
  displayVerification: boolean,
  verificationCode: string,
  user: CognitoUser | null,
  confirming: boolean
}

class CreateAccount extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      invalidEmail: false,
      password: "",
      invalidPassword: false,
      confirmPassword: "",
      invalidConfirm: false,
      displayVerification: false,
      verificationCode: "",
      user: null,
      confirming: false
    };
  }

  _signup = (email: string, password: string, confirmPassword: string) => {
    var self = this;
    if (this._validateEmail(email) && this._validatePasswordSignup(password, confirmPassword)) {
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email
        }
      })
      .then(data => {
        this.setState({displayVerification: true, user: data.user});
      })
      .catch(err => {
        console.log(err);
        this.setState({displayVerification: false, user: null});
      });
    }
  }

  _verifyNewAccount = async (email: string, code: string) => {
    let self = this;
    try {
      if (self._validateVerificationCode(code)) {
        self.setState({ confirming: true });
        await Auth.confirmSignUp(email, code)
        .then(async data => {
          self.setState({ displayVerification: false });
          self.setState({ confirming: false });
        });
      }
    } catch (error) {
        // Display error on page
        console.log('error confirming sign up', error);
    }
  }

  _validateEmail = (email: string) => {
    let validEmail = email.length < 3 || email.indexOf('@') == -1;
    if (validEmail) {
      this.setState({ invalidEmail: true });
    } else {
      this.setState({ invalidEmail: false });
    }
    return !validEmail;
  }

  _validatePasswordSignup = (password: string, confirmPassword: string) => {
    let invalidPassword = password.length < 8;
    if (invalidPassword) {
      this.setState({ invalidPassword: true });
    } else {
      this.setState({ invalidPassword: false });
    }

    if (password !== confirmPassword) {
      this.setState({ invalidConfirm: true });
      return false;
    }
    this.setState({ invalidConfirm: false });

    return !invalidPassword;
  }

  _validateVerificationCode = (verificationCode: string) => {
    if (verificationCode.length !== 6) {
      // Display validation on page
      console.log("Verification codes are 6 characters long");
      return false;
    }
    return true;
  }

  _verifyCodeText = (classes: Record<"root" | "button" | "formElement", string>) => {
    if (this.state.displayVerification) {
        if (this.state.confirming) {
            return <Grid item xs={12}>
              <CircularProgress />
            </Grid>
        }
        return <Grid className={classes.root} container spacing={1}>
          <Grid item xs={12}>
          <p>We sent a verificate code to {this.state.email}, please enter it below</p>
          <FormControl className={classes.formElement}>
            <InputLabel htmlFor="verify">Verification Code</InputLabel>
            <Input id="verify" onChange={(code) => this.setState({verificationCode: code.target.value})} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={() => this._verifyNewAccount(this.state.email, this.state.verificationCode)}>
            Verify
          </Button>
        </Grid>
      </Grid>
    }
  }

  _createAccountForm = (classes: Record<"root" | "button" | "formElement", string>) => {
    if (this.state.displayVerification) {
      return <></>
    }
    else {
      return <Grid className={classes.root} container spacing={1}>
        <Grid item xs={12}>
          <FormControl className={classes.formElement}>
            <TextField 
              id="email" 
              placeholder="email@example.com"
              helperText={this.state.invalidEmail ? `"${this.state.email}" is not a valid email.` : "Email"}
              onChange={(email) => this.setState({email: email.target.value, invalidEmail: false})}
              error={this.state.invalidEmail}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formElement}>
            <TextField 
                id="password"
                type="password"
                placeholder="8 or more letters"
                helperText={this.state.invalidPassword ? "Password must be at least 8 characters long." : "Password"}
                onChange={(password) => this.setState({password: password.target.value, invalidPassword: false})}
                error={this.state.invalidPassword}
              />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formElement}>
            <TextField 
              id="confirm"
              type="password"
              placeholder="Confirm your password"
              helperText={this.state.invalidConfirm ? "Does not match password" : "Confirm Password"}
              onChange={(confirmPassword) => this.setState({confirmPassword: confirmPassword.target.value, invalidConfirm: false})}
              error={this.state.invalidConfirm}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => this._signup(this.state.email, this.state.password, this.state.confirmPassword)}>
              Create Account
            </Button>
        </Grid>
      </Grid>
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <img src={logo} />
        <Grid className={classes.root} container spacing={1}>
          {this._createAccountForm(classes)}
          {this._verifyCodeText(classes)}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateAccount);
