"use client"
import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

async function getData(num: number) {
  if (num > 2) {
    num = 1
  }
  const response = await fetch(`https://taxivoshod.ru/testapi/?w=list&page=${num}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) throw new Error("Unable to fetch posts!");

  return response.json();
}

export const metadata: Metadata = {
  title: "Blog | Next App",
};

export default async function Blog() {
  const [num, setNum] = useState(1);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const data = await getData(num)
      setPosts(data.items)
    };
    getPosts()
  }, [num])

  console.log([posts.length]);

  return (
    <>
      <h1>Blog page</h1>
      <div>
        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>{post.name}</Link>
            </li>
          ))}
        </ul>
        <button onClick={() => setNum(num + 1)}>Next</button>
      </div>
    </>
  );
}
