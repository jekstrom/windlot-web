import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import land from './pics/land.jpg'

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
        cell: {
            textAlign: "start",
        },
        price: {
            fontWeight: 700,
            fontSize: 32
        }
    });

interface Listing {
    Name: string,
    Price: number,
    Amenities: string[],
    GameTypes: string[],
    LocationCountry: string,
    LocationState: string,
    LocationPoints: [],
    ImageUrl: string,
    Id: string,
    Description: string,
    ContactInfo: string
}

interface ListingDetailProps extends WithStyles<typeof styles> {
    ListingId: string | null
}

interface IState {
    Listing: Listing | null,
}

class ListingDetails extends React.Component<ListingDetailProps, IState> {
    constructor(props: ListingDetailProps) {
        super(props);
        this.state = {
            Listing: null
        }
    }

    componentDidMount() {
        if (this.props.ListingId) {
            this._getListing(this.props.ListingId);
        }
    }

    _getListing = async (listingId: string) => {
        console.log(`Getting listing ${listingId} details...`)
        let self = this;
        try {
           let response = await fetch(
                // TODO: Get url automatically (configuration??)
                'https://0mxjsyzjjj.execute-api.us-west-2.amazonaws.com/dev/get',
                {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        listingId: listingId
                    })
                }
            );
            let json = await response.json();
            console.log(json);

            let listing: Listing = {
                Name: json._source.name,
                Price: json._source.price,
                Amenities: json._source.amenities,
                LocationCountry: json._source.location.country,
                LocationState: json._source.location.state,
                LocationPoints: json._source.location.coordinates,
                ImageUrl: json._source.imageUrl,
                Id: json._id,
                Description: json._source.description,
                GameTypes: json._source.gameTypes ?? [],
                ContactInfo: json._source.contact_info
            }

            this.setState({Listing: listing})

            return json;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { classes } = this.props;
        const self = this;

        return (
            <Grid className={classes.root} container spacing={1}>
                <Grid item xs={6}>
                    <img src={self.state.Listing?.ImageUrl} width="100%" />
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={12} className={classes.cell}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography display="block" gutterBottom className={classes.price}>
                                        ${self.state.Listing?.Price} / day
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" className={classes.button}>Contact</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.cell}>
                          {self.state.Listing?.LocationState}, {self.state.Listing?.LocationCountry}
                        </Grid>
                        <Grid item xs={12} className={classes.cell}>
                            25 acres
                        </Grid>
                        <Grid item xs={12} className={classes.cell}>
                            &nbsp; {/* Left Blank  */}
                        </Grid>
                        <Grid item xs={12} className={classes.cell}>
                            <Typography variant="h6">Amenities</Typography>
                            <Typography display="block" gutterBottom>
                                {self.state.Listing?.Amenities.join(", ")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.cell}>
                            <Typography variant="h6">Game Types</Typography>
                            <Typography display="block" gutterBottom>
                                {self.state.Listing?.GameTypes.join(", ")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.cell}>
                            <Typography variant="h6">Description</Typography>
                                <p>{self.state.Listing?.Description}</p>
                        </Grid>
                        {/* TODO: Add calendar view and contact info functionality. */}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(ListingDetails);

