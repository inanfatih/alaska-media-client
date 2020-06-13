import React, { Component } from 'react';
import ThumbnailCards from '../components/ThumbnailCards';

class Home extends Component {
  render() {
    return <ThumbnailCards dataPath='/content' />;
  }
}

export default Home;
