'use client'

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

const TabsUI = () => {
	return (
		<div>
			<Tabs aria-label="Filters" key={'filter'} variant="light">
				<Tab key="week" title="Week">
				</Tab>
				<Tab key="month" title="Month">
				</Tab>
				<Tab key="unsanswered" title="Unsanswered">
				</Tab>
			</Tabs>
		</div>
	);
};

export default TabsUI;
