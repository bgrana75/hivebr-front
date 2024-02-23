export default function PostTags( {json} ) {
    return (
        json?.tags.map(function(tag, i) {
            return (
                <div key={i} className="badge mr-1 ml-1 mt-1">{tag}</div>
            )
        }, this)
    );
}