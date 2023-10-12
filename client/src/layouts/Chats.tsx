import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    useCallback,
} from "react";
import { isStickerMessage } from "../utils";

import { AiFillInfoCircle } from "react-icons/ai";
import { PiStickerDuotone } from "react-icons/pi";
import { BsFillImageFill } from "react-icons/bs";

import { fakeData } from "../fake";
import { useWindowDimensions } from "../hooks";

import PopoverStickers from "../components/PopoverStickers";

type Props = {
    username: string;
    rightSideToggle: () => void;
    isRightSideOpen: boolean;
};

export default function Chats(props: Props) {
    const [fakeChats, setFakeChats] = useState(fakeData.chats);
    const { width } = useWindowDimensions();
    const dummyDiv = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const stickerButtonRef = useRef<HTMLButtonElement>(null);

    const refs = useCallback(() => {
        return [stickerButtonRef];
    }, [stickerButtonRef]);

    const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);

    useEffect(() => {
        dummyDiv.current?.scrollIntoView({ behavior: "auto" });
    }, [fakeChats]);

    const chats = useMemo(() => {
        const chats = fakeChats.find(
            (chat) => chat.withUsername === props.username
        )!.chats;

        const finalChats: {
            side: number;
            data: (
                | {
                      message: string;
                      timestamp: number;
                  }
                | {
                      stickerId: number;
                      timestamp: number;
                  }
            )[];
        }[] = [];

        for (const chat of chats) {
            if (finalChats.length == 0) {
                finalChats.push({
                    side: chat.side,
                    data: [
                        isStickerMessage(chat)
                            ? {
                                  stickerId: chat.stickerId!,
                                  timestamp: chat.timestamp,
                              }
                            : {
                                  message: chat.message,
                                  timestamp: chat.timestamp,
                              },
                    ],
                });
            } else {
                const latestChat = finalChats[finalChats.length - 1];

                if (latestChat.side == chat.side) {
                    if (isStickerMessage(chat)) {
                        latestChat.data.push({
                            stickerId: chat.stickerId!,
                            timestamp: chat.timestamp,
                        });
                    } else {
                        latestChat.data.push({
                            message: chat.message,
                            timestamp: chat.timestamp,
                        });
                    }
                } else {
                    finalChats.push({
                        side: chat.side,
                        data: [
                            isStickerMessage(chat)
                                ? {
                                      stickerId: chat.stickerId!,
                                      timestamp: chat.timestamp,
                                  }
                                : {
                                      message: chat.message,
                                      timestamp: chat.timestamp,
                                  },
                        ],
                    });
                }
            }
        }

        return finalChats;
    }, [props.username, fakeChats]);

    const totalChatCount = useMemo(() => {
        return chats.reduce((acc, chat) => {
            return acc + chat.data.length;
        }, 0);
    }, [chats]);

    function isNextMessageDifferentSide(index: number) {
        if (index + 1 >= chats.length) return false;

        return chats[index].side != chats[index + 1].side;
    }

    function stickerPickerToggle(value?: boolean) {
        return () => {
            return typeof value == "boolean"
                ? setIsStickerPickerOpen(value)
                : setIsStickerPickerOpen(!isStickerPickerOpen);
        };
    }

    function applyStickertoMessage() {
        return (stickerId: number) => {
            setFakeChats((prev) => {
                const curChat = prev.find(
                    (chat) => chat.withUsername == props.username
                )!;
                curChat.chats.push({
                    stickerId: stickerId,
                    side: 1,
                    timestamp: Date.now(),
                });

                return [...prev];
            });
        };
    }

    function chat() {
        return (message: string) => {
            setFakeChats((prev) => {
                const curChat = prev.find(
                    (chat) => chat.withUsername == props.username
                )!;
                curChat.chats.push({
                    message: message,
                    side: 1,
                    timestamp: Date.now(),
                });

                return [...prev];
            });
        };
    }

    return (
        <div className="flex flex-col h-full">
            <div
                id="header-center"
                className="h-14 border-b flex justify-between items-center px-2"
            >
                <div className="flex items-center gap-2 p-2">
                    <div className="w-10 h-10 rounded-full bg-slate-800"></div>
                    <div>
                        {
                            fakeData.users.find(
                                (u) => u.username == props.username
                            )!.name
                        }
                    </div>
                </div>
                <div>
                    <button onClick={props.rightSideToggle}>
                        <AiFillInfoCircle className="w-6 h-6 text-slate-500" />
                    </button>
                </div>
            </div>
            <div className="flex-1 py-4 min-h-0 h-full flex flex-col justify-end overflow-hidden">
                <div className="overflow-y-auto w-full">
                    {totalChatCount > 20 && (
                        <div className="p-2 text-center">
                            <button className="border p-2 rounded-md">
                                LOAD MORE?
                            </button>
                        </div>
                    )}
                    <div className="flex flex-col gap-8">
                        {chats.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`px-2 flex ${
                                        chat.side == 1
                                            ? "flex-row"
                                            : "flex-row-reverse"
                                    } justify-end items-end gap-2 w-full`}
                                >
                                    <div
                                        className={`flex flex-col gap-1 justify-end ${
                                            chat.side == 1
                                                ? "items-end"
                                                : "items-start"
                                        }`}
                                    >
                                        {chat.data.map((data, index) => {
                                            if ("message" in data) {
                                                return (
                                                    <div
                                                        key={index + 1000}
                                                        className={`${
                                                            chat.side == 1
                                                                ? "bg-slate-200"
                                                                : "bg-slate-800"
                                                        } rounded-md p-2 text-slate-500 break-words transition-all`}
                                                        style={{
                                                            maxWidth:
                                                                props.isRightSideOpen
                                                                    ? width <
                                                                      1024
                                                                        ? "350px"
                                                                        : width <
                                                                          1280
                                                                        ? "500px"
                                                                        : "620px"
                                                                    : width <
                                                                      1024
                                                                    ? "540px"
                                                                    : width <
                                                                      1280
                                                                    ? "720px"
                                                                    : "870px",
                                                        }}
                                                    >
                                                        {data.message}
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className="w-20 h-20">
                                                        <img
                                                            src={`/stickers/${data.stickerId}.png`}
                                                            alt="Sticker"
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    {chat.side == 0 && (
                                        <div className="w-8 aspect-square border rounded-full bg-slate-800"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {chats[chats.length - 1].side == 1 && (
                        <div className="text-sm text-slate-400 px-2 flex justify-end">
                            Sent
                        </div>
                    )}
                    <div ref={dummyDiv}></div>
                </div>
            </div>
            <div className="relative px-2 h-12 flex items-center gap-3">
                <button
                    className="flex justify-center items-center p-2 border rounded-full w-8 h-8 hover:bg-slate-700"
                    onClick={stickerPickerToggle()}
                    ref={stickerButtonRef}
                >
                    <PiStickerDuotone size={20} />
                </button>
                <button className="flex justify-center items-center p-2 border rounded-full w-8 h-8 hover:bg-slate-700">
                    <BsFillImageFill size={20} />
                </button>

                <form
                    className="flex-1 flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (inputRef.current!.value) {
                            chat()(inputRef.current!.value);

                            inputRef.current!.value = "";
                        }
                    }}
                >
                    <input
                        type="text"
                        className="p-2 outline-none bg-slate-700 w-full h-8 rounded-md"
                        placeholder="Aa"
                        ref={inputRef}
                    />
                    <button
                        type="submit"
                        className="p-2 border rounded-md hover:bg-slate-500 h-8 text-sm flex justify-center items-center"
                    >
                        Send
                    </button>
                </form>
                <PopoverStickers
                    isOpen={isStickerPickerOpen}
                    close={stickerPickerToggle()}
                    applyStickertoMessage={applyStickertoMessage()}
                    includes={refs}
                />
            </div>
        </div>
    );
}
