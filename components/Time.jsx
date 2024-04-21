"use client";
import ReactTimeAgo from "react-time-ago";

import { Code} from "@nextui-org/react";
const Time = ({ time , text}) => {
	return (
		<>
			<Code color="default" className="mt-2 ml-auto block max-w-max text-[10px]"  radius="none">
                {text} {' '}
				<ReactTimeAgo date={time} locale="en-US" />
			</Code>
		</>
	);
};

export default Time;
