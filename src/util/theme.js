import { createMuiTheme } from '@material-ui/core/styles';

export const drawerWidth = 270;
export const appBarHeight = 70;

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#202123',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DE2548',
      main: '#f00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
    // background: '#DE2548',
  },
  typography: {
    fontFamily: "['Oswald', 'sans-serif'].join(',')",
  },
});

export const styles = (theme) => ({
  root: {
    background: '#DE2548',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.down('xs')]: {
      height: appBarHeight,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#202123',
  },
  content: {
    minHeight: '100vh',
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${appBarHeight}px)`,
      marginTop: appBarHeight,
    },
    background: '#DE2548',
  },
  icons: {
    color: '#fff',
  },
  logoXs: {
    padding: '10px',
    margin: 'auto 2%',
    width: 40,
  },
  logoSmUp: {
    objectFit: 'contain',
    paddingTop: 25,
    backgroundColor: '#202123',
    width: drawerWidth * 0.5,
    height: drawerWidth * 0.7,
    margin: 'auto',
    display: 'block',
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
  socialMediaIcons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'nowrap',
    marginTop: '5%',
  },
  companyNameXs: {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#202123',
    color: 'white',
    fontSize: '2em',
    margin: 'auto',
  },
  companyNameOnDrawer: {
    padding: '10px',
    paddingBottom: '10px',
    textAlign: 'center',
    backgroundColor: '#202123',
    color: 'white',
    fontSize: '2.6em',
  },
  listItemText: {
    fontSize: '1.5em',
    margin: theme.spacing(-1),
  },

  imageContentBox: {
    [theme.breakpoints.down('xs')]: {
      padding: '3%',
      paddingTop: `calc(3% + ${appBarHeight}px)`,
      marginTop: -1 * appBarHeight,
      background: '#DE2548',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '4%',
      background: '#DE2548',
    },
  },

  imageContent: {
    [theme.breakpoints.down('xs')]: {
      height: `calc(100% - ${appBarHeight}px)`,
      padding: '2%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '2%',
      marginRight: '2%',
      padding: '2%',
    },
    background: 'white',
    color: '#202123',
  },

  cardMedia: {
    minWidth: '100%',
    backgroundSize: 'contain',
  },

  mediaRoot: {
    margin: 'auto',
    marginBottom: '2.5%',
    borderRadius: '0px',
    boxShadow: 'none',
    border: 0,
  },

  contactContentBox: {
    [theme.breakpoints.down('xs')]: {
      padding: '3%',
      paddingTop: `calc(3% + ${appBarHeight}px)`,
      marginTop: -1 * appBarHeight,
      height: `calc(100% - ${appBarHeight}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: '2% 10%',
    },
  },

  contactContent: {
    [theme.breakpoints.down('xs')]: {
      padding: '5%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5%',
      marginRight: '5%',
      padding: '5%',
    },
    background: 'white',
    color: '#202123',
  },

  contactForm: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '95%',
    },
  },
  customError: {
    color: 'red',
    fontSize: '1.5rem',
    width: '95%',
    padding: '1%',
    textAlign: 'center',
  },
});
