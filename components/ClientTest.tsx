"use client"

import { useSession } from "next-auth/react"

export default function ClientTest(){
	const session = useSession()

	return <div>
		Hello, from the client! {session.data?.user?.name}
	</div>
}