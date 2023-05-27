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
  id: number;
  name: string;
  rating?: number;
  type: string;
  year?: number;
  poster?: string;
}
