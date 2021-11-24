import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  USER_LIST_URL,
} from "../../constants";
import { AnyAction, Dispatch } from "redux";
import axios from "axios";

export const getUsers = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: GET_USERS_REQUEST,
  });
  try {
    const res = await axios.get(USER_LIST_URL);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
    });
  }
};
