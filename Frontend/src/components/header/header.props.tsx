import { SearchResultItem } from "../../shared/utils/typescript/types";

export interface HeaderProps {
  isSearching?: boolean;
  searchPhrase?: string;
  searchResults?: SearchResultItem[];
  totalResults?: number;

  window?: () => Window;
  children?: React.ReactElement;

  onSearchPhraseChange?: (query: string) => void;
  onSearch?: (searchPhrase: string) => void;
}
