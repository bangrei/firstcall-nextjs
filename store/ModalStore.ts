import { create } from "zustand";

interface ModalState {
  title: string;
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setTitle: (title: string) => void;
  setId: (id: string) => void;
  setUsername: (username: string) => void;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  title: "",
  id: "",
  username: "",
  firstname: "",
  lastname: "",
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setTitle: (title) => set({ title: title }),
  setId: (id) => set({ id: id }),
  setUsername: (username) => set({ username: username }),
  setFirstname: (firstname) => set({ firstname: firstname }),
  setLastname: (lastname) => set({ lastname: lastname }),
}));
