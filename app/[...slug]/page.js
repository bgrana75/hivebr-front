'use client';
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { getPost } from "@/lib/getpost";
import VoteButton from "@/components/votebutton";

export default function Page({ params }) {

  const [user, setUser] = useState();
  const [post, setPost] = useState();

  async function showPost () {
    const authorName = decodeURIComponent(params.slug[1]).replace("@", "");
    const permlink = params.slug[2];
    if (authorName) {
        let result = await getPost(authorName, permlink);

        result.authorInfo.posting_json_metadata = JSON.parse(result.authorInfo.posting_json_metadata);
        console.log(result)
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
        <div className="hero min-h-screen bg-base-200 rounded-lg">
          <div className="hero-content text-sm">
            <div className="max-w-2xl">
                <div className="flex w-full">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            <img alt="Profile Picture" src={post?.authorInfo.posting_json_metadata.profile.profile_image} />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm font-bold">{post?.author}</p>
                    </div>
                    <div className="flex w-full justify-end items-center font-bold">{post?.category}</div>
                </div>
                <div className="flex w-full text-lg font-bold justify-center">
                    <div>{post?.title}</div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: post?.body }} />
                <div className="mt-3">
                <div className="flex">
                    <div className="text-xs mr-2">${post?.pending_payout_value.substring(0,4)}</div>
                    <div className="text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="p-0 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div className="text-xs">
                            {post?.active_votes.length}
                    </div>
                    {user ? (
                    <div className="card-actions justify-end w-full mb-2">
                        <VoteButton user={user} post={post} />
                    </div>
                    ) : ( <div></div> )}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
}