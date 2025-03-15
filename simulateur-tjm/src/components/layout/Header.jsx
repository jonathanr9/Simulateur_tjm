import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-primary">Simulateur TJM</span>
        </Link>
      </div>
    </header>
  );
}
