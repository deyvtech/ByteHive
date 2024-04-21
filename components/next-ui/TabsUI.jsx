'use client'

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const TabsUI = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const handleSelect = (e) => {
		console.log(e)
		const params = new URLSearchParams(searchParams.toString())
		params.set('sort', e)
		params.delete('search')

		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}
	return (
		<div >
			<Tabs aria-label="Filters" key={'filter'} variant="light" onSelectionChange={handleSelect}>
				<Tab key="newest" title="Newest">
				</Tab>
				<Tab key="frequent" title="Frequent">
				</Tab>
				<Tab key="unanswered" title="Unanswered">
				</Tab>
			</Tabs>
		</div>
	);
};

export default TabsUI;

