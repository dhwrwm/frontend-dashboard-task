import { AnyAction } from "redux";
import { OPEN_DIALOG, CLOSE_DIALOG } from "../../constants";
import { defaultState } from "../initialState";

export default function reducer(
  state = defaultState?.dialogState,
  action: AnyAction
) {
  switch (action.type) {
    case OPEN_DIALOG: {
      return {
        ...state,
        open: true,
        dialogType: action?.payload,
      };
    }

    case CLOSE_DIALOG: {
      return {
        ...state,
        open: false,
        dialogType: undefined,
      };
    }

    default:
      return state;
  }
}
