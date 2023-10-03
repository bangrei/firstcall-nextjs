interface User {
  id: string | null;
  username: string;
  firstname: string;
  lastname: string;
}

interface Board {
  users: User[];
  total: number;
}
