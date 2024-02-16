import { useState } from "react";

export default function VoteButton ({ user, post }) {
    const [startVote, setStartVote] = useState(false);
    const [voteRangeValue, setVoteRangeValue] = useState(100);

    function showVoteRange () {
        setStartVote(true);
    }

    async function processVote (formData) { 
        formData.preventDefault();

        if (!window.hive_keychain) {
            alert('Please install Hive Keychain first')
            return
        }
        window.hive_keychain.requestVote(user.name, post.permlink, post.author, (voteRangeValue*100), (response) => {
            console.log(response);
          });
    }

    return (
            <div className="justify-end">
                {startVote ? (
                        <form onSubmit={processVote} className="flex h-full w-full">
                        <div className="flex text-xs p-0">
                            {voteRangeValue}%
                        </div>
                        <div className="flex justify-end items-center">
                            <input name="voteRange" type="range" min={0} max="100" defaultValue="100" className="range range-xs p-0 py-0 min-h-3 h-3" step="5" onChange={e => setVoteRangeValue(e.target.value)} />
                            <button className="btn btn-xs p-1 py-0 min-h-4 h-4">vote</button>
                        </div>
                        </form>
                    ) : (
                        <div className="flex p-0">
                            <button onClick={showVoteRange} className="btn btn-xs p-1 py-0 min-h-4 h-4">Vote</button>
                        </div>
                  )
                }
            </div>
    );
}