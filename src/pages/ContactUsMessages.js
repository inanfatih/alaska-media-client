import React from 'react';
import MaterialTable from 'material-table';

import axios from 'axios';
//MUI
import { makeStyles } from '@material-ui/core/styles';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(0),
  },
}));

export default function ContactUsMessages(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }
  const classes = useStyles();

  const [state, setState] = React.useState([]);

  const columns = [
    { title: 'Name', field: 'name' },
    {
      title: 'Email',
      field: 'email',
    },
    {
      title: 'Phone',
      field: 'phone',
    },

    {
      title: 'Message',
      field: 'message',
    },
    {
      title: 'Sent At',
      field: 'createdAt',
    },
  ];

  React.useEffect(() => {
    axios
      .get('/contact')
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ margin: '-2%' }}>
      <br />
      <MaterialTable
        title='Messages'
        columns={columns}
        data={state}
        style={{ margin: '3% 4%', padding: '1%' }}
        editable={{
          onRowDelete: async (oldData) => {
            IsAuthenticated();
            const messageId = oldData.messageId;
            console.log('oldData', oldData);
            console.log('contactId', messageId);
            await axios
              .delete(`/contact/${messageId}`)
              .then((res) => {
                setState(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        }}
      />
    </div>
  );
}
