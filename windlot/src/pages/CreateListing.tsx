import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, Input, InputLabel, FormHelperText, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        
      },
    },
  }),
);

function CreateListing() {
  const classes = useStyles();

  return (
    <div className="App">
      <h1>Create Listing</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input id="description" aria-describedby="description-helper" />
              <FormHelperText id="description-helper">Description for your property listing</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input id="price" aria-describedby="price-helper" />
              <FormHelperText id="price-helper">Set the price for your listing</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="contactinfo">Contact Info</InputLabel>
              <Input id="contactinfo" aria-describedby="contactinfo-helper" />
              <FormHelperText id="contactinfo-helper">How will people contact you</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CreateListing;
