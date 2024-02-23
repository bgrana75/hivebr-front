'use server';
import { Client } from '@hiveio/dhive';
import { DefaultRenderer } from "@hiveio/content-renderer";

const renderer = new DefaultRenderer({
    baseUrl: "https://hive.blog/",
    breaks: true,
    skipSanitization: false,
    allowInsecureScriptTags: false,
    addNofollowToLinks: true,
    doNotShowImages: false,
    ipfsPrefix: "",
    assetsWidth: 640,
    assetsHeight: 480,
    imageProxyFn: (url) => url,
    usertagUrlFn: (account) => "/@" + account,
    hashtagUrlFn: (hashtag) => "/trending/" + hashtag,
    isLinkSafeFn: (url) => true,
  });

export async function getPost ( authorName, permlink ) {
    
    async function getPostComments (dhiveClient, authorName, permlink) {

        let comments = await dhiveClient.database.call('get_content_replies', [authorName, permlink]);
        let newComments = [];
        for (let comment of comments) {
            if (comment.children > 0) {
                comment.postComments = await getPostComments(dhiveClient, comment.author, comment.permlink);
            } 
            let authorInfo = await dhiveClient.database.getAccounts([comment.author]);
            comment.authorInfo = authorInfo[0];
            comment.body = renderer.render(comment.body);
            newComments.push(comment);
        };
        return newComments;
    }

    function isJson(str) {
        let json = "";
        try {
            json = JSON.parse(str);
        } catch (e) {
            return false;
        }
        return json;
    }

    const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
    let result = await dhiveClient.database.call('get_content', [authorName, permlink]);
    let author = await dhiveClient.database.getAccounts([authorName]);
    
    if (result.children > 0) {
        result.postComments = await getPostComments(dhiveClient, authorName, permlink);
    }

    if (result.category.startsWith("hive-1") || result.category.startsWith("hive-2") || result.category.startsWith("hive-3")) {
        let community = await dhiveClient.database.getAccounts([result.category]);
        let json = isJson(community[0].posting_json_metadata);
        if (json) result.category = json.profile.name;
    }

    result.authorInfo = author[0];   
    result.body = renderer.render(result.body);

    return result;
  }