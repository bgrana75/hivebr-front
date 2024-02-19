'use client';
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { getPost } from "@/lib/getpost";

export default function Page({ params }) {

  const [user, setUser] = useState();
  const [post, setPost] = useState();

  async function showPost () {
    const authorName = decodeURIComponent(params.slug[1]).replace("@", "");
    const permlink = params.slug[2];
    if (authorName) {
        let result = await getPost(authorName, permlink);
        setPost(result);
    }
    



    return true;
  }

  useEffect(() => {
    showPost()
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header user={user} setUser={setUser} />
      <div className="flex flex-wrap m-4">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-sm">
            <div className="max-w-2xl">
              <div dangerouslySetInnerHTML={{ __html: post?.body }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
}