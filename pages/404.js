import Link from 'next/link';

export default function Custom404Page() {
  return (
    <section className="ml-0 lg:ml-60 h-screen bg-black flex flex-col justify-center items-center text-white">
      <h1 className="mb-4 text-5xl font-bold">Error 404</h1>
      <h1>Hmm, that page does not seem to exist...</h1>
      <Link href="/" legacyBehavior>
        <button className="bg-green-600 hover:bg-opacity-50 rounded h-8 mt-2 px-8">Go home</button>
      </Link>
    </section>
  );
}