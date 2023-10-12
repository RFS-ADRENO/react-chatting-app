import { useEffect, useState, useRef, useCallback } from "react";

import { useOutsideAlerter } from "../hooks";

type TProps = {
    isOpen: boolean;
    close: () => void;
    applyStickertoMessage: (sticker: number) => void;
    includes?: () => React.RefObject<any>[];
};

type TViewProps = {
    isOpen: boolean;
    close: () => void;
    applyStickertoMessage: (sticker: number) => void;
    includes?: () => React.RefObject<any>[];
    setIsRender: (isRender: boolean) => void;
};

function PopoverStickersView(props: TViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const getRef = useCallback(() => ref, [ref.current]);

    useOutsideAlerter({
        ref: getRef,
        callback: props.close,
        includes: props.includes,
    });

    return (
        <div
            ref={ref}
            className={`absolute left-2 bottom-14 w-72 lg:w-96 h-80 bg-slate-700 rounded-md overflow-y-scroll ${
                props.isOpen ? "animate-popin" : "animate-popout"
            }`}
            onAnimationEnd={() => {
                if (!props.isOpen) {
                    props.setIsRender(false);
                }
            }}
        >
            <div className="p-2 grid grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((e) => {
                    return (
                        <button
                            key={e}
                            className="hover:outline select-none"
                            onClick={() => {
                                props.applyStickertoMessage(e);
                                props.close();
                            }}
                        >
                            <img
                                src={`/stickers/${e}.png`}
                                alt={`sticker-${e}`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function PopoverStickers(props: TProps) {
    const [isRender, setIsRender] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            setIsRender(true);
        }
    }, [props.isOpen]);

    return (
        <>
            {isRender && (
                <PopoverStickersView {...props} setIsRender={setIsRender} />
            )}
        </>
    );
}
