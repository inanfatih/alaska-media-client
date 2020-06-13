import React, { Fragment } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';

import { drawerWidth } from '../util/theme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(0),
  },
}));

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions(),
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  return windowDimensions;
}

const ThumbnailCards = (props) => {
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { height, width } = useWindowDimensions();

  React.useEffect(
    () => {
      setLoading(true);
      axios
        .get(props.dataPath)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setContent(res.data);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [props.dataPath],
    loading,
  );

  const classes = useStyles();
  console.log(classes);
  console.log('width: ', width);
  console.log('height: ', height);

  let gridWidth = 100;
  if (width >= 1920) {
    gridWidth = (width - drawerWidth) / 6;
  } else if (width >= 1280) {
    gridWidth = (width - drawerWidth) / 4;
  } else if (width >= 960) {
    gridWidth = (width - drawerWidth) / 3;
  } else if (width >= 600) {
    gridWidth = width - drawerWidth;
  } else gridWidth = width;

  let loadingMarkup = (
    <div
      style={{
        width: '30%',
        height: '100vh',
        margin: 'auto',
      }}>
      <CircularProgress
        size={200}
        thickness={1}
        color={'#fff'}
        style={{ marginTop: '30vh' }}
      />
    </div>
  );

  let contentMarkup =
    width >= 960 ? (
      <div className={classes.container}>
        {content.map((contentItem, index) => (
          <Grid
            key={contentItem.contentId}
            item
            sm={6}
            md={4}
            lg={3}
            xl={2}
            component={Grow}
            in
            timeout={200 * index}
            container
            style={{
              backgroundImage: `url(${contentItem.thumbnail})`,
              cursor: 'pointer',
            }}>
            <Typography
              component={Link}
              to={{
                pathname: `/content/${contentItem.contentId}`,
                contentId: contentItem.contentId,
              }}
              style={{
                height: gridWidth,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
              <div className='imagebox'>
                <h1>{contentItem.title}</h1>
                <h4>{contentItem.subtitle}</h4>
              </div>
            </Typography>
          </Grid>
        ))}
      </div>
    ) : (
      <div className='red-bgcolor'>
        {content.map((contentItem, index) => (
          <Grow in timeout={500 * index}>
            <div className={classes.imageContentBox}>
              <Paper
                className={[classes.imageContent, 'mediaRootXsThumbnail']}
                elevation={3}>
                <Card
                  component={Link}
                  to={{
                    pathname: `/content/${contentItem.contentId}`,
                    contentId: contentItem.contentId,
                  }}>
                  <CardActionArea
                    style={{
                      cursor: 'default',
                    }}>
                    <CardMedia
                      component='img'
                      className={classes.cardMedia}
                      image={contentItem.thumbnail}
                      title={contentItem.title}
                      style={{
                        cursor: 'pointer',
                        height: gridWidth,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: '1%',
                        borderTopRightRadius: '1%',
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5'>
                        {contentItem.title}
                      </Typography>
                      <Typography gutterBottom variant='subtitle1'>
                        {contentItem.subtitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Paper>
            </div>
          </Grow>
        ))}
      </div>
    );
  return <Fragment>{loading ? loadingMarkup : contentMarkup}</Fragment>;
};

export default ThumbnailCards;
