import React, { useReducer } from 'react';
import ContentContext from './contentContext';
import contentReducer from './contentReducer';
import { GET_CONTENT, CONTENT_ERROR, DELETE_CONTENT } from '../types';
import axios from 'axios';

const ContentState = (props) => {
  const initialState = {
    content: [],
    loading: true,
    error: null,
    current: null,
    allContentPath: '/content',
  };

  const [state, dispatch] = useReducer(contentReducer, initialState);

  const getContent = async (dataPath) => {
    try {
      const res = await axios.get(dataPath);
      console.log('res', res.data);
      dispatch({
        type: GET_CONTENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTENT_ERROR,
        payload: error.response,
      });
    }
  };

  const deleteContent = async (contentId) => {
    try {
      const res = await axios.delete(`/content/${contentId}`);

      dispatch({
        type: DELETE_CONTENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTENT_ERROR,
        payload: error.response,
      });
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content: state.content,
        loading: state.loading,
        error: state.error,
        current: state.current,
        allContentPath: state.allContentPath,
        getContent,
        deleteContent,
      }}>
      {props.children}
    </ContentContext.Provider>
  );
};

export default ContentState;
