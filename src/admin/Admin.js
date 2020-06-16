import React from 'react';
import { Link } from 'react-router-dom';

//MUI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import kpLogo from '../images/kpLogo.png';

//Pages
import { styles } from '../util/theme';
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

const useStyles = makeStyles(styles);

export default function Admin() {
  const classes = useStyles();

  IsAuthenticated();

  return (
    <div className={classes.contactContentBox}>
      <Paper className={classes.contactContent} elevation={10}>
        <Card className={classes.contactRoot} elevation={5}>
          <CardContent style={{ justifyContent: 'center' }}>
            <img
              src={kpLogo}
              alt='Logo'
              style={{
                margin: 'auto',
                display: 'block',
                width: '60%',
              }}
            />

            <Button
              size='large'
              variant='contained'
              color='primary'
              style={{ margin: '1% 2%', width: '95%', padding: '1%' }}
              component={Link}
              to='/create-content'>
              Create Content
            </Button>

            <Button
              size='large'
              variant='contained'
              color='primary'
              style={{ margin: '1% 2%', width: '95%', padding: '1%' }}
              component={Link}
              to='/edit-content'>
              Edit Content
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}
