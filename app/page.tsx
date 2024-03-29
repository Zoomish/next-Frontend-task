"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPosts from "./loading";

async function getData(num: number) {
  try {
    const response = await fetch(`https://taxivoshod.ru/testapi/?w=list&page=${num}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) throw new Error("Unable to fetch posts!");

    return response.json();
  } catch (error) {
    const response = await fetch(`https://taxivoshod.ru/testapi/?w=list&page=${1}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) throw new Error("Unable to fetch posts!");

    return response.json();
  }
}
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


  return (
    <div>
      {posts.length != 0
        ? <div>
          <h1>Blog page</h1>
          <ol>
            {posts.map((post: any) => (
              <li key={post.id}>
                {post.id}. <Link href={`/${post.id}`}>{post.name}</Link>
              </li>
            ))}
          </ol>
          <div className="divButton">
            <button onClick={() => {
              setNum(num - 1)
              setPosts([])
            }}>Previous</button>
            <button onClick={() => {
              setNum(num + 1)
              setPosts([])
            }}>Next</button>
          </div>
        </div>
        : LoadingPosts()
      }
    </div>
  );
}
