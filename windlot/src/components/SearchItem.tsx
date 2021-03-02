import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Card, CardActions, CardActionArea, CardContent, CardMedia, FormControlLabel, TextField, Checkbox, Hidden } from '@material-ui/core';

const styles = (theme: Theme) => 
    createStyles({
        root: {
            '& > *': {
            margin: theme.spacing(0),
            },
        }, 
        listingImage: {
            width: "100%",
        },
        listingButton: {
            justifyItems: "right",
            alignContent: "right",
            textAlign: "right"
        },
        title: {},
    });

interface Item {
    Name: string,
    Price: number,
    Id: string,
    ImageUrl: string
}

interface SearchItemProps {
    Item: Item,
    routerProps: any
}
  
function SearchItem(props: WithStyles<typeof styles> & SearchItemProps) {
  const { classes, ...other } = props;

  return (
    <Grid item xs={12} md={12}>
        <Card className={classes.root}>
            <CardActionArea onClick={() => props.routerProps.history.push(`/listing-details/${props.Item.Id}`)}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <CardMedia
                            component="img"
                            className={classes.listingImage}
                            image={props.Item.ImageUrl}
                            title={props.Item.Name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.Item.Name}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.Item.Id}
                            </Typography>
                            <Typography variant="body2" component="p">
                                ${props.Item.Price}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item md={1} className={classes.listingButton}>
                        <Hidden mdDown>
                            <CardActions>
                                {/* Navigate to item id details */}
                                <Button size="small" onClick={() => props.routerProps.history.push(`/listing-details/${props.Item.Id}`)}>Details</Button>
                            </CardActions>
                        </Hidden>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    </Grid>
  );
}

export default withStyles(styles)(SearchItem);
