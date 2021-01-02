import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Checkbox, FormControl, Input, InputLabel, FormHelperText, Grid } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import logo from './logo2.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      }
    }, 
    button:{
      margin: theme.spacing(3)
    },
    formElement: {
        minWidth: "300px"
    }
  }),
);

function CreateAccount() {
  const classes = useStyles();

  return (
    <div className="App">
        <img src={logo} />
        <Grid className={classes.root} container spacing={1}>
            <Grid item xs={12}>
                <FormControl className={classes.formElement}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.formElement}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password"/>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.formElement}>
                    <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
                    <Input type="password" id="confirm"/>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" className={classes.button}>Create Account</Button>
            </Grid>
            <Grid item xs={12}>
                <p>We sent a verificate code to [email address], please enter it below</p>
                <FormControl className={classes.formElement}>
                    <InputLabel htmlFor="verify">Verification Code</InputLabel>
                    <Input id="verify"/>
                </FormControl>
            </Grid>
        </Grid>
    </div>
  );
}

export default CreateAccount;
