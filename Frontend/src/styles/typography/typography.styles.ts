import { Typography } from "@mui/material";
import styled from "styled-components";

interface TypographyProps {
  fontFamily?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  textTransform?: string;
  textDecoration?: string;
  fontStyle?: string;
  whiteSpace?: string;
  wordBreak?: string;
  wordWrap?: string;
  overflowWrap?: string;
}

export const StyledTypography = styled(Typography)<{
  typographyProps?: TypographyProps;
}>`
  font-family: ${({ theme, typographyProps }) =>
    typographyProps?.fontFamily ?? theme.typography.fontFamily};
  font-size: ${({ theme, typographyProps }) =>
    typographyProps?.fontSize ?? theme.typography.fontSize};
  font-weight: ${({ theme, typographyProps }) =>
    typographyProps?.fontWeight ?? theme.typography.fontWeightRegular};
  line-height: ${({ typographyProps }) => typographyProps?.lineHeight ?? "1.5"};
  letter-spacing: ${({ typographyProps }) =>
    typographyProps?.letterSpacing ?? "normal"};
  text-align: ${({ typographyProps }) => typographyProps?.textAlign ?? "left"};
  color: ${({ theme, typographyProps }) =>
    typographyProps?.color ?? theme.palette.text.primary};
  text-transform: ${({ typographyProps }) =>
    typographyProps?.textTransform ?? "none"};
  text-decoration: ${({ typographyProps }) =>
    typographyProps?.textDecoration ?? "none"};
  font-style: ${({ typographyProps }) =>
    typographyProps?.fontStyle ?? "normal"};
  white-space: ${({ typographyProps }) =>
    typographyProps?.whiteSpace ?? "normal"};
  word-break: ${({ typographyProps }) =>
    typographyProps?.wordBreak ?? "normal"};
  word-wrap: ${({ typographyProps }) => typographyProps?.wordWrap ?? "normal"};
  overflow-wrap: ${({ typographyProps }) =>
    typographyProps?.overflowWrap ?? "normal"};
`;
