"use client";
import ReactTimeAgo from "react-time-ago";

import { Code} from "@nextui-org/react";
const Time = ({ time , text}) => {
	return (
		<>
			<Code color="default" className="mt-3 ml-auto block max-w-max text-tiny" size="sm" radius="none">
                {text} {' '}
				<ReactTimeAgo date={time} locale="en-US" />
			</Code>
		</>
	);
};

export default Time;
