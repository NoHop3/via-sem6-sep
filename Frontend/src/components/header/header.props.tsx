export interface HeaderProps {
  window?: () => Window;
  children?: React.ReactElement;

  onSearchPhraseChange?: (query: string) => void;
  onSearch?: (searchPhrase: string) => void;
}
