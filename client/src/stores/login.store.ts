
import { create } from "zustand";

interface ILoginStore {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

export const useLoginStore = create<ILoginStore>()((set) => ({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));
