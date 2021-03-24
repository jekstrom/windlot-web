import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Avatar, Button, Icon, IconButton, FormControl, FormLabel, Input, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, InputLabel, FormHelperText, MenuItem, Select, TextField, TextareaAutosize, Grid, Hidden } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Auth, Storage } from 'aws-amplify';
import ImageUploader from 'react-images-upload';

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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    grid: {
      justifyContent: "center"
    },
    formCell: {
      textAlign: "start",
      margin: "10px"
    },
    formField: {
      margin: "5px"
    }
  })

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
  name: string,
  description: string,
  locationCountry: string,
  locationState: string,
  locationPoints: any[],
  gameType: string,
  gameTypes: string[],
  amenity: string,
  amenities: string[],
  availabilityStart: Date,
  availabilityEnd: Date,
  price: number,
  pictures: File[]
}

class CreateListing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      description: "",
      locationCountry: "",
      locationState: "",
      locationPoints: [],
      gameType: "",
      gameTypes: [],
      amenity: "",
      amenities: [],
      availabilityStart: new Date(),
      availabilityEnd: new Date(),
      price: 0,
      pictures: []
    };
  }

  _onDrop = (pictures: any) => {
      var self = this;
      this.setState({
          pictures: pictures,
      });
  }

  _submitListing = () => {
    var self = this;
    Auth.currentSession()
    .then(async data => {
        let imageName = ""
        let imageNameEncoded = ""
        for (let i = self.state.pictures.length - 1; i >= 0; i--) {
          let file: File = self.state.pictures[i]
          imageName = `${self.state.name}-${i}-${file.name}`
          imageNameEncoded = encodeURIComponent(imageName);
          try {
            await Storage.put(imageName, file, {
              level: 'protected',
              metadata: {
                fileName: file.name
              }
            });
          } catch (err) {
            console.log('Error uploading file: ', err);
          }  
        }

        let userid = await Auth.currentUserInfo();

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
                    "locationCountry": self.state.locationCountry,
                    "locationState": self.state.locationState,
                    "locationPoints": self.state.locationPoints,
                    "gameTypes": self.state.gameTypes,
                    "amenities": self.state.amenities,
                    "availabilityStart": self.state.availabilityStart,
                    "availabilityEnd": self.state.availabilityEnd,
                    "price": self.state.price,
                    "imageKey": imageNameEncoded,
                    "userId": encodeURIComponent(userid.id)
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
    const self = this;
    return (
      <div className="App">
        <h1>Create Listing</h1>
        <Grid container spacing={1} className={classes.grid}>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Listing Title:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <TextField 
                  id="name"
                  placeholder="Listing Title"
                  onChange={(name) => this.setState({name: name.target.value})}
                />
              </FormControl>
            </Grid>
            </Grid>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Description:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <TextareaAutosize 
                  id="description"
                  rowsMin={10}
                  placeholder="Description"
                  onChange={(description) => this.setState({description: description.target.value})}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Game Type:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item xs={10}>                
              <FormControl>
                <TextField 
                  id="gameType"
                  placeholder="Game Type"
                  onChange={(gameType) => this.setState({gameType: gameType.target.value})}
                />
                <List dense={true}>
                {
                  this.state.gameTypes?.map(function(gametype) {
                    return <ListItem>
                      <ListItemText
                        primary={gametype}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          onClick={() => self.setState({gameTypes: self.state.gameTypes.filter((gt) => gt !== gametype)})}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  })
                }
                </List>
              </FormControl>
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.setState({gameTypes: this.state.gameTypes.indexOf(this.state.gameType) < 0 ? this.state.gameTypes.concat(this.state.gameType) : this.state.gameTypes})}
                ><AddIcon/>
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Amenities:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item xs={10}>
              <FormControl>
                <TextField 
                  id="amenity"
                  placeholder="Amenity"
                  onChange={(amenity) => this.setState({amenity: amenity.target.value})}
                />
                <List dense={true}>
                {
                  this.state.amenities?.map(function(amenity) {
                    return <ListItem>
                      <ListItemText
                        primary={amenity}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          onClick={() => self.setState({amenities: self.state.amenities.filter((a) => a !== amenity)})}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  })
                }
                </List>
              </FormControl>
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.setState({amenities: this.state.amenities.indexOf(this.state.amenity) < 0 ? this.state.amenities.concat(this.state.amenity) : this.state.amenities})}
                ><AddIcon/>
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Location:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item md={2} xs={12} className={classes.formField}>
              <FormControl>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country"
                  value={0}
                  onChange={(item) => this.setState({locationCountry: item.target.value as string})}
                >
                  <MenuItem value={0}>
                    United States
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} xs={12} className={classes.formField}>
              <FormControl>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  value={0}
                  onChange={(item) => this.setState({locationState: item.target.value as string})}
                >
                  <MenuItem value={0}>
                    Minnesota
                  </MenuItem>
                  <MenuItem value={1}>
                    Washington
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Availability:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item md={3} xs={12} className={classes.formField}>
            {/* TODO: Fix timezones on dates */}
              <TextField
                id="date"
                label="Availability Start"
                type="date"
                value={this.state.availabilityStart?.toJSON().slice(0, 10) ?? ""}
                className={classes.textField}
                onChange={(date) => this.setState({availabilityStart: !!date.currentTarget?.value ? new Date(date.currentTarget?.value) : new Date()})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={3} xs={12} className={classes.formField}>
              <TextField
                id="date"
                label="Availability End"
                type="date"
                value={this.state.availabilityEnd?.toJSON().slice(0, 10) ?? ""}
                className={classes.textField}
                onChange={(date) => this.setState({availabilityEnd: !!date.currentTarget?.value ? new Date(date.currentTarget?.value) : new Date()})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.formCell}>
            <Grid item xs={1}>
              <Hidden xsDown>
                <FormLabel>Price:</FormLabel>
              </Hidden>
            </Grid>
            <Grid item xs={5} className={classes.formField}>
              <FormControl>
                <TextField 
                  id="price"
                  helperText="Price"
                  type="number"
                  placeholder="00.00"
                  onChange={(price) => this.setState({price: parseFloat(parseFloat(price.target.value).toFixed(2))})}
                  />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <ImageUploader style={{ maxWidth: '1000px', margin: "20px auto" }}
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this._onDrop}
                  imgExtension={['.jpg', '.png']}
                  maxFileSize={10485760}
                  withPreview={true}
                  label="Max file size: 10mb, accepted: jpg, png"
              />
            </Grid>
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
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateListing);
