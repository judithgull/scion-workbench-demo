export interface Person {
  id: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  gender?: 'Male' | 'Female';
  street?: 'Male' | 'Female';
  city?: number;
  profession?: string;
  friends?: number[];
}
