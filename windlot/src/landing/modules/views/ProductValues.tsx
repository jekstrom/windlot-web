import * as React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import forest from '../../forest.svg'
import world from '../../world.svg'
import smiley from '../../smiley.svg'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: theme.palette.secondary.light,
    },
    container: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(30),
      display: 'flex',
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    image: {
      height: 55,
    },
    title: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      top: -180,
    },
  });

function ProductValues(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={forest}
                alt="land"
              />
              <Typography variant="h6" className={classes.title}>
                Put your unused land to use
              </Typography>
              <Typography variant="h5">
                {
                  'Start making money from your unused fields and forests. '
                }
                {
                  'Generate passive income and help foster a community of sustainable hunting.'
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={world}
                alt="world"
              />
              <Typography variant="h6" className={classes.title}>
                Find your spot
              </Typography>
              <Typography variant="h5">
                {
                  'Find your ideal hunting spot. Search using our comprehensive map and filters. '
                }
                {
                  'Set up your stand and enjoy the outdoors.'
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={smiley}
                alt="smiley"
              />
              <Typography variant="h6" className={classes.title}>
                Community
              </Typography>
              <Typography variant="h5">
                {'Connect with other hunters and see where the action is. '}
                {'Share your photos, tall tales, and stories.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default withStyles(styles)(ProductValues);
