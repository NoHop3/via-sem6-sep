import { Theme } from "../../shared/models/theme";

export interface ThemeDialogProps extends DialogProps {
  theme: Theme;
  setPrimaryThemeMain: (color: string) => void;
  setTextThemePrimary: (color: string) => void;
  setBackgroundColor: (color: string) => void;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}
