import VoteButton from "./votebutton";

export default function Post ({ post }) {

    const user = JSON.parse(window.localStorage.getItem('user'));
    const json = JSON.parse(post.json_metadata);
    const created = new Date(post.created).toDateString();
    let image = '';
    if (json.image) image = json.image[0];
    else if (json.images) image = json.images[0];
    else if (json.app == 'liketu') image = json.flow.pictures[0].url

    return (
        <div className="card card-side bg-base-100 rounded-none">
            <figure className="max-h-48 max-w-96 w-1/4"><img src={image}/></figure>
            <div className="card-body w-3/4">
                <h2 className="card-title"><a href={post.url}>{post.title}</a></h2>
                <p>{post.author}</p>
                <p>{created}</p>
                <div className="card-actions justify-end">
                    <VoteButton user={user} />
                </div>
            </div>
        </div>
    );
}