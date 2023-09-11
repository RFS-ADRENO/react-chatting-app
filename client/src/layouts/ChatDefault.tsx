import { useEffect, useState } from "react";
import type { TFAKE } from "../fake";

import { DirectMessageSection } from ".";

type TProps = {
    fake: TFAKE;
};

enum ESection {
    DM,
    GR,
    FR,
}

export default function ChatDefault(props: TProps) {
    const [loading, setLoading] = useState(true);
    const [currentSection, setCurrentSection] = useState<ESection>(ESection.DM);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function changeSection(section: ESection) {
        return () => setCurrentSection(section);
    }

    // if (loading) return <div>LOADING LMAO</div>;

    return (
        <div className="flex h-screen">
            <div className="w-80 border-r-slate-200 border-r">
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
										{
											currentSection == ESection.DM ? <DirectMessageSection chats={props.fake.chats} /> : <div>Coming Soon!</div>
										}
                </div>
            </div>
            <div className="flex-1">1</div>
            <div className="w-72 border-l-slate-200 border-l">1</div>
        </div>
    );
}
