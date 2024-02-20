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
    function replaceWebpLinks(text) {
        // Split the text into an array using webp URLs as separators
        const parts = text.split(/\b(https?:\/\/[^\s<>"']+\.(?:webp))\b/gi);
    
        // Loop through the array and replace the webp URLs with img tags
        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 1) {
                // Check if the part is not preceded by a quotation mark or equal sign
                const isPrecededByQuotationOrEqual = /["'=](?:(?=(\\?))\1.)*?$/.test(parts[i - 1]);
                if (!isPrecededByQuotationOrEqual) {
                    parts[i] = `<img src="${parts[i]}" alt="WebP Image" />`;
                }
            }
        }
    
        // Join the array back into a string
        const replacedText = parts.join('');
    
        return replacedText;
    }
    
    

    const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
    let result = await dhiveClient.database.call('get_content', [authorName, permlink]);
    let author = await dhiveClient.database.getAccounts([authorName]);

    if (result.category.startsWith("hive-1") || result.category.startsWith("hive-2") || result.category.startsWith("hive-3")) {
        let community = await dhiveClient.database.getAccounts([result.category]);
        let json = JSON.parse(community[0].posting_json_metadata);
        result.category = json.profile.name;
    }

    result.authorInfo = author[0];    
    result.body = renderer.render(result.body);

    //result.body = replaceWebpLinks(result.body)

    return result;
  }