import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import axios from 'axios';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

export default function ContactUsMessages(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const [state, setState] = useState([]);

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

  useEffect(() => {
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
        style={{ margin: '4% 4% 0% 4%', padding: '1% 0% 1% 0%' }}
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
