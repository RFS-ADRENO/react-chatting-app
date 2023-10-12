import { type TFAKE, fakeData } from "../fake";
import { useChatStore } from "../stores/chat.store";
import { isStickerMessage } from "../utils";

type TProps = {
    chats: TFAKE["chats"];
		username: string | null;
};

export default function DirectMessageSection(props: TProps) {
		const { setCurrentChatPartnerUsername } = useChatStore();

    return (
        <div className="flex flex-col mt-1 mr-1">
            {props.chats.map((chat, index) => {
                const { chats, withUsername } = chat;

                const name =
                    fakeData.users.find(
                        (user) => user.username === withUsername
                    )?.name || "Unknown";
                const latestChat = chats[chats.length - 1];

                return (
                    <div key={index} className={`p-2 flex cursor-pointer rounded-md bg-opacity-80 ${props.username == withUsername ? "bg-slate-800" : "hover:bg-slate-800"}`} onClick={() => setCurrentChatPartnerUsername(chat.withUsername)}>
                        <div className="p-2 flex justify-center items-center">
                            <div className="w-10 aspect-square border rounded-full"></div>
                        </div>
                        <div className="p-2 overflow-hidden">
                            <div className="font-semibold line-clamp-1 text-ellipsis">{name}</div>
                            <div className={`text-sm text-ellipsis ${chat.read ? " opacity-40" : ""} line-clamp-1 text-ellipsis`}>
																{
																	`${latestChat.side == 1 ? "You: " : ""} ${isStickerMessage(latestChat) ? "Sticker" : latestChat.message}`
																}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
