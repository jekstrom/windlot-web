import * as React from 'react';
import clsx from 'clsx';
import { AppBarProps, WithStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { Auth } from 'aws-amplify';

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

}

interface IState {
  user: any
}

class AppAppBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        location: ""
      }
    }
  }

  async componentDidMount() {
      try {
          const { attributes } = await Auth.currentAuthenticatedUser();
          this.setState({ user: attributes });
      } catch (error) {
          console.log("Error getting user: ", error)
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
                !!this.state.user.email ? 
                    <div>
                      <Link
                        variant="h6"
                        underline="none"
                        className={clsx(classes.rightLink, classes.linkSecondary)}
                        href="/create-listing"
                      >
                        {'Create Listing'}
                      </Link>
                      <Link
                        variant="h6"
                        underline="none"
                        className={clsx(classes.rightLink)}
                        href="/create-account"
                      >
                        {'Log Out'}
                      </Link>
                    </div>
                  :
                  <div>
                    <Link
                      color="inherit"
                      variant="h6"
                      underline="none"
                      className={classes.rightLink}
                      href="/login"
                    >
                      {'Sign In'}
                    </Link>
                    <Link
                      variant="h6"
                      underline="none"
                      className={clsx(classes.rightLink, classes.linkSecondary)}
                      href="/create-account"
                    >
                      {'Sign Up'}
                    </Link>
                  </div>
              }
              
              
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.placeholder} />
      </div>
    );
  }
}

export default withStyles(styles)(AppAppBar);
