
import { create } from "zustand";

interface ILoginStore {
    loggedIn?: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

export const useLoginStore = create<ILoginStore>()((set) => ({
    setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));
