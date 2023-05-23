export interface Person {
  id: number;
  name: string;
  birth: number;
  movies: PersonMovie[];
  description?: string;
}

export interface PersonMovie {
  personId: number;
  title: string;
  year?: number;
  role: string;
}
