import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Divider, } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';
import { Auth } from 'aws-amplify';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        button: {
            margin: theme.spacing(3)
        },
        titleCell: {
            textAlign: "start",
            color: theme.palette.grey[600]
        },
        dataCell: {
            textAlign: "end"
        },
        icon: {
            paddingRight: 3
        }
    })

interface IProps extends WithStyles<typeof styles> {

}

interface IState {
    user: any
}

class Profile extends React.Component<IProps, IState> {
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
            <Grid className={classes.root} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" className={classes.button} >Edit</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={6} className={classes.titleCell}>
                            <PersonIcon className={classes.icon} />
                            Username
                        </Grid>
                        <Grid item xs={6} className={classes.dataCell}>
                            captain_poop
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} className={classes.titleCell}>
                            <EmailIcon className={classes.icon} />
                            Email
                        </Grid>
                        <Grid item xs={6} className={classes.dataCell}>
                            {this.state.user.email}
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} className={classes.titleCell}>
                            <RoomIcon className={classes.icon} />
                            Location
                        </Grid>
                        <Grid item xs={6} className={classes.dataCell}>
                            Washington, USA
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Profile);