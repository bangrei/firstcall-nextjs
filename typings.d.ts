interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

interface Board {
  users: User[];
  total: number;
}
