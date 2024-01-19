// store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

const initialState = {
  fileData: [],
  allFileData: [],
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILE_DATA':
      return { ...state, fileData: action.payload };
    case 'SET_ALL_FILE_DATA':
      return { ...state, allFileData: action.payload };
    default:
      return state;
  }
};

export const setFileData = (data) => ({
  type: 'SET_FILE_DATA',
  payload: data,
});

export const setAllFileData = (data) => ({
  type: 'SET_ALL_FILE_DATA',
  payload: data,
});

export const fetchData = () => async (dispatch) => {
  try {
    const [fileDataResponse, allFileDataResponse] = await Promise.all([
      fetch('http://localhost:4000/files/data'),
      fetch('http://localhost:4000/files/data/allfiles'),
    ]);

    const fileData = await fileDataResponse.json();
    const allFileData = await allFileDataResponse.json();

    dispatch(setFileData(fileData));
    dispatch(setAllFileData(allFileData));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const store = createStore(fileReducer, applyMiddleware(thunk));

export default store;
