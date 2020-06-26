import React, { Fragment, useContext, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import loadingSipnner from '../layout/loadingSpinner';

import { drawerWidth } from '../util/theme';
import ContentContext from '../context/content/contentContext';
import useWindowDimensions from '../util/getWindowDimensions';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(0),
  },
}));

const ThumbnailCards = ({ dataPath }) => {
  const contentContext = useContext(ContentContext);

  const { getContent, loading, content } = contentContext;

  const { width } = useWindowDimensions();

  useEffect(
    () => {
      getContent(dataPath);
    },
    // eslint-disable-next-line
    [dataPath],
  );

  const classes = useStyles();

  let gridWidth = width;
  if (width >= 1920) {
    gridWidth = (width - drawerWidth) / 6;
  } else if (width >= 1280) {
    gridWidth = (width - drawerWidth) / 4;
  } else if (width >= 960) {
    gridWidth = (width - drawerWidth) / 3;
  } else if (width >= 600) {
    gridWidth = width - drawerWidth;
  }

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
  return <Fragment>{loading ? loadingSipnner : contentMarkup}</Fragment>;
};

export default ThumbnailCards;
