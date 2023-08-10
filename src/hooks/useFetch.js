import {useEffect, useReducer} from "react";
import http from "../services/http";


const initialState = {
    data: null,
    error: null,
}

const actions = {
    fetchRequest: "FETCH_DATA_REQUEST",
    fetchSuccess: "FETCH_DATA_SUCCESS",
    fetchFailure: "FETCH_DATA_FAILURE"
}

const reducer = (state, action) => {
    switch (action.type) {
        case actions.fetchRequest: {
            return {...state, data: null}
        }
        case actions.fetchSuccess: {
            return {...state, data: action.payload}
        }
        case actions.fetchFailure: {
            return {...state, data: null, error: action.payload}
        }
        default:
            return state;
    }
}

const useFetch = (url) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({type: actions.fetchRequest});
        (async function () {
            try {
                const {data} = await http.get(url);
                dispatch({type: actions.fetchSuccess, payload: data});
            } catch (err) {
                dispatch({type: actions.fetchFailure, payload: err.message});
            }
        })()
    }, [url])

    return state
}

export default useFetch