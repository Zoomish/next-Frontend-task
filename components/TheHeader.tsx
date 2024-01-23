import Link from "next/link";

const TheHeader = () => {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
    </header>
  );
};

export { TheHeader };
