import axios from 'axios';
import * as actionTypes from './actionTypes'


const initialState = {
    baseURL: "",
    api_instance: null,
    backend_path: null,
};

const reducer = (state=initialState, action) => {
    const newState = {...state};
    switch ( action.type ) {
        case actionTypes.SET_CONF:
            newState.baseURL = action.conf.root;
            newState.backend_path = action.conf.backend_path;
            newState.api_instance = axios.create({baseURL: action.conf.api_url});
            break
        default:
            break
    }
    return(newState);
};

export default reducer;