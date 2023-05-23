export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  options?: string[];
  onOptionClick?: (option: string) => void;
}
