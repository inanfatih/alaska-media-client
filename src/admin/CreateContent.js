import React from 'react';

import axios from 'axios';

//MUI stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { styles } from '../util/theme';
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

import DeleteContentData from '../util/DeleteContentData';

import firebase, { firebaseConfig } from '../firebase/firebase';

const useStyles = makeStyles(styles);

const CreateContent = () => {
  IsAuthenticated();

  const classes = useStyles();

  const [title, setTitle] = React.useState('');
  const [subtitle, setSubtitle] = React.useState('');
  const [type, setType] = React.useState(1);
  const [description, setDescription] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [imageListInputButtons, setImageListInputButtons] = React.useState([0]);
  const [videoUrl, setVideoUrl] = React.useState('');
  const [orderNo, setOrderNo] = React.useState(0);
  const [contentId, setContentId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isSuccessfull, setIsSuccessfull] = React.useState(false);
  const [isFailed, setIsFailed] = React.useState(false);

  const [thumbnail, setThumbnail] = React.useState({});
  const [mainImage, setMainImage] = React.useState({});
  const [imageList, setImageList] = React.useState([]);

  let contentData = {
    title: title,
    subtitle: subtitle,
    type: type,
    description: description,
    thumbnail: '',
    mainImage: '',
    imageList: [],
    videoUrl: videoUrl,
    orderNo: orderNo,
  };

  const imageUploader = async (file, uploadType, index, contentIdReturned) => {
    let fileName = '';
    let fileExtension = file.name.split('.')[file.name.split('.').length - 1];
    if (uploadType === 'imageList') {
      fileName = 'imageList' + index;
    } else {
      fileName = uploadType;
    }
    // Create a root reference

    var storageRef = firebase.storage().ref();
    // console.log(
    //   'filepath, filename and extension',
    //   `${contentIdReturned}/${fileName}`,
    // );
    // Create a reference to 'images/mountains.jpg'
    var imageRef = storageRef.child(
      `${contentIdReturned}/${fileName}.${fileExtension}`,
    );

    return await imageRef.put(file).then((snapshot) => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${contentIdReturned}%2F${fileName}.${fileExtension}?alt=media`;
      console.log('Uploaded a blob or file!', snapshot);
      console.log('imageUrl', imageUrl);

      postContentLinks(
        contentIdReturned,
        uploadType,
        fileName,
        fileExtension,
        index,
      );
      return contentIdReturned;
    });
  };

  const uploadThumbnail = (event) => {
    const image = event.target.files[0];

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setThumbnail({ image: image });
    } else {
      window.alert('Please select images only in jpg, jpeg or png extensions');
      document.getElementById('thumbnailInput').value = null;
    }
  };

  const uploadMainImage = (event) => {
    const image = event.target.files[0];

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setMainImage({ image: image });
    } else {
      window.alert('Please select images only in jpg, jpeg or png extensions');
      document.getElementById('mainImageInput').value = null;
    }
  };

  const uploadImageList = (event, index) => {
    const image = event.target.files[0];
    if (image) {
      setImageList([...imageList, image]);
    }

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setImageList([...imageList, image]);
    } else {
      window.alert('Please select images with only jpg, jpeg or png formats');
      document.getElementById(`imageListInput${index}`).value = null;
    }
  };

  const failContentUpload = (err) => {
    DeleteContentData(contentId);
    setLoading(false);
    setErrors(err);
    console.log('fail content upload', err);
    setIsSuccessfull(false);
    setIsFailed(true);
  };

  // app.post('/image/:contentId/:imageType/:imageFileName/:imageExtension/:index',
  const postContentLinks = (
    contentId,
    imageType,
    imageFileName,
    imageExtension,
    index,
  ) => {
    return axios
      .post(
        `/image/${contentId}/${imageType}/${imageFileName}/${imageExtension}/${index}`,
      )
      .then((res) => {
        console.log('content link for ' + imageType + ' updated', res);
        return res;
      })
      .catch((err) => {
        console.log(
          'content link for ' + imageType + ' could not be updated',
          err,
        );
      });
  };

  const clearForm = () => {
    setTitle('');
    setSubtitle('');
    setType(1);
    setDescription('');
    setThumbnail({});
    setMainImage({});
    setImageList([]);
    setVideoUrl('');
    setOrderNo(0);
    setErrors({});
    setImageListInputButtons([0]);
    setContentId('');
    document.getElementById('mainImageInput').value = null;
    document.getElementById('thumbnailInput').value = null;
    document.getElementById('imageListInput0').value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const postContentData = axios.post('/content', contentData).then((res) => {
      setContentId(res.data.content.contentId);
      return res.data.content.contentId;
    });

    if (IsAuthenticated()) {
      if (type === 2) {
        postContentData
          .then((contentIdReturned) => {
            setContentId(contentIdReturned);
            try {
              return imageUploader(
                thumbnail.image,
                'thumbnail',
                0,
                contentIdReturned,
              );
            } catch (error) {
              console.log('error in thumbnail upload', error);
              setIsFailed(true);
            }
          })
          .then((contentIdReturned) => {
            try {
              return imageUploader(
                mainImage.image,
                'mainImage',
                0,
                contentIdReturned,
              );
            } catch (error) {
              console.log('error in main Image upload', error);
              return setIsFailed(true);
            }
          })
          .then((contentIdReturned) => {
            for (const key in imageList) {
              try {
                imageUploader(
                  imageList[key],
                  'imageList',
                  key,
                  contentIdReturned,
                );
              } catch (error) {
                console.log('error in imageList upload', error);
                setIsFailed(true);
              }
            }
            return contentIdReturned;
          })
          .then(() => {
            setIsSuccessfull(!isFailed);
            setLoading(false);
            console.log('submit successfull');
          })
          .catch((err) => {
            setIsSuccessfull(!isFailed);
            setLoading(false);
            console.log('submit failed');

            return failContentUpload(err);
          });
      } else if (type === 1) {
        postContentData
          .then((contentIdReturned) => {
            setContentId(contentIdReturned);
            try {
              return imageUploader(
                thumbnail.image,
                'thumbnail',
                0,
                contentIdReturned,
              );
            } catch (error) {
              console.log('error in thumbnail upload', error);
              setIsFailed(true);
            }
          })
          .then((contentIdReturned) => {
            try {
              return imageUploader(
                mainImage.image,
                'mainImage',
                0,
                contentIdReturned,
              );
            } catch (error) {
              console.log('error in main Image upload', error);
              setIsFailed(true);
            }
          })
          .then(() => {
            setIsSuccessfull(!isFailed);

            setLoading(false);
            console.log('submit successfull');
          })
          .catch((err) => {
            setIsSuccessfull(!isFailed);
            setLoading(false);
            console.log('submit failed');
            return failContentUpload(err);
          });
      } else if (type === 3) {
        postContentData
          .then(async (contentIdReturned) => {
            // console.log('postcontentdata passed ');
            setContentId(contentIdReturned);
            try {
              // console.log('at image uploader ');

              return await imageUploader(
                thumbnail.image,
                'thumbnail',
                0,
                contentIdReturned,
              );
            } catch (error) {
              console.log('error in thumbnail upload', error);
              return setIsFailed(true);
            }
          })
          .then(() => {
            console.log('submit successfull');
          })
          .catch((err) => {
            // console.log('submit failed');
            setLoading(false);
            setIsSuccessfull(!isFailed);
            return failContentUpload(err);
          });
      }
    } else {
      //TODO: display that token has expired. Login again
    }
  };
  React.useEffect(() => {
    // console.log('imageList', imageList);
    // if (imageList[1]) {
    //   console.log('imageList.image', imageList[1].image);
    // }
    // console.log('mainImage', mainImage);
    // if (mainImage) console.log('mainImag.imagee', mainImage.image);
    // console.log('loading', loading);
    // console.log('isSuccessfull', isSuccessfull);
    // console.log('isFailed', isFailed);
  }, [
    imageListInputButtons,
    type,
    contentData,
    loading,
    thumbnail,
    imageList.event,
    mainImage.event,
    imageList,
    mainImage,
    isSuccessfull,
    isFailed,
  ]);

  return (
    <div>
      <Grow in timeout={500}>
        <div className={classes.contactContentBox}>
          <Paper className={classes.contactContent} elevation={10}>
            <Card elevation={5}>
              <CardContent
                style={{
                  justifyContent: 'center',
                }}>
                <form onSubmit={handleSubmit} className={classes.contactForm}>
                  <Typography
                    variant='h4'
                    component='h2'
                    style={{
                      marginBottom: '1%',
                      marginLeft: '2%',
                      width: '95%',
                    }}>
                    Create Content
                  </Typography>

                  <TextField
                    id='title'
                    name='title'
                    label='Title'
                    variant='outlined'
                    helperText={errors.title}
                    error={errors.title ? true : false}
                    value={title}
                    required
                    onInput={(event) => setTitle(event.target.value)}
                    fullWidth
                  />

                  <TextField
                    id='subtitle'
                    name='subtitle'
                    label='Subtitle'
                    variant='outlined'
                    required
                    helperText={errors.subtitle}
                    error={errors.subtitle ? true : false}
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                    fullWidth
                  />

                  <TextField
                    id='outlined-multiline-static'
                    name='description'
                    label='Description'
                    variant='outlined'
                    required
                    multiline
                    rows={4}
                    helperText={errors.description}
                    error={errors.description ? true : false}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    fullWidth
                  />

                  <TextField
                    id='orderNo'
                    name='orderNo'
                    label='Display Priority'
                    type='number'
                    required
                    variant='outlined'
                    error={errors.orderNo ? true : false}
                    helperText="Content will be sorted by the Displaying priority. Higher number means higher priority. When the priority matches another content's priority, the content created later will have higher priority."
                    value={orderNo}
                    onChange={(event) => setOrderNo(Number(event.target.value))}
                    fullWidth
                  />

                  <div
                    style={{
                      marginBottom: '2%',
                      marginLeft: '2%',
                      marginTop: '2%',
                      width: '95%',
                      border: '1px solid #C4C4C4',
                      borderRadius: '4px',
                    }}>
                    <FormControl
                      component='fieldset'
                      style={{
                        marginBottom: '2%',
                        marginLeft: '2%',
                        marginTop: '2%',
                        width: '95%',
                      }}>
                      <FormLabel component='legend'>Content Type</FormLabel>
                      <RadioGroup
                        aria-label='contentType'
                        name='contentType'
                        value={type}
                        onChange={(event) =>
                          setType(Number(event.target.value))
                        }>
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label='Social Media'
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label='2D & 3D'
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio />}
                          label='Video'
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {type === 3 && (
                    <TextField
                      id='videoUrl'
                      name='videoUrl'
                      label='Video Url'
                      variant='outlined'
                      helperText={errors.videoUrl}
                      error={errors.videoUrl ? true : false}
                      value={videoUrl}
                      onChange={(event) => setVideoUrl(event.target.value)}
                      fullWidth
                      required
                    />
                  )}

                  <div
                    style={{
                      margin: '3% 2%',
                      width: '91%',
                      border: '1px solid #C4C4C4',
                      borderRadius: '4px',
                      padding: '2%',
                      color: 'grey',
                    }}>
                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      Upload Thumbnail Image to be used in the home page
                    </div>

                    <div
                      style={{
                        marginBottom: '1%',
                      }}>
                      <Button variant='contained' component='label'>
                        <input
                          id='thumbnailInput'
                          type='file'
                          accept='image/*'
                          required
                          onChange={uploadThumbnail}
                        />
                      </Button>
                    </div>
                  </div>

                  {type !== 3 && (
                    <div
                      style={{
                        margin: '3% 2%',
                        width: '91%',
                        border: '1px solid #C4C4C4',
                        borderRadius: '4px',
                        padding: '2%',
                        color: 'grey',
                      }}>
                      <div
                        style={{
                          marginBottom: '1%',
                        }}>
                        Upload Main Image (The image to be displayed on the top
                        in the content page) for 2D & 3D or Social Media
                      </div>

                      <div
                        style={{
                          marginBottom: '1%',
                        }}>
                        <Button variant='contained' component='label'>
                          <input
                            id='mainImageInput'
                            type='file'
                            accept='image/*'
                            required
                            onChange={uploadMainImage}
                          />
                        </Button>
                      </div>
                    </div>
                  )}

                  {type === 2 && (
                    <div
                      style={{
                        margin: '3% 2%',
                        width: '91%',
                        border: '1px solid #C4C4C4',
                        borderRadius: '4px',
                        padding: '2%',
                        color: 'grey',
                      }}>
                      <div
                        style={{
                          marginBottom: '1%',
                        }}>
                        Upload additional images for 2D & 3D (These will be
                        displayed after the main image)
                      </div>
                      {imageListInputButtons.map((item, index) => (
                        <div
                          style={{
                            marginBottom: '1%',
                          }}
                          key={index}>
                          <Button variant='contained' component='label'>
                            <input
                              id={`imageListInput${index}`}
                              type='file'
                              accept='image/*'
                              onChange={(event) => {
                                uploadImageList(event, index);
                              }}
                            />
                          </Button>
                          <Button
                            onClick={() => {
                              setImageListInputButtons(['']);
                              //TODO: Clear imageListArray
                              // console.log('imageListInputButtons After', imageListInputButtons);
                            }}>
                            <RemoveCircleIcon />
                          </Button>
                        </div>
                      ))}

                      <Button
                        onClick={() => {
                          setImageListInputButtons([
                            ...imageListInputButtons,
                            '',
                          ]);
                        }}>
                        Add more images <AddCircleIcon />
                      </Button>
                    </div>
                  )}

                  <Button
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{
                      margin: '2%',
                      width: '95%',
                      padding: '1%',
                    }}
                    disabled={!loading && (isSuccessfull || isFailed)}>
                    Create Content
                    {loading && (
                      <CircularProgress
                        className='classes.progress'
                        size='50'></CircularProgress>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Paper>
        </div>
      </Grow>

      {(loading || isSuccessfull || isFailed) && (
        <Dialog
          open={loading || isSuccessfull || isFailed}
          keepMounted
          onClose={() => {
            setIsSuccessfull(false);
            setIsFailed(false);
            setLoading(false);
          }}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'>
          <DialogTitle id='alert-dialog-slide-title'>
            {!isSuccessfull && !isFailed
              ? 'Creating the content'
              : isFailed
              ? 'Failed'
              : 'Successful'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {!isSuccessfull && !isFailed
                ? 'Please Wait'
                : isFailed
                ? `Failed - Try again ${contentId}`
                : `Good job!!! Content is created with Content ID:  ${contentId}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsSuccessfull(false);
                setLoading(false);
                setIsFailed(false);
                clearForm();
              }}
              color='primary'>
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CreateContent;
