import VoteButton from "./votebutton";
import { repCalc } from "@/lib/user";

export default function PostListItem ({ post, user }) {

    const json = JSON.parse(post.json_metadata);
    const created = new Date(post.created).toDateString();
    let image = '';
    if (json.image) image = json.image[0];
    else if (json.images) image = json.images[0];
    else if (json.app == 'liketu') image = json.flow.pictures[0].url;

    let shortBody = post.body.replace(/<\/?[^>]+(>|$)/g, ""); // remove html
    shortBody = shortBody.replace(/!\[(.*?)\]\((.*?)\)/g, ""); // remove markdown image
    shortBody = shortBody.replace(/\[([^\[\]]*)\]\((.*?)\)/gm, '$1'); // remove markdown link
    shortBody = shortBody.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''); //remove links
    shortBody = shortBody.substring(0,200)
    //console.log(post)
    //console.log(json)
    return (
        <div className="card w-80 h-96 bg-base-100 shadow-xl m-2">
            <figure className="max-h-40 h-40"><img src={image} /></figure>
            <div className="card-body p-1 ">
                <div className="flex items-center">
                    <div className="text-xs font-bold">{post.author}</div>
                    <div className="badge badge-xs badge-neutral content-center text-xs ml-2">{repCalc(post.author_reputation)}</div>
                </div>
                <div className="h-full">
                    <p className="text-sm font-bold"><a href={post.url}>{post.title}</a></p>
                    <p className="text-xs mt-2">{shortBody}</p>
                </div>
                <div className="flex">
                    <div className="text-xs mr-2">${post.pending_payout_value.substring(0,4)}</div>
                    <div className="text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="p-0 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div className="text-xs">
                            {post.active_votes.length}
                    </div>
                    {user ? (
                    <div className="card-actions justify-end w-full mb-2">
                        <VoteButton user={user} post={post} />
                    </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}