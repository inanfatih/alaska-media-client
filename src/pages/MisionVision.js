import React from 'react';

//MUI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';

//Pages
import { styles } from '../util/theme';
import '../App.css';

const useStyles = makeStyles(styles);

export default function TwoDThreeD(props) {
  //TODO: direct to home incase of not found content

  const classes = useStyles();

  //TODO: video oldugunda video gosterilecek sekilde degistir

  return (
    <div>
      <Grow in timeout={500}>
        <div className={classes.imageContentBox}>
          <Paper className={classes.imageContent} elevation={10}>
            <Card className={classes.mediaRoot} elevation={5}>
              <CardActionArea
                style={{
                  cursor: 'default',
                }}>
                <CardContent>
                  <Typography gutterBottom variant='h3'>
                    Title
                  </Typography>
                  <Typography gutterBottom variant='h5'>
                    Subtitle
                  </Typography>
                  <Typography variant='h6' color='textSecondary' component='p'>
                    Description
                    <br />
                    Description
                    <br />
                    Description
                    <br />
                    Description
                    <br />
                    Description
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.mediaRoot} elevation={5}>
              <CardActionArea
                style={{
                  cursor: 'default',
                }}>
                <CardContent>
                  <Typography gutterBottom variant='h3'>
                    Title
                  </Typography>
                  <Typography gutterBottom variant='h5'>
                    Subtitle
                  </Typography>
                  <Typography variant='h6' color='textSecondary' component='p'>
                    Description
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Paper>
        </div>
      </Grow>
    </div>
  );
}

//TODO: FOTOLAR VE VIDEOLAR ARASINDA GECIS ICIN KULLANILACAK: https://github.com/rcaferati/react-awesome-slider

//TODO:AWESOME SLIDER REFERANSLARI: https://caferati.me/demo/react-awesome-slider/scaling
//TODO: https://fullpage.caferati.me/

//TODO: Sayfalar arasinda gecis icin bunu kullan: https://github.com/rcaferati/ras-fullpage-strategies
