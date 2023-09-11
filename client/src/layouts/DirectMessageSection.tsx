import React from "react";
import { type TFAKE, fakeData } from "../fake";

type TProps = {
    chats: TFAKE["chats"];
};

export default function DirectMessageSection(props: TProps) {
    return (
        <div className="flex flex-col">
            {props.chats.map((chat) => {
                const { chats, withUsername } = chat;

                const name =
                    fakeData.users.find(
                        (user) => user.username === withUsername
                    )?.name || "Unknown";
                const latestChat = chats[chats.length - 1];

                return (
                    <div className="p-2 flex cursor-pointer hover:bg-slate-800">
                        <div className="p-2 flex justify-center items-center">
                            <div className="w-10 aspect-square border rounded-full"></div>
                        </div>
                        <div className="p-2">
                            <div className="font-semibold">{name}</div>
                            <div className={`text-sm text-ellipsis flex-1 ${chat.read && "opacity-40"}`}>
																{
																	`${latestChat.side == 1 ? "You: " : ""} ${latestChat.stickerId ? "Sticker" : latestChat.message}`
																}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
