import { _Button as Button } from "../shared/button/button";
import { StyledTypography } from "../../styles";
import { ThemeDialogProps } from "./theme-dialog.props";
import {
  StyledThemeDialog,
  StyledThemeDialogHeader,
  StyledThemeDialogBody,
  StyledThemeDialogFooter,
} from "./theme-dialog.styles";

import { useGetDeviceType } from "../../shared/utils/hooks/useGetDeviceType";
import { DeviceTypes } from "../../shared/utils/enums/deviceTypes";

export const _ThemeDialog = (props: ThemeDialogProps) => {
  const handleThemeSave = () => {
    props.onClose();
  };

  return (
    <StyledThemeDialog
      open={props.open}
      onClose={props.onClose}
      fullScreen={useGetDeviceType() !== DeviceTypes.DESKTOP}
    >
      <StyledThemeDialogHeader>
        <StyledTypography variant="h3">Change theme</StyledTypography>
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
          onClick={handleThemeSave}
        />
      </StyledThemeDialogFooter>
    </StyledThemeDialog>
  );
};
