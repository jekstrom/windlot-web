import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    }, 
    button:{
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
  }),
);

function Profile() {
  const classes = useStyles();

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
                    <PersonIcon className={classes.icon}/>
                    Username
                </Grid> 
                <Grid item xs={6} className={classes.dataCell}>
                    captain_poop
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} className={classes.titleCell}>
                    <EmailIcon className={classes.icon}/>
                    Email
                </Grid> 
                <Grid item xs={6} className={classes.dataCell}>
                    captain_poop@aol.com
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} className={classes.titleCell}>
                    <RoomIcon className={classes.icon}/>
                    Location
                </Grid> 
                <Grid item xs={6} className={classes.dataCell}>
                    Washington, USA
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default Profile;
