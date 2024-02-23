import Comment from "./comment";

export default function CommentList( {comments, user, setUser, eRate} ) {
    return (
        comments?.map(function(comment) {
            return (
                <Comment key={comment.id} comment={comment} user={user} setUser={setUser} eRate={eRate} />
            )
        }, this)
    );
}