import { ResultItem } from "../../shared/utils/typescript/types";

export interface IHomeProps {
  items: ResultItem[];
  getHighestRated: () => void;
  getMovieDetailsFor: (id: number) => void;
}
