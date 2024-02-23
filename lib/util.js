export function transform3SpeakContent(content) {
    const regex = /\[!\[\]\((https:\/\/ipfs-3speak\.b-cdn\.net\/ipfs\/[a-zA-Z0-9]+\/)\)\]\((https:\/\/3speak\.tv\/watch\?v=([a-zA-Z0-9.-_]+\/[a-zA-Z0-9]+))\)/;
    const match = content.match(regex);
    if (match) {
      const videoURL = match[2];
      const videoID = match[3];
      const iframe = `<iframe src="https://3speak.tv/embed?v=${videoID}" ></iframe>`;
      content = content.replace(regex, iframe);
    }
    return content;
  }
  
  
  // make a regex to match links like that <iframe src="https://ipfs.skatehive.app/ipfs/QmPdsChTSXQkqu3FLJHcAjqdLCqq5bCcnC1dKwCB8oLA1S?pinataGatewayToken=nxHSFa1jQsiF7IHeXWH-gXCY3LDLlZ7Run3aZXZc8DRCfQz4J4a94z9DmVftXyFE" allowfullscreen></iframe> and transform in videos like that <video controls muted loop> <source src="https://ipfs.skatehive.app/ipfs/QmPdsChTSXQkqu3FLJHcAjqdLCqq5bCcnC1dKwCB8oLA1S?pinataGatewayToken=nxHSFa1jQsiF7IHeXWH-gXCY3LDLlZ7Run3aZXZc8DRCfQz4J4a94z9DmVftXyFE" type="video/mp4"></video> 
  
  export function transformIPFSContent(content) {
    const regex = /<iframe src="https:\/\/ipfs\.skatehive\.app\/ipfs\/([a-zA-Z0-9-?=&]+)"(?:(?!<\/iframe>).)*\sallowfullscreen><\/iframe>/g;
  
    return content.replace(regex, (match, videoID) => {
      return `<video controls muted loop> <source src="https://ipfs.skatehive.app/ipfs/${videoID}" type="video/mp4"></video>`;
    });
  }

  export async function getExchangeRate() {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/exchange_rates`);
        const data = await res.json();
        let result = (1/data.rates.usd.value)*data.rates.brl.value;
        return result;
    } catch (err) {
        console.log(err);
    }
};