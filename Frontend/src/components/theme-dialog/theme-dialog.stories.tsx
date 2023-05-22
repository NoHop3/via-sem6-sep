import type { StoryObj } from "@storybook/react";
import { useState } from "react";

import { _ThemeDialog as ThemeDialog } from "./theme-dialog.container";
import { Theme } from "../../shared/models/theme";

export default {
  title: "ThemeDialog",
  component: ThemeDialog,
};
type Story = StoryObj<typeof ThemeDialog>;

export const ThemeDialogStory: Story = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState({
    mode: "light",
    primary: {
      main: "#880000",
      dark: "#121212",
      light: "#fffefc",
      contrastText: "#ffcc00",
    },
    background: "#fffefc",
  });

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </button>
      <ThemeDialog
        open={open}
        {...theme}
        onClose={() => {
          setOpen(false);
        }}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
};

ThemeDialogStory.storyName = "Theme dialog";
