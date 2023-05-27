export interface Person {
  id: number;
  name: string;
  birth: number;
  movies: PersonMovie[];
  description?: string;
}

export interface PersonMovie {
  personId: number;
  name: string;
  year?: number;
  type: string;
}
