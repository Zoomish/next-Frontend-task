import { Metadata } from "next";
import Link from "next/link";

async function getData(id: string) {
  const response = await fetch(
    `https://taxivoshod.ru/testapi/?w=item&id=${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return response.json();
}

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const post = await getData(id);

  return {
    title: post.title,
  };
}

export default async function Post({ params: { id } }: Props) {
  const post = await getData(id);
  return (
    <>
      <h1>{post.name}</h1>
      <p>{post.text}</p>
      <Link href='/'><button>Back</button></Link>
    </>
  );
}
