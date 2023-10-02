import { getUsersFromDB } from "@/lib/services";
import { create } from "zustand";

interface BoardState {
  loading: boolean;
  perPage: number;
  pageNums: number;
  totalRows: number;
  searchString: string;
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  removeUser: (id: string) => void;
  updateUser: (user: User) => void;
  createUser: (user: any) => void;
  setSearchString: (search: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  loading: false,
  perPage: 5,
  pageNums: 0,
  totalRows: 0,
  searchString: "",
  board: {
    users: [],
    total: 0,
  },
  getBoard: async () => {
    set({ loading: true });
    let board = await getUsersFromDB();

    let searchString = get().searchString;
    let perPage = get().perPage;
    let totalRows = board.total;
    let nums =
      Math.floor(board.total / perPage) + (board.total % perPage > 0 ? 1 : 0);
    if (searchString) {
      let len = board.users.filter((s) => {
        return (
          s.username.toLowerCase().includes(searchString.toLowerCase()) ||
          s.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
          s.lastname.toLowerCase().includes(searchString.toLowerCase())
        );
      }).length;
      totalRows = len;
      nums = Math.floor(len / perPage) + (len % perPage > 0 ? 1 : 0);
    }
    set({ board });
    set({ perPage: perPage });
    set({ pageNums: nums });
    set({ totalRows: totalRows });
    set({ loading: false });
  },
  setBoardState: (board) => set({ board }),
  updateUser: async (user) => {
    const oldBoard = get().board;
    const users = oldBoard.users.map((u) => {
      if (u.id == user.id) u = user;
      return u;
    });
    const board = {
      ...oldBoard,
      users: users,
    };
    set({ board });
  },
  createUser: async (user: any) => {
    const oldBoard = get().board;
    const users = [user, ...oldBoard.users];
    const board = {
      ...oldBoard,
      users: users,
      total: oldBoard.total + 1,
    };

    let searchString = get().searchString;
    let totalRows = get().totalRows;
    let perPage = get().perPage;
    let nums =
      Math.floor(board.total / perPage) + (board.total % perPage > 0 ? 1 : 0);
    if (searchString) {
      let len = board.users.filter((s) => {
        return (
          s.username.toLowerCase().includes(searchString.toLowerCase()) ||
          s.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
          s.lastname.toLowerCase().includes(searchString.toLowerCase())
        );
      }).length;
      totalRows = len;
      nums = Math.floor(len / perPage) + (len % perPage > 0 ? 1 : 0);
    }

    set({ board });
    set({ perPage: perPage });
    set({ pageNums: nums });
    set({ totalRows: totalRows });
  },
  removeUser: async (id) => {
    const oldBoard = get().board;
    const users = oldBoard.users.filter((user) => {
      return user.id !== id;
    });
    let board = {
      ...oldBoard,
      users: users,
      total: oldBoard.total - 1,
    };
    let searchString = get().searchString;
    let totalRows = get().totalRows;
    let perPage = get().perPage;
    let nums =
      Math.floor(board.total / perPage) + (board.total % perPage > 0 ? 1 : 0);
    if (searchString) {
      let len = board.users.filter((s) => {
        return (
          s.username.toLowerCase().includes(searchString.toLowerCase()) ||
          s.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
          s.lastname.toLowerCase().includes(searchString.toLowerCase())
        );
      }).length;
      totalRows = len;
      nums = Math.floor(len / perPage) + (len % perPage > 0 ? 1 : 0);
    }
    set({ board });
    set({ perPage: perPage });
    set({ pageNums: nums });
    set({ totalRows: totalRows });
  },
  setSearchString: (searchString) => {
    const board = get().board;
    let totalRows = get().totalRows;
    let perPage = get().perPage;
    let nums =
      Math.floor(board.total / perPage) + (board.total % perPage > 0 ? 1 : 0);

    if (searchString !== "") {
      let len = board.users.filter((s) => {
        return (
          s.username.toLowerCase().includes(searchString.toLowerCase()) ||
          s.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
          s.lastname.toLowerCase().includes(searchString.toLowerCase())
        );
      }).length;
      totalRows = len;
      nums = Math.floor(len / perPage) + (len % perPage > 0 ? 1 : 0);
    }

    set({ searchString });
    set({ perPage: perPage });
    set({ pageNums: nums });
    set({ totalRows: totalRows });
  },
}));
