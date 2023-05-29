import { ResultItem } from "../../shared/utils/typescript/types";

export interface HeaderProps {
  isLoggedIn?: boolean;
  isSearching?: boolean;
  searchPhrase?: string;
  searchResults?: ResultItem[];
  totalResults?: number;

  window?: () => Window;
  children?: React.ReactElement;

  onSearchPhraseChange?: (query: string) => void;
  onSearch?: (searchPhrase: string, skip: number, take: number) => void;
  onLogout?: () => void;
}
