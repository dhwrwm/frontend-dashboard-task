import { default as MuiDialog, DialogProps } from "@mui/material/Dialog";
import { DialogHeader, HeaderTitle, StyledCloseIcon, Content } from "./styles";

type Props = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
} & DialogProps;

const Dialog = ({
  title,
  children,
  open,
  handleClose,
  ...dialogProps
}: Props) => {
  return (
    <MuiDialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...dialogProps}
    >
      <DialogHeader>
        {!!title && <HeaderTitle>{title}</HeaderTitle>}
        <StyledCloseIcon onClick={handleClose} />
      </DialogHeader>
      <Content>{children}</Content>
    </MuiDialog>
  );
};

export default Dialog;
