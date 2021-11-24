import { AnyAction } from "redux";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
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
import { defaultState } from "../initialState";
import { IUser, IUserState, ProgressStatus } from "../interfaces";

const editUser = (state: IUserState, updatedUser: IUser): IUser[] => {
  const { selectedUserId, users } = state;
  const index = users.findIndex((user) => user.id === selectedUserId);
  return [...users.splice(0, index), updatedUser, ...users.splice(index + 1)];
};

export default function reducer(
  state: IUserState = defaultState?.userState,
  action: AnyAction
): IUserState {
  switch (action.type) {
    case SELECT_USER_ID: {
      return {
        ...state,
        selectedUserId: action.payload,
        updatingStatus: undefined,
      };
    }

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

    case ADD_NEW_USER_REQUEST: {
      return {
        ...state,
        updatingStatus: ProgressStatus.LOADING,
      };
    }

    case ADD_NEW_USER_SUCCESS: {
      return {
        ...state,
        updatingStatus: ProgressStatus.SUCCESSFUL,
        remainingUser: state.users.length + 1,
        users: [...state.users, action?.payload],
      };
    }

    case ADD_NEW_USER_FAILURE: {
      return {
        ...state,
        updatingStatus: ProgressStatus.FAILED,
        error: action?.payload,
      };
    }

    case EDIT_USER_REQUEST: {
      return {
        ...state,
        updatingStatus: ProgressStatus.LOADING,
      };
    }

    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        updatingStatus: ProgressStatus.SUCCESSFUL,
        users: editUser(state, action?.payload),
      };
    }

    case EDIT_USER_FAILURE: {
      return {
        ...state,
        updatingStatus: ProgressStatus.FAILED,
        error: action?.payload,
      };
    }

    case DELETE_USER_REQUEST: {
      return {
        ...state,
        updatingStatus: ProgressStatus.LOADING,
      };
    }

    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        updatingStatus: ProgressStatus.SUCCESSFUL,
        remainingUser: state.users.length - 1,
        users: state?.users.filter(
          (user: IUser) => user.id !== state?.selectedUserId
        ),
      };
    }

    case DELETE_USER_FAILURE: {
      return {
        ...state,
        updatingStatus: ProgressStatus.FAILED,
        error: action?.payload,
      };
    }

    default:
      return state;
  }
}
