import { useState } from "react";

export default function Post ({ post }) {
    const [startVote, setStartVote] = useState(false);
    const [voteRangeValue, setVoteRangeValue] = useState(100);

    const json = JSON.parse(post.json_metadata);
    const created = new Date(post.created).toDateString();
    let image = '';
    if (json.image) image = json.image[0];
    else if (json.images) image = json.images[0];
    else if (json.app == 'liketu') image = json.flow.pictures[0].url

    function showVoteRange () {
        setStartVote(true);
    }

    async function processVote (formData) { 
        formData.preventDefault();

        const user = JSON.parse(window.localStorage.getItem('user'));

        if (!window.hive_keychain) {
            alert('Please install Hive Keychain first')
            return
        }
        window.hive_keychain.requestVote(user.name, post.permlink, post.author, (voteRangeValue*100), (response) => {
            console.log(response);
          });
    }

    return (
        <div className="card card-side bg-base-100 rounded-none">
            <figure className="max-h-48 max-w-96 w-1/4"><img src={image}/></figure>
            <div className="card-body w-3/4">
                <h2 className="card-title"><a href={post.url}>{post.title}</a></h2>
                <p>{post.author}</p>
                <p>{created}</p>
                <div className="card-actions justify-end">
                {startVote ? (
                        <form onSubmit={processVote} className="flex h-full w-full justify-end">
                        <div className="flex h-full w-1/5 justify-end text-xs items-center p-1">
                            {voteRangeValue}%
                        </div>
                        <div className="flex h-full w-1/5 justify-end items-center">
                            <input name="voteRange" type="range" min={0} max="100" defaultValue="100" className="range range-xs p-1" step="5" onChange={e => setVoteRangeValue(e.target.value)} />
                            <button className="btn btn-xs p-1">vote</button>
                        </div>
                        </form>
                    ) : (
                        <button onClick={showVoteRange} className="btn btn-primary">Vote</button>
                    )
                }
                </div>
            </div>
        </div>
    );
}