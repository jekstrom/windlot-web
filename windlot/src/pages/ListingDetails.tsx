import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import land from './land.jpg'

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
    cell: {
        textAlign: "start",
    },
    price:{
        fontWeight: 700,
        fontSize: 32
    }
  }),
);

function ListingDetails() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={1}>
        <Grid item xs={6}>
            <img src={land} width="100%"/>
        </Grid>
        <Grid item xs={3}>
            <Grid container>
                <Grid item xs={12} className={classes.cell}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography display="block" gutterBottom className={classes.price}>
                                $1,000 / day
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" className={classes.button}>Contact</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.cell}>
                    555 Fake St., New Orleans, Minnesota
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
                        Tree Stand, Trails, Camera, Parking
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.cell}>
                    <Typography variant="h6">Game Types</Typography>
                    <Typography display="block" gutterBottom>
                        Whitetail Rhinoceroes, Stegasaurus
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.cell}>
                    <Typography variant="h6">Description</Typography>
                    <p>
                    Raidió Teilifís Éireann (RTÉ)[2] (Irish pronunciation: [ˈɾˠadʲoː ˈtʲɛlʲəfʲiːʃ ˈeːɾʲən̪ˠ] (About this soundlisten); Irish for Radio Television Ireland) is an Irish semi-state company and public service broadcaster. It both produces programmes and broadcasts them on television, radio and the Internet. The radio service began on 1 January 1926,[3] while regular television broadcasts began on 31 December 1961,[4] making it one of the oldest continuously operating public service broadcasters in the world. RTÉ also publishes a weekly listings and lifestyle magazine, the RTÉ Guide.
                    </p>
                    <p>
                    Broadcasting in Ireland began in 1926 with 2RN in Dublin. From that date until June 1960 the broadcasting service (2RN, later Radio Éireann) operated as a section of the Department of Posts and Telegraphs, and those working for the service were directly employed by the Irish Government and regarded as civil servants.
                    </p>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default ListingDetails;
