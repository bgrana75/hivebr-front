'use client';
import { Client } from '@hiveio/dhive';
import { useState, useEffect } from 'react';
import Post from '@/components/post';

export default function BlogPosts () {

    const [posts, setPosts] = useState([]);

    async function getPosts () {
        const filter = "created";
        const query = {
            tag: "hivebr",
            limit: 10,
        };
        const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
        await dhiveClient.database.getDiscussions(filter, query).then(result => {
            // console.log('Response received:', result);
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
        <div className="w-full">
            {posts.map(function(post){
                        return <Post key={post.id} post={post} />;
                    })}
        </div>
    );
}