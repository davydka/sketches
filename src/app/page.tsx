import Image from "next/image";

export default function Home() {
  return (
    <main className="flex p-24 min-h-screen flex-col items-center">
      <div className="w-full items-center justify-between font-mono text-sm">
        <Image
          src="/comedy-and-tragedy.svg"
          alt="Comedy & Tragedy"
          className="dark:invert"
          width={100}
          height={100}
        />
      </div>
    </main>
  );
}
