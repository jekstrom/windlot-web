import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, FormControl, Input, InputLabel, FormHelperText, TextField, Grid } from '@material-ui/core';
import Amplify, { Auth, Storage } from 'aws-amplify';

const styles = (theme: any) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    button: {
      margin: theme.spacing(3)
    }
  })

interface IProps extends WithStyles<typeof styles> {

}

interface IState {
  name: string,
  description: string,
  contactInfo: string,
  location: string,
  gameType: string,
  amenities: string,
  price: number
}

class CreateListing extends React.Component<IProps, IState> {
  _submitListing = () => {
    var self = this;
    Auth.currentSession()
    .then(async data => {
        let authtoken = data.getIdToken().getJwtToken();
        let response = await fetch(
            // TODO: Get url automatically (configuration??)
            'https://0mxjsyzjjj.execute-api.us-west-2.amazonaws.com/dev/index/',
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authtoken}`
                },
                body: JSON.stringify({
                    "name": self.state.name,
                    "description": self.state.description,
                    "contactInfo": self.state.contactInfo,
                    "location": self.state.location,
                    "gameType": self.state.gameType,
                    "amenities": self.state.amenities,
                    "price": self.state.price
                })
            }
        );
        let json = await response.json();
        console.log(json);
        return json;
    })
    .catch(err => {
        console.log(err);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <h1>Create Listing</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="name"
                  placeholder="Listing Name"
                  onChange={(name) => this.setState({name: name.target.value})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="description"
                  multiline={true}
                  placeholder="Description"
                  onChange={(description) => this.setState({description: description.target.value})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="contactInfo"
                  placeholder="Contact Info"
                  onChange={(contactInfo) => this.setState({contactInfo: contactInfo.target.value})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="location"
                  placeholder="Location"
                  onChange={(location) => this.setState({location: location.target.value})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="gameType"
                  placeholder="Game Type"
                  onChange={(gameType) => this.setState({gameType: gameType.target.value})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="amenities"
                  placeholder="Amenities"
                  onChange={(amenities) => this.setState({amenities: amenities.target.value})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <TextField 
                  id="price"
                  type="number"
                  placeholder="00.00"
                  helperText="Price"
                  onChange={(price) => this.setState({price: parseFloat(price.target.value)})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="default" className={classes.button}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this._submitListing()}>
                  Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateListing);
