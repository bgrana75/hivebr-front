'use client';
import { Client } from '@hiveio/dhive';
import { useState, useEffect } from 'react';
import PostListItem from './postlistitem';
import { getExchangeRate } from "@/lib/util";

export default function PostList ({ user }) {

    const [posts, setPosts] = useState([]);

    async function getPosts () {
        let eRate = await getExchangeRate();
        const filter = "created";
        const query = {
            tag: "hivebr",
            limit: 30,
        };
        const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
        let result = await dhiveClient.database.getDiscussions(filter, query);
        //console.log('Response received:', result);
        let index = 0;
        result = result.map((item, index) => ({ ...item, id: index + 1 }))
        result.eRate = eRate;
        setPosts(result);
        return true;
    }

    useEffect(() => {
        getPosts()
      }, []);

    return (
        <div className="flex flex-wrap m-4 justify-center">
            {posts.map(function(post){
                        return <PostListItem key={post.id} post={post} user={user} eRate={posts.eRate} />;
                    })}
        </div>
    );
}