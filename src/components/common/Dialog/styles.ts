import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const DialogHeader = styled(DialogTitle)`
  border-bottom: solid 1px #dee1eb;
  position: relative;
  &&& {
    padding: 16px 30px;
  }
  min-height: 70px;
  box-sizing: border-box;
`;

export const HeaderTitle = styled(Typography)`
  text-align: center;
  font-size: 20px;
`;

export const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  right: 24px;
  top: 24px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Content = styled(DialogContent)`
  &&& {
    padding: 30px;
  }
  min-width: 220px;
`;
