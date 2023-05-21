import { _Button as Button } from "../shared/button/button";
import { StyledTypography } from "../../styles";
import { ThemeDialogProps } from "./theme-dialog.props";
import {
  StyledThemeDialog,
  StyledThemeDialogHeader,
  StyledThemeDialogBody,
  StyledThemeDialogFooter,
} from "./theme-dialog.styles";

export const _ThemeDialog = (props: ThemeDialogProps) => {
  return (
    <StyledThemeDialog
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
    >
      <StyledThemeDialogHeader>
        <StyledTypography variant="h6">Theme</StyledTypography>
      </StyledThemeDialogHeader>
      <StyledThemeDialogBody>
        <StyledTypography variant="body1">Theme body</StyledTypography>
      </StyledThemeDialogBody>
      <StyledThemeDialogFooter>
        <Button
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disabled={false}
          text={"Close"}
          onClick={props.onClose}
        />
        <Button
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disabled={false}
          text={"Save"}
          onClick={props.onSave}
        />
      </StyledThemeDialogFooter>
    </StyledThemeDialog>
  );
};
