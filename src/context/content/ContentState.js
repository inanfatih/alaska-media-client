import React, { useReducer } from 'react';
import ContentContext from './contentContext';
import contentReducer from './contentReducer';
import {
  GET_CONTENT,
  CONTENT_ERROR,
  DELETE_CONTENT,
  SET_LOADING,
  SET_DATAPATH,
} from '../types';
import axios from 'axios';

const ContentState = (props) => {
  const initialState = {
    content: [],
    loading: false,
    error: null,
    current: null,
    allContentPath: '/content',
    contentToCreate: {},
    dataPath: '/content',
  };

  const [state, dispatch] = useReducer(contentReducer, initialState);

  const getContent = async (dataPath) => {
    setLoading();
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
    setLoading();
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

  const setDataPath = (dataPath) => {
    dispatch({
      type: SET_DATAPATH,
      payload: dataPath,
    });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

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
        setLoading,
        setDataPath,
      }}>
      {props.children}
    </ContentContext.Provider>
  );
};

export default ContentState;
