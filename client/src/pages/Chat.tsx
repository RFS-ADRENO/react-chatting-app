// import React from "react";

import { useWindowDimensions } from "../hooks";
import { ChatMobile, ChatDefault } from "../layouts";

import { fakeData } from "../fake";

export default function Chat() {
    const { width } = useWindowDimensions();

    return <>{width < 768 ? <ChatMobile /> : <ChatDefault fake={fakeData} />}</>;
}
