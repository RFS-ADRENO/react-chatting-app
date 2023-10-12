import { useEffect, useState } from "react";
import type { TFAKE } from "../fake";

import { useChatStore } from "../stores/chat.store";

import { DirectMessageSection, Chats, ChatPartnerBasicInfo } from ".";
import { useWindowDimensions } from "../hooks";

type TProps = {
    fake: TFAKE;
};

enum ESection {
    DM,
    GR,
    FR,
}

export default function ChatDefault(props: TProps) {
    const { currentChatPartnerUsername } = useChatStore();
    const [_loading, setLoading] = useState(true);
    const [currentSection, setCurrentSection] = useState<ESection>(ESection.DM);
    const [isRightSideOpen, setIsRightSideOpen] = useState(true);
    const { width } = useWindowDimensions();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (width < 1024) {
            setIsRightSideOpen(false);
        }
    }, []);

    function changeSection(section: ESection) {
        return () => setCurrentSection(section);
    }

    function rightSideToggle() {
        setIsRightSideOpen(!isRightSideOpen);
    }

    // if (loading) return <div>LOADING LMAO</div>;

    return (
        <div className="flex h-screen">
            <div className="flex-shrink-0 w-48 lg:w-64 xl::w-80 border-r-slate-200 border-r">
                <div>
                    <div
                        id="header-left"
                        className="h-14 border-b flex gap-2 items-center p-2"
                    >
                        <div>o</div>
                        <div>RChat</div>
                    </div>
                    <div
                        id="sections"
                        className="border-b flex justify-evenly items-center py-2"
                    >
                        <button
                            className={`border rounded-full h-10 w-10 flex justify-center items-center ${
                                currentSection == ESection.DM &&
                                "bg-emerald-600"
                            } transition-colors`}
                            onClick={changeSection(ESection.DM)}
                        >
                            DM
                        </button>
                        <button
                            className={`border rounded-full h-10 w-10 flex justify-center items-center ${
                                currentSection == ESection.GR &&
                                "bg-emerald-600"
                            } transition-colors`}
                            onClick={changeSection(ESection.GR)}
                        >
                            GR
                        </button>
                        <button
                            className={`border rounded-full h-10 w-10 flex justify-center items-center ${
                                currentSection == ESection.FR &&
                                "bg-emerald-600"
                            } transition-colors`}
                            onClick={changeSection(ESection.FR)}
                        >
                            FR
                        </button>
                    </div>
                    {currentSection == ESection.DM ? (
                        <DirectMessageSection
                            chats={props.fake.chats}
                            username={currentChatPartnerUsername}
                        />
                    ) : (
                        <div>Coming Soon!</div>
                    )}
                </div>
            </div>
            <div className="flex-1">
                {currentChatPartnerUsername && (
                    <Chats
                        key={currentChatPartnerUsername}
                        username={currentChatPartnerUsername}
                        isRightSideOpen={isRightSideOpen}
                        rightSideToggle={rightSideToggle}
                    />
                )}
            </div>
            {currentChatPartnerUsername && (
                <div
                    className="flex-shrink-0 border-l-slate-200 transition-[width] overflow-hidden"
                    style={{
                        width: isRightSideOpen ? `${width < 1024 ? "12rem" : width < 1280 ? "14rem" : "18rem"}` : "0rem",
                        borderLeftWidth: isRightSideOpen ? "1px" : "0px",
                    }}
                >
                    <ChatPartnerBasicInfo username={currentChatPartnerUsername} />
                </div>
            )}
        </div>
    );
}
