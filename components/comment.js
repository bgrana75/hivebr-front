import { getPostDate } from "@/lib/getPostDate";
import CommentList from "./commentlist";
import VoteButton from "./votebutton";
import { getExchangeRate } from "@/lib/util";

export default function Comment ({ comment, user, setUser, eRate }) {

    //console.log(eRate);
    function isJson(str) {
        let json = "";
        try {
            json = JSON.parse(str);
        } catch (e) {
            return false;
        }
        return json;
    }

    function getPayout() {
        return payout;
    }
    let json = comment.authorInfo.posting_json_metadata;
    json = isJson(json);
    //console.log(json.profile);
    let authorProfileImage = "";
    if (typeof json.profile !== 'undefined') {
        authorProfileImage = <img alt="Profile Picture" src={json.profile.profile_image} />;
    } else {
        authorProfileImage = <img alt="Profile Picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/850px-Missing_avatar.svg.png" />;
    }

    let today = new Date();
    let payoutDate = new Date(comment.cashout_time);
    let offset = today.getTimezoneOffset();
    today = new Date(today.getTime() + offset * 60000);

    let payout = 0;
    if (eRate) {
        if (today.getTime() < payoutDate.getTime()) {
            payout = comment.pending_payout_value.substring(0,5);
            payout = Number(payout);
        } else {
            payout = comment.total_payout_value.substring(0,5);
            payout = Number(payout);
        }
        payout = payout * eRate;
        payout = (Math.round(payout * 100) / 100).toFixed(2);
        console.log(payout)
    }

    let commentCreated = getPostDate(comment.created);

    return (
        <div key={comment.id} tabIndex={0} className="collapse collapse-open border mt-3 pt-4"> 
            <div className="collapse-content m-0"> 
            <div className="flex w-full">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            {authorProfileImage}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="text-sm font-bold mt-1">{comment.author}</div>
                        <div className="text-xs">{commentCreated}</div>
                    </div>
                    <div className="flex w-full justify-end items-center font-bold"></div>
                </div>
                <div className="divider my-0 mb-0"></div> 
                <div className="mt-1 mb-1" dangerouslySetInnerHTML={{ __html: comment.body }} />
                <div className="divider mt-0 mb-0"></div> 
                <div className="mt-2">
                    <div className="flex">
                        <div className="text-xs mr-2">R${payout}</div>
                        <div className="text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" className="p-0 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <div className="text-xs">
                                {comment.active_votes.length}
                        </div>
                        {user ? (
                        <div className="flex flex-grow justify-end w-full mb-2">
                            <VoteButton user={user} post={comment} />
                        </div>
                        ) : ( <div></div> )}
                    </div>
                </div>


            {(comment.children > 0) ? (
            <CommentList comments={comment.postComments} user={user} setUser={setUser} eRate={eRate} />
        ) : null }
            </div>
        </div>
    );
}