import { Theme } from "../../shared/models/theme";

export interface ThemeDialogProps extends Theme {
  open: boolean;
  fullScreen: boolean;
  onClose: () => void;
  onSave: () => void;
  onThemeChange?: (theme: Theme) => void;
  onThemeModeChange?: (mode: "light" | "dark") => void;
  onThemeColorMainChange?: (color: string) => void;
  onThemeColorDarkChange?: (color: string) => void;
  onThemeColorLightChange?: (color: string) => void;
  onThemeColorBackgroundChange?: (color: string) => void;
  onThemeContrastTextChange?: (color: string) => void;
}
