'use client';
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { getPost } from "@/lib/getpost";
import VoteButton from "@/components/votebutton";
import CommentList from "@/components/commentlist";
import PostTags from "@/components/posttags";
import { getPostDate } from "@/lib/getPostDate";
import { getExchangeRate } from "@/lib/util";

export default function Page({ params }) {

  const [user, setUser] = useState();
  const [post, setPost] = useState();
  const [postAuthor, setPostAuthor] = useState();
  const [postTitle, setPostTitle] = useState();
  const [postCategory, setPostCategory] = useState();
  const [postBody, setPostBody] = useState();
  const [postCreated, setPostCreated] = useState();
  const [postMetadata, setPostMetadata] = useState();
  const [authorProfileImage, setAuthorProfileImage] = useState();
  const [payout, setPayout] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [comments, setComments] = useState();
  const [exchangeRate , setExchangeRate] = useState();

  async function showPost () {
    const authorName = decodeURIComponent(params.slug[1]).replace("@", "");
    const permlink = params.slug[2];
    if (authorName) {
        let eRate = await getExchangeRate();
        let result = await getPost(authorName, permlink);
        
        setExchangeRate(eRate);

        result.authorInfo.posting_json_metadata = JSON.parse(result.authorInfo.posting_json_metadata);
        //console.log(result)
        setPost(result);
        setPostAuthor(result.author);
        setPostTitle(result.title);
        setPostCategory(result.category);
        setPostBody(result.body);
        setTotalVotes(result.active_votes.length);
        setPostMetadata(JSON.parse(result.json_metadata));
        setComments(result.postComments);
        setAuthorProfileImage(
            <img alt="Profile Picture" src={result.authorInfo.posting_json_metadata.profile.profile_image} />
        );
        let today = new Date();
        let payoutDate = new Date(result.cashout_time);
        let offset = today.getTimezoneOffset();
        today = new Date(today.getTime() + offset * 60000);

        setPostCreated(getPostDate(result.created));

        let temp = 0;
        if (today.getTime() < payoutDate.getTime()) {
            temp = result.pending_payout_value.substring(0,5);
            temp = Number(temp);
            //setPayout((result.pending_payout_value * exchangeRate).substring(0,4));
        } else {
            temp = result.total_payout_value.substring(0,5);
            temp = Number(temp);
            //setPayout((result.total_payout_value * exchangeRate).substring(0,4));
        }
        temp = temp * eRate;
        temp = (Math.round(temp * 100) / 100).toFixed(2);

        setPayout(temp);

        
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
          <div className="hero-content border rounded-box text-sm">
            <div className="max-w-3xl">
                <div className="flex w-full">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            {authorProfileImage}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="text-sm font-bold mt-1">{postAuthor}</div>
                        <div className="text-xs">{postCreated}</div>
                    </div>
                    <div className="flex w-full justify-end items-center font-bold">{postCategory}</div>
                </div>
                <div className="divider mt-0 mb-0"></div> 
                <div className="flex w-full text-lg font-bold justify-center">
                    <div>{postTitle}</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postBody }} />
                <div className="flex justify-center mt-4 flex-wrap">
                    <PostTags json={postMetadata} />
                </div>
                <div className="divider"></div> 
                <div className="mt-5">
                    <div className="flex">
                        <div className="text-xs mr-2">R${payout}</div>
                        <div className="text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" className="p-0 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <div className="text-xs">
                                {totalVotes}
                        </div>
                        {user ? (
                        <div className="card-actions justify-end w-full mb-2">
                            <VoteButton user={user} post={post} />
                        </div>
                        ) : ( <div></div> )}
                    </div>
                </div>
                <div className="divider"></div> 
                <CommentList comments={comments} user={user} setUser={setUser} eRate={exchangeRate} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
}