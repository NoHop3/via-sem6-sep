export interface NavItem {
  name: string;
  path: string;
}

export interface Notification {
  open: boolean;
  type: "success" | "error";
  message: string;
}

export interface SearchResultItem {
  Id: number;
  Name: string;
  Rating?: number;
  Type: string;
  Year?: number;
  Poster?: string;
}
