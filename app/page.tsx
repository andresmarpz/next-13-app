import Link from "next/link"

export default function Home() {
  return (
    <>
      <header className="flex gap-3 p-4">
        <h1>Linky</h1>
        <Link href="/app">App</Link>
      </header>
      <main></main>
    </>
  )
}
