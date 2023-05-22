import { Theme } from "../../shared/models/theme";

export interface ThemeDialogProps extends DialogProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeMode: (mode: "light" | "dark") => void;
  setPrimaryThemeMain: (color: string) => void;
  setPrimaryThemeDark: (color: string) => void;
  setPrimaryThemeLight: (color: string) => void;
  setPrimaryThemeContrastText: (color: string) => void;
  setBackgroundColor: (color: string) => void;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}
