'use server';
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

export async function renderBody ( body ) {
    
    return renderer.render(body);
    
  }