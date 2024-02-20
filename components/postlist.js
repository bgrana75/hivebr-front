'use client';
import { Client } from '@hiveio/dhive';
import { useState, useEffect } from 'react';
import PostListItem from './postlistitem';

export default function PostList ({ user }) {

    const [posts, setPosts] = useState([]);

    async function getPosts () {
        const filter = "created";
        const query = {
            tag: "hivebr",
            limit: 30,
        };
        const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
        await dhiveClient.database.getDiscussions(filter, query).then(result => {
            //console.log('Response received:', result);
            let index = 0;
            result = result.map((item, index) => ({ ...item, id: index + 1 }))
            setPosts(result);
            return true;
        })
    }

    useEffect(() => {
        getPosts()
      }, []);

    return (
        <div className="flex flex-wrap m-4 justify-center">
            {posts.map(function(post){
                        return <PostListItem key={post.id} post={post} user={user} />;
                    })}
        </div>
    );
}