import React, { useEffect } from "react";

type TProps = {
    ref: () => React.RefObject<any>;
    callback: () => void;
    includes?: () => React.RefObject<any>[];
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter({ ref, callback, includes }: TProps) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (
                ref().current &&
                !ref().current.contains(event.target) &&
                !includes?.().some((include) =>
                    include.current?.contains(event.target)
                )
            ) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, includes]);
}
