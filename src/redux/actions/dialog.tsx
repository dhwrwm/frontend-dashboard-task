import { OPEN_DIALOG, CLOSE_DIALOG } from "../../constants";
import { DialogType } from "../interfaces";

export const openDialog = (type: DialogType) => ({
  type: OPEN_DIALOG,
  payload: type,
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});
