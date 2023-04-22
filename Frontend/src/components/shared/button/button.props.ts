import {
  ButtonPropsColorOverrides,
  ButtonPropsVariantOverrides,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export interface ButtonProps {
  variant:
    | OverridableStringUnion<
        "text" | "outlined" | "contained",
        ButtonPropsVariantOverrides
      >
    | undefined;
  color:
    | OverridableStringUnion<
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "error"
        | "info",
        ButtonPropsColorOverrides
      >
    | undefined;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
