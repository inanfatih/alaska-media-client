import React from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
//MUI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

//Pages
import { styles } from '../util/theme';
import '../App.css';

const useStyles = makeStyles(styles);

const Contact = () => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState('');
  const [isFailed, setIsFailed] = React.useState(false);
  const [isPosted, setIsPosted] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    let messageObject = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };

    axios
      .post('/contact', messageObject)
      .then((res) => {
        console.log('res.data', res.data);
        setIsSuccessful(true);
        console.log('setIsSuccessful', isSuccessful);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsPosted(true);
      })
      .catch((err) => {
        console.log('err', err);
        setErrors(err.errors);
        console.log('errors', errors);
        setIsFailed(true);
        console.log('isFailed', isFailed);
        setIsPosted(true);
        if (
          !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
        ) {
          setEmailInvalid(true);
        } else setEmailInvalid(false);
      });
  };
  const closeDialog = () => {
    if (isSuccessful) {
      setIsPosted(false);
    }

    setIsFailed(false);
    setIsSuccessful(false);
  };

  return (
    <div>
      <Grow in timeout={500}>
        <div className={classes.contactContentBox}>
          <Paper className={classes.contactContent} elevation={10}>
            <Card className={classes.contactRoot} elevation={5}>
              <CardContent style={{ justifyContent: 'center' }}>
                <form className={classes.contactForm}>
                  <Typography
                    variant='h4'
                    component='h2'
                    style={{
                      margin: '3% 2%',
                      width: '95%',
                    }}>
                    Contact Us
                  </Typography>
                  <TextField
                    required
                    id='name'
                    label='Name'
                    variant='outlined'
                    helperText={
                      name.length === 0 ? 'Please enter your name' : ''
                    }
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                    error={
                      !isPosted
                        ? false
                        : !isSuccessful && name.length === 0
                        ? true
                        : false
                    }
                  />
                  <TextField
                    required
                    id='email'
                    label='Email'
                    variant='outlined'
                    value={email}
                    onInput={(e) => {
                      setEmail(e.target.value);
                      if (
                        !email.match(
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        )
                      ) {
                        setEmailInvalid(true);
                      } else setEmailInvalid(false);
                    }}
                    error={
                      emailInvalid && isPosted && !isSuccessful ? true : false
                    }
                    helperText={
                      email.length === 0 || emailInvalid
                        ? 'Please enter a valid email address'
                        : ''
                    }
                  />
                  <TextField
                    required
                    id='phone'
                    label='Phone Number'
                    variant='outlined'
                    value={phone}
                    onInput={(e) => setPhone(e.target.value)}
                    helperText={
                      phone.length === 0 ? 'Please enter your phone number' : ''
                    }
                    error={
                      !isPosted
                        ? false
                        : !isSuccessful && phone.length === 0
                        ? true
                        : false
                    }
                  />
                  <TextField
                    required
                    multiline
                    id='message'
                    rows={5}
                    label='Message'
                    variant='outlined'
                    value={message}
                    onInput={(e) => setMessage(e.target.value)}
                    helperText={
                      message.length === 0 ? 'Please enter your message' : ''
                    }
                    error={
                      !isPosted
                        ? false
                        : !isSuccessful && message.length === 0
                        ? true
                        : false
                    }
                  />
                  <FormHelperText
                    style={{
                      paddingLeft: '2%',
                      paddingBottom: '2%',
                    }}
                    variant='h4'
                    component='h2'>
                    We'll never share your contact details.
                  </FormHelperText>

                  <Button
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ margin: '2%', width: '95%', padding: '1%' }}
                    onClick={handleSubmit}>
                    SEND
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Paper>
        </div>
      </Grow>

      <Dialog
        open={isSuccessful || isFailed}
        keepMounted
        onClose={() => {
          setIsSuccessful(false);
          setIsFailed(false);
        }}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>
          {!isSuccessful && !isFailed
            ? 'Sending your message - Please wait'
            : isFailed
            ? 'Failed'
            : 'Successful'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {!isSuccessful && !isFailed ? (
              <CircularProgress
                color='secondary'
                size={50}
                style={{ display: 'block', margin: 'auto' }}
              />
            ) : isFailed ? (
              'Failed - Please enter all fields and try again'
            ) : (
              'Thank you for your message. We will contact you soon.'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contact;
