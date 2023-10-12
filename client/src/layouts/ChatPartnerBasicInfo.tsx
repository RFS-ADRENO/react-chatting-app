import React from "react";

import { FiEdit3 } from "react-icons/fi";
import { BiBlock, BiSolidPin } from "react-icons/bi";

type TProps = {
    username: string;
};

export default function ChatPartnerBasicInfo(props: TProps) {
    return (
        <div className="flex justify-center items-center px-2 py-16 flex-col gap-4">
            <div className="w-28 h-28 border rounded-full"></div>
						<div className="text-2xl font-semibold">{props.username}</div>
						
						{/* nicknames, block, pin */}
						<div className="flex gap-4 flex-wrap justify-center">
							<button className="flex items-center gap-2 border rounded-full px-2 py-1">
								<FiEdit3 className="w-5 h-5" />
								<div>Nickname</div>
							</button>
							<button className="flex items-center gap-2 border rounded-full px-2 py-1">
								<BiSolidPin className="w-5 h-5" />
								<div>Pin</div>
							</button>
							<button className="flex items-center gap-2 border rounded-full px-2 py-1">
								<BiBlock className="w-5 h-5" />
								<div>Block</div>
							</button>
						</div>
        </div>
    );
}
