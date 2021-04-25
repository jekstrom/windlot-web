import * as React from 'react';
import clsx from 'clsx';
import { WithStyles, Grid } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { login } from '../../../actions'
import { store } from '../../../store'


const styles = (theme: Theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  grid: {
    justifyContent: "flex-end"
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

interface IProps extends WithStyles<typeof styles> {
  loggedIn: boolean,
  loggedInUser: any | null,
  logInMessage: string | null
}

interface IState {
  loggedIn: boolean,
  loggedInUser: any | null,
  logInMessage: string | null
}

class AppAppBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loggedIn: false,
      loggedInUser: null,
      logInMessage: ""
    }
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
      }
  }

  _signout = async () => {
    try {
        await Auth.signOut({ global: true });
        store.dispatch(login({
          loggedIn: false,
          loggedInUser: null,
          logInMessage: ""
        }));
    } catch (error) {
        console.log("error signing out: ", error);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <div className={classes.left} />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              {'Hektari'}
            </Link>
            <div className={classes.right}>
              {
                this.props.loggedIn ? 
                    <Grid container md={3} xs={12}>
                      <Grid>
                        <Link
                          variant="h6"
                          underline="none"
                          className={clsx(classes.rightLink, classes.linkSecondary)}
                          href="/create-listing"
                        >
                          {'List Land'}
                        </Link>
                      </Grid>
                      <Grid>
                        <Link
                          variant="h6"
                          underline="none"
                          className={clsx(classes.rightLink)}
                          href="#"
                          onClick={this._signout}
                        >
                          {'Log Out'}
                        </Link>
                      </Grid>
                    </Grid>
                  :
                  <Grid container md={3} xs={12}>
                    <Grid>
                      <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        className={classes.rightLink}
                        href="/login"
                      >
                        {'Sign In'}
                      </Link>
                    </Grid>
                    <Grid>
                      <Link
                        variant="h6"
                        underline="none"
                        className={clsx(classes.rightLink, classes.linkSecondary)}
                        href="/create-account"
                      >
                        {'Sign Up'}
                      </Link>
                    </Grid>
                  </Grid>
              }
              
              
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.placeholder} />
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

//export default withStyles(styles)(AppAppBar);
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(AppAppBar));