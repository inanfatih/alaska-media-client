import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContentContext from './contentContext';
import contentReducer from './contentReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const ContentState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(contentReducer, initialState);

  //Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout,
    );
  };
  return (
    <ContentContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {props.children}
    </ContentContext.Provider>
  );
};

export default ContentState;
