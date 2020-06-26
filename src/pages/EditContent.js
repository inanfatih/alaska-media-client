import React from 'react';
import MaterialTable from 'material-table';

import axios from 'axios';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

export default function EditContent(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const [state, setState] = React.useState([]);

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Subtitle', field: 'subtitle' },
    {
      title: 'Priority',
      type: 'numeric',
      field: 'orderNo',
    },
    {
      title: 'Content Type',
      field: 'type',
      lookup: { 1: 'Social Media', 2: '2D & 3D', 3: 'Video' },
    },
    { title: 'VideoURL', field: 'videoUrl' },
    { title: 'Thumbnail', field: 'thumbnail' },
    { title: 'Main Image', field: 'mainImage' },
    { title: 'Additional Images', field: 'imageList' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'ID', field: 'contentId' },
  ];

  React.useEffect(() => {
    axios
      .get('/content')
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
    <MaterialTable
      title='Content'
      columns={columns}
      data={state}
      editable={{
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve) => {
        //     IsAuthenticated();
        //     setTimeout(() => {
        //       resolve();
        //       if (oldData) {
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data[data.indexOf(oldData)] = newData;
        //           return { ...prevState, data };
        //         });
        //       }
        //     }, 600);
        //   }),
        onRowDelete: async (oldData) => {
          IsAuthenticated();
          const contentId = oldData.contentId;
          console.log('oldData', oldData);
          console.log('contentId', contentId);
          await axios
            .delete(`/content/${contentId}`)
            .then((res) => {
              setState(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      }}
    />
  );
}
