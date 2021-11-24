import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  USER_LIST_URL,
  ADD_NEW_USER_REQUEST,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SELECT_USER_ID,
} from "../../constants";
import { AnyAction, Dispatch } from "redux";
import axios from "axios";
import { IUser } from "../interfaces";

export const setUserIdInRedux = (userId?: string) => ({
  type: SELECT_USER_ID,
  payload: userId,
});

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

export const addNewUser =
  (data: IUser) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: ADD_NEW_USER_REQUEST,
    });
    try {
      const res = await axios.post(USER_LIST_URL, data);
      dispatch({
        type: ADD_NEW_USER_SUCCESS,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: ADD_NEW_USER_FAILURE,
        payload: e.message,
      });
    }
  };

export const editUser =
  (userId: string, data: IUser) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: EDIT_USER_REQUEST,
    });
    try {
      const res = await axios.put(`${USER_LIST_URL}/${userId}`, data);
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: EDIT_USER_FAILURE,
        payload: e.message,
      });
    }
  };

export const deleteUser =
  (userId: string) => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    try {
      const res = await axios.delete(`${USER_LIST_URL}/${userId}`);
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: e.message,
      });
    }
  };
