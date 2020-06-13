import React, { Component } from 'react';
import ThumbnailCards from '../components/ThumbnailCards';

class Videos extends Component {
  render() {
    return <ThumbnailCards dataPath='/videos' />;
  }
}

export default Videos;
