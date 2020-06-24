import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ReactPlayer from 'react-player';

//MUI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
//Pages
import { styles } from '../util/theme';
import '../App.css';
import loadingSipnner from '../layout/loadingSpinner';

//TODO: FOTOLAR VE VIDEOLAR ARASINDA GECIS ICIN KULLANILACAK: https://github.com/rcaferati/react-awesome-slider

//TODO:AWESOME SLIDER REFERANSLARI: https://caferati.me/demo/react-awesome-slider/scaling
//TODO: https://fullpage.caferati.me/

//TODO: Sayfalar arasinda gecis icin bunu kullan: https://github.com/rcaferati/ras-fullpage-strategies

const useStyles = makeStyles(styles);

export default function Content(props) {
  const [contentPage, setContent] = useState({});
  const [images, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lightboxImageList, setLightBoxImageList] = useState([]);
  const classes = useStyles();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLigtboxOpen, setIsLightboxOpen] = useState(false);

  const contentId = props.match.params.contentId;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/content/${contentId}`)
      .then(async (res) => {
        setContent(res.data);
        setImage(res.data.imageList);
        setLightBoxImageList([...[res.data.mainImage], ...res.data.imageList]);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [contentId]);

  const videoMarkup = (
    <Grow in timeout={500}>
      <div className={classes.imageContentBox}>
        <Card className={classes.mediaRoot} elevation={5}>
          <CardActionArea disableTouchRipple>
            <div className='player-wrapper'>
              <ReactPlayer
                url={contentPage.videoUrl}
                controls={true}
                width='100%'
                height='100%'
                className='react-player'
              />
            </div>
            <CardContent>
              <Typography gutterBottom style={{ fontSize: '2.5em' }}>
                {contentPage.title}
              </Typography>
              <Typography gutterBottom variant='h5'>
                {contentPage.subtitle}
              </Typography>
              <p className='with-newlines' style={{ fontSize: '1.2em' }}>
                {contentPage.description}
              </p>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to='/contact'>
              <Button size='small' color='primary'>
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </Grow>
  );

  const socialMediaMarkup = (
    <div>
      <Grow in timeout={500}>
        <div className={classes.imageContentBox}>
          <Card className={classes.mediaRoot} elevation={5}>
            <CardActionArea
              style={{
                cursor: 'default',
              }}>
              <CardMedia
                component='img'
                className={classes.cardMedia}
                image={contentPage.mainImage}
                title={contentPage.title}
                onClick={() => {
                  setPhotoIndex(0);
                  setIsLightboxOpen(true);
                }}
              />
              <CardContent>
                <Typography gutterBottom style={{ fontSize: '2.5em' }}>
                  {contentPage.title}
                </Typography>
                <Typography gutterBottom variant='h5'>
                  {contentPage.subtitle}
                </Typography>
                <p className='with-newlines' style={{ fontSize: '1.2em' }}>
                  {contentPage.description}
                </p>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to='/contact'>
                <Button size='small' color='primary'>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
          {images.map((imageLink, index) => (
            <Card key={index} className={classes.mediaRoot} elevation={5}>
              <CardMedia
                component='img'
                className={classes.cardMedia}
                image={imageLink}
              />
            </Card>
          ))}
        </div>
      </Grow>
      {isLigtboxOpen && (
        <Lightbox
          mainSrc={lightboxImageList[photoIndex]}
          onCloseRequest={() => setIsLightboxOpen(false)}
          nextSrc={
            lightboxImageList[(photoIndex + 1) % lightboxImageList.length]
          }
          prevSrc={
            lightboxImageList[
              (photoIndex + lightboxImageList.length - 1) %
                lightboxImageList.length
            ]
          }
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + lightboxImageList.length - 1) %
                lightboxImageList.length,
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(
              (photoIndex + lightboxImageList.length + 1) %
                lightboxImageList.length,
            )
          }
        />
      )}
    </div>
  );

  const twoDthreeDMarkup = (
    <div>
      <Grow in timeout={500}>
        <div className={classes.imageContentBox}>
          <div style={{ background: 'white' }}>
            <Card className={classes.mediaRoot}>
              <CardActionArea
                style={{
                  cursor: 'default',
                }}>
                <CardMedia
                  borderRadius='0px'
                  component='img'
                  className={classes.cardMedia}
                  image={contentPage.mainImage}
                  title={contentPage.title}
                  onClick={() => {
                    setPhotoIndex(0);
                    setIsLightboxOpen(true);
                  }}
                />
                <CardContent>
                  <Typography gutterBottom style={{ fontSize: '2.5em' }}>
                    {contentPage.title}
                  </Typography>
                  <Typography gutterBottom variant='h5'>
                    {contentPage.subtitle}
                  </Typography>
                  <p className='with-newlines' style={{ fontSize: '1.2em' }}>
                    {contentPage.description}
                  </p>
                </CardContent>
                <CardActions>
                  <Link to='/contact'>
                    <Button size='small' color='primary'>
                      Learn More
                    </Button>
                  </Link>
                </CardActions>
              </CardActionArea>
            </Card>
            {images.map((imageLink, index) => (
              <Card key={index} className={classes.mediaRoot}>
                <CardMedia
                  component='img'
                  className={classes.cardMedia}
                  image={imageLink}
                  onClick={() => {
                    setPhotoIndex(index + 1);
                    setIsLightboxOpen(true);
                  }}
                />
              </Card>
            ))}
          </div>
        </div>
      </Grow>
      {isLigtboxOpen && (
        <Lightbox
          mainSrc={lightboxImageList[photoIndex]}
          onCloseRequest={() => setIsLightboxOpen(false)}
          nextSrc={
            lightboxImageList[(photoIndex + 1) % lightboxImageList.length]
          }
          prevSrc={
            lightboxImageList[
              (photoIndex + lightboxImageList.length - 1) %
                lightboxImageList.length
            ]
          }
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + lightboxImageList.length - 1) %
                lightboxImageList.length,
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(
              (photoIndex + lightboxImageList.length + 1) %
                lightboxImageList.length,
            )
          }
        />
      )}
    </div>
  );

  return loading
    ? loadingSipnner
    : contentPage.type === 3
    ? // Video content
      videoMarkup
    : //Social Media Content
    contentPage.type === 1
    ? socialMediaMarkup
    : twoDthreeDMarkup;
}
