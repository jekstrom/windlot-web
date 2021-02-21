import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Divider, List, ListItem, ListItemText, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import { Parallax, Background } from 'react-parallax';
import header from './header_mountains2.png'
import mountBackground from './mountains.jpg'
import deer from './deers.jpg'
import deerMed from './deers_med.jpg'
import whitetail from './white_tail_snow.jpg'
import whitetailMed from './white_tail_snow_med.jpg'
import whitetailSmall from './white_tail_snow_small.jpg'
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
      height: 100,
      margin: theme.spacing(0),
      textAlign: "center",
      color: "black"
    },
    body1: {
      // backgroundImage: `url(${mountBackground})`,
      // backgroundSize: "100%",
      // backgroundRepeat: "no-repeat",
      height: 900,
      width: "100%",
      margin: theme.spacing(0),
      textAlign: "center",
      color: "black"
    },
    body2: {
      //height: 1000,
      width: "100%",
      margin: theme.spacing(0),
      textAlign: "left",
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
      textShadow: "1px 1px 1px white"
    },
    bannerRight: {
      fontWeight: 700,
      fontSize: 18,
      margin: theme.spacing(5),
      marginTop: 10,
      fontFamily: "Segoe UI",
      textTransform: "uppercase",
      textShadow: "1px 1px 1px white"
    },
    card: {
      width: "320px",
      margin: "20px"
    }
  }),
);

function Home() {
  const classes = useStyles();
  const snowDeerImageVariants = [
    {
      url: whitetailSmall,
      width: 500
    },
    {
      url: whitetailMed,
      width: 800
    },
    {
      url: whitetail,
      width: 3200
    }
  ];
  const snowDeerSrcSet = snowDeerImageVariants
  .map(variant => `${variant.url} ${variant.width}w`)
  .join(",");

  const deerImageVariants = [
    {
      url: deerMed,
      width: 500
    },
    {
      url: deer,
      width: 800
    },
    {
      url: deer,
      width: 3200
    }
  ];
  const deerSrcSet = deerImageVariants
  .map(variant => `${variant.url} ${variant.width}w`)
  .join(",");

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
      <Grid container spacing={0} xs={12} className={classes.body} justify="center">
        <Grid item className={classes.body1}>
          <Parallax
            bgImage={mountBackground}
            bgImageAlt="mountain"
            strength={-300}
          >
            <Typography display="block" gutterBottom className={classes.banner}>
                Make money from your unused land
              </Typography>
              <Typography display="block" gutterBottom className={classes.banner}>
                Hunt the back wood country
              </Typography>
              <Typography display="block" gutterBottom className={classes.banner}>
                Get outdoors
              </Typography>
            <div style={{ height: '800px' }} />
          </Parallax>
        </Grid>
      </Grid>
      <Grid container spacing={0} xs={12} className={classes.body} justify="center">
        <Grid item className={classes.body1}>
          <Parallax
              bgImage={deer}
              bgImageSrcSet={deerSrcSet}
              bgImageAlt="deer"
              strength={300}
              className={classes.body2}
            >
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Find Land To Hunt On
                  </Typography>
                  <Typography variant="body2" component="p">
                      Use our state of the art maps
                  </Typography>
                  
                  <Typography variant="body2" component="p">
                      Search based on zone, game type, and location
                  </Typography>
                  <Typography variant="body2" component="p">
                      Schedule a reservation to hunt in peace
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <div style={{ height: '800px' }} />
          </Parallax>
        </Grid>
      </Grid>
      <Grid container spacing={0} xs={12} className={classes.body} justify="center">
        <Grid item className={classes.body1}>
          <Parallax
            bgImage={whitetail}
            bgImageSrcSet={snowDeerSrcSet}
            bgImageAlt="deer"
            strength={400}
            className={classes.body2}
          >
            <div style={{ height: '800px' }}>
              <Typography display="block" gutterBottom className={classes.bannerRight}>
                Make money from your unused land
              </Typography>
              <Typography display="block" gutterBottom className={classes.bannerRight}>
                Hunt the back wood country
              </Typography>
              <Typography display="block" gutterBottom className={classes.bannerRight}>
                Get outdoors
              </Typography>
            </div>
          </Parallax>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
