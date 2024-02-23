import VoteButton from "./votebutton";
import { repCalc } from "@/lib/user";
import { getPostDate } from "@/lib/getPostDate";

//import { renderBody } from "@/lib/renderBody";

export default function PostListItem ({ post, user, eRate }) {

    const json = JSON.parse(post.json_metadata);
    let created = new Date(post.created);
    created = getPostDate(created);
    let image = '';
    if (json.image) image = json.image[0];
    else if (json.images) image = json.images[0];
    else if (json.app == 'liketu') image = json.flow.pictures[0].url;

    let today = new Date();
    let payoutDate = new Date(post.cashout_time);
    let offset = today.getTimezoneOffset();
    today = new Date(today.getTime() + offset * 60000);
    let payout = 0;
    if (today.getTime() < payoutDate.getTime()) {
        payout = post.pending_payout_value.substring(0,5);
        payout = Number(payout);
    } else {
        payout = post.total_payout_value.substring(0,5);
        payout = Number(payout);
    }
    payout = payout * eRate;
    payout = (Math.round(payout * 100) / 100).toFixed(2);

    function getFirst20Words(text) {
        // Remove Markdown tables
        const withoutTables = text.replace(/\|(.+?)\|\s*\n\|( *[-:]+[-| :]*)\|\s*\n((?:\|.+?\|\s*\n)+)/gs, '');
    
        // Remove HTML tags
        const plainText = withoutTables.replace(/<\/?[^>]+(>|$)/g, '');
    
        // Remove URLs (links and images), bold, and italic Markdown tags
        const cleanedText = plainText
            .replace(/\[.*?\]\(.*?\)/g, '')    // Remove links
            .replace(/!\[.*?\]\(.*?\)/g, '')  // Remove images
            .replace(/\*\*(.*?)\*\*/g, '$1')   // Remove bold
            .replace(/\*(.*?)\*/g, '$1')       // Remove italic
            .replace(/\b(?:https?|ftp):\/\/[^\s]+/gi, '') // Remove loose URLs
            .trim();  // Trim leading and trailing whitespaces
    
        // Extract the first 20 words
        const words = cleanedText.split(/\s+/).slice(0, 20);
    
        // Join the words back into a string
        const result = words.join(' ');
    
        return result;
    }

    let shortBody = getFirst20Words(post.body);

    return (
        <div className="card w-80 h-80 bg-base-100 shadow-xl border m-2">
            <figure className="max-h-44 h-44"><img src={image} /></figure>
            <div className="card-body p-1 mt-1">
                <div className="flex items-center">
                    <div className="text-xs font-bold">{post.author}</div>
                    <div className="badge badge-xs badge-neutral content-center text-xs ml-2">{repCalc(post.author_reputation)}</div>
                    <div className="flex text-xs flex-grow justify-end">{created}</div>
                </div>
                <div className="h-full">
                    <p className="text-sm font-bold"><a href={post.url}>{post.title}</a></p>
                    <p className="text-xs mt-2"></p>
                </div>
                <div className="flex">
                    <div className="text-xs mr-2">R${payout}</div>
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