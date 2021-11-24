export enum ProgressStatus {
  LOADING = "LOADING",
  SUCCESSFUL = "SUCCESSFUL",
  FAILED = "FAILED",
}
export interface IMainState {
  userState: IUserState;
  dialogState?: IDialogState;
}

export interface IUserState {
  progressStatus?: ProgressStatus;
  users: IUser[];
  error?: Error;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  address?: IAddress;
  phone: string;
  website: string;
  company?: ICompany;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface IDialogState {
  open?: boolean;
  dialogType?: DialogType;
}

export enum DialogType {
  ADD_USER = "ADD_USER",
  EDIT_USER = "EDIT_USER",
  DELETE_USER_CONFIRM = "DELETE_USER_CONFIRM",
}
