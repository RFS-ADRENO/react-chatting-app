import { create } from "zustand";

type ChatStore = {
		currentChatPartnerUsername: string | null;
		setCurrentChatPartnerUsername: (username: string) => void;
};

const useChatStore = create<ChatStore>()((set) => ({
		currentChatPartnerUsername: null,
		setCurrentChatPartnerUsername: (username) =>
				set({ currentChatPartnerUsername: username }),
}));

export { useChatStore };
