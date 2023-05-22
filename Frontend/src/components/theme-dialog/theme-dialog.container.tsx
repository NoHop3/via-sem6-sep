import { _Button as Button } from "../shared/button/button";
import { _ColorPicker as ColorPicker } from "../color-picker/color-picker";
import { StyledTypography } from "../../styles";
import { ThemeDialogProps } from "./theme-dialog.props";
import {
  StyledThemeDialog,
  StyledThemeDialogHeader,
  StyledThemeDialogBody,
  StyledThemeDialogFooter,
  StyledThemeDialogBodyRow,
} from "./theme-dialog.styles";

import { useGetDeviceType } from "../../shared/utils/hooks/useGetDeviceType";
import { DeviceTypes } from "../../shared/utils/enums/deviceTypes";

export const _ThemeDialog = (props: ThemeDialogProps) => {
  const { primary } = props.theme;
  const handleThemeSave = () => {
    props.onClose();
  };

  return (
    <StyledThemeDialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      fullScreen={useGetDeviceType() !== DeviceTypes.DESKTOP}
    >
      <StyledThemeDialogHeader>
        <StyledTypography variant="h3">Change theme</StyledTypography>
      </StyledThemeDialogHeader>
      <StyledThemeDialogBody>
        <StyledThemeDialogBodyRow>
          <ColorPicker
            title="Primary color"
            color={primary.main}
            onColorChange={props.setPrimaryThemeMain}
          />
          <ColorPicker
            title="Light color"
            color={primary.light}
            onColorChange={props.setPrimaryThemeMain}
          />
          <ColorPicker
            title="Dark color"
            color={primary.dark}
            onColorChange={props.setPrimaryThemeMain}
          />
        </StyledThemeDialogBodyRow>
      </StyledThemeDialogBody>
      <StyledThemeDialogFooter>
        <Button
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disabled={false}
          text={"Save"}
          onClick={props.onClose}
        />
        <Button
          size={"small"}
          variant={"contained"}
          color={"primary"}
          disabled={false}
          text={"Close"}
          onClick={handleThemeSave}
        />
      </StyledThemeDialogFooter>
    </StyledThemeDialog>
  );
};
