import { IMainState } from "./interfaces";

export const defaultState: IMainState = {
  userState: {
    users: [],
  },
  dialogState: {
    open: false,
    dialogType: undefined,
  },
};
