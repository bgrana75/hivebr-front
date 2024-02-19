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

    const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
    let result = await dhiveClient.database.call('get_content', [authorName, permlink]);
    
    result.body = renderer.render(result.body);

    return result;
  }