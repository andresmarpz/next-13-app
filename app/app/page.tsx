import ClientTest from '@/components/ClientTest'
import { unstable_getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';

export default async function App() {
  const session = await unstable_getServerSession()

  if (!session) 
		redirect('/api/auth/signin');

  return (
    <div>
      Hello, from the server! {session!.user?.name}
      <ClientTest />
    </div>
  )
}
