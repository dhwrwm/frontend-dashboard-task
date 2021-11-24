import { AnyAction } from "redux";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../../constants";
import { defaultState } from "../initialState";
import { IUserState, ProgressStatus } from "../interfaces";

export default function reducer(
  state: IUserState = defaultState?.userState,
  action: AnyAction
) {
  switch (action.type) {
    case GET_USERS_REQUEST: {
      return {
        ...state,
        progressStatus: ProgressStatus.LOADING,
      };
    }

    case GET_USERS_SUCCESS: {
      return {
        ...state,
        progressStatus: ProgressStatus.SUCCESSFUL,
        users: action?.payload,
      };
    }

    case GET_USERS_FAILURE: {
      return {
        ...state,
        progressStatus: ProgressStatus.FAILED,
        error: action?.payload,
      };
    }
    default:
      return state;
  }
}
