import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, FormControl, TextField, Grid } from '@material-ui/core';
import logo from './logo2.png'
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js'
import { connect } from 'react-redux';
import { login } from '../actions'
import { store } from '../store'

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
  routerProps: any,
  loggedIn: boolean,
  loggedInUser: any | null,
  logInMessage: string | null
}

interface IState {
  email: string,
  password: string,
  user: CognitoUser | null
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: null
    };
  }

  async componentDidMount() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      store.dispatch(login({
        loggedIn: !!attributes,
        loggedInUser: attributes,
        logInMessage: ""
      }));
    } catch (error) {
      console.log("Error getting user: ", error)
      store.dispatch(login({
        loggedIn: false,
        loggedInUser: null,
        logInMessage: ""
      }));
    }
  }

  _signin = async (email: string, password: string) => {
    var self = this;
    try {
        const user = await Auth.signIn(email, password);
        self.setState({ user: user });
        store.dispatch(login({
          loggedIn: !!user.attributes,
          loggedInUser: user.attributes,
          logInMessage: ""
        }));
        self.props.routerProps.history.push("/")
    } catch (error) {
        console.log("error signing in: ", error);
        store.dispatch(login({
          loggedIn: false,
          loggedInUser: null,
          logInMessage: error.message
        }));
    }
  }

  _signout = async () => {
    try {
        await Auth.signOut();
        store.dispatch(login({
          loggedIn: false,
          loggedInUser: null,
          logInMessage: ""
        }));
    } catch (error) {
        console.log("error signing out: ", error);
    }
  }

  _loginError = () => {
    if (this.props.logInMessage) {
      return <Grid item xs={12}>
          Invalid email or password
      </Grid>
    }
  }

  _signinForm = (classes: Record<"root" | "button" | "formElement", string>) => {
    if (!this.props.loggedIn) {
      return <Grid className={classes.root} container spacing={1}>
        <Grid item xs={12}>
            <FormControl className={classes.formElement}>
                <TextField 
                  id="email" 
                  helperText="Email"
                  onChange={(email) => this.setState({email: email.target.value})}
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl className={classes.formElement}>
                <TextField 
                  id="password"
                  type="password"
                  helperText="Password"
                  onChange={(password) => this.setState({password: password.target.value})}
                />
            </FormControl>
        </Grid>
        {this._loginError()}
        <Grid item xs={12}>
            <Button 
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => this.props.routerProps.history.push("/create-account")}>
                Create Account
            </Button>
            <Button 
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this._signin(this.state.email, this.state.password)}>
                Log in
            </Button>
        </Grid>
      </Grid>
    } else {
      return <Grid className={classes.root} container spacing={1}>
          <Grid item xs={12}>
            <FormControl className={classes.formElement}>
              <Button 
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this._signout()}>
                  Log out
              </Button>
            </FormControl>
          </Grid>
      </Grid>
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
          <img src={logo} />
          {this._signinForm(classes)}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.LoginReducer.loggedIn,
    loggedInUser: state.LoginReducer.loggedInUser,
    logInMessage: state.LoginReducer.logInMessage
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Login));