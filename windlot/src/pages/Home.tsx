import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import header from './header_mountains2.png'
import mountBackground from './mountains.jpg'
import logo from './logo2.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    }, 
    body: {
      '& > *': {
        margin: theme.spacing(1)
      },
    }, 
    button:{
      margin: theme.spacing(1)
    },
    cell: {
        textAlign: "center",
        border: 1,
        borderStyle: "solid"
    },
    header: {
      //backgroundColor: "magenta",
      backgroundImage: `url(${header})`,
      backgroundSize: "100%",
      height: 150,
      margin: theme.spacing(0),
      textAlign: "center",
      color: "black"
    },
    body1: {
      backgroundImage: `url(${mountBackground})`,
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      height: 900,
      margin: theme.spacing(0),
      textAlign: "center",
      color: "black"
    },
    logo: {
      textAlign: "start",
      margin: theme.spacing(0)
    },
    logoHeader: {
      backgroundColor: `rgb(20, 156, 123)`
    },
    learnmore: {
      textAlign: "end",
      width: "100%",
      margin: theme.spacing(0)
    },
    title:{
        fontWeight: 500,
        fontSize: 18,
        margin: theme.spacing(0),
        marginTop: 10,
        fontFamily: "Segoe UI",
        textTransform: "uppercase"
    },
    banner: {
      fontWeight: 700,
      fontSize: 18,
      margin: theme.spacing(0),
      marginTop: 10,
      fontFamily: "Segoe UI",
      textTransform: "uppercase",
      textShadow: "0 0 5px white"
    }
  }),
);

function Home() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid container className={classes.logoHeader} xs={12} spacing={2}>
        <Grid className={classes.logo} item xs={3} md={1}>
          <img width="50%" src={logo} />
        </Grid>
        <Grid className={classes.logo} justify="center" alignItems="center" item xs={3} md={5}>
          <Typography gutterBottom className={classes.title}>
            Hektari
          </Typography>
        </Grid>
        <Grid className={classes.learnmore} item xs={6} md={6}>
          <Button 
              variant="contained"
              color="primary"
              className={classes.button}>
                Learn More
            </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} xs={12} className={classes.body} justify="center">
        <Grid className={classes.body1} item xs={12}>
            <Typography display="block" gutterBottom className={classes.banner}>
              Make money from your unused land
            </Typography>
            <Typography display="block" gutterBottom className={classes.banner}>
              Hunt the back wood country
            </Typography>
            <Typography display="block" gutterBottom className={classes.banner}>
              Get outdoors
            </Typography>
        </Grid>
        
      </Grid>
    </Grid>
  );
}

export default Home;