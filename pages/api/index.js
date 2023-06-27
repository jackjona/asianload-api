const cheerio = require("cheerio");

const QuotesHomeScraper = async (req, res) => {
  if (req.method === "POST") {
    const scrapeURL = req.body.queryURL.replaceAll(",", "/").split("&")[0];
    try {
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      });
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const title = $("div.video-details > span").text();
      const desc = $("div.video-details > div > div").text();

      const episodeTitle = $("h1").text();
      const iframeURL = $("iframe").attr("src");
      const episodeList = $("ul.listing.items.lists > li.video-block")
        .map((i, el) => {
          const $el = $(el);
          const title = $el.find("a > div.name").text();
          const date = $el.find("a > div.meta > span.date").text();
          const URL = $el.find("a").attr("href");
          const cover = $el.find("a > div.img > div.picture > img").attr("src");
          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            date: date,
            URL: URL,
          };
        })
        .toArray();
      /*  console.log([
        scrapeURL,
        title,
        desc,
        episodeTitle,
        episodeList,
        iframeURL,
      ]); */
      const lastScraped = new Date().toISOString();
      res.statusCode = 200;
      return res.json({
        status: "Received",
        source: "https://github.com/jackjona/asianload-api",
        scrapeURL: scrapeURL,
        title: title,
        desc: desc,
        episodeTitle: episodeTitle,
        iframeURL: iframeURL,
        episodeList: episodeList,
        lastScraped: lastScraped,
      });
    } catch (error) {
      res.statusCode = 404;
      console.error("An Error Has Occurred");
      return res.json({
        status: "Error - Invalid Query",
        scrapeURL: scrapeURL,
      });
    }
  } else {
    res.statusCode = 405;
    return res.json({
      status: "Error 405 - Method Not Allowed",
    });
  }
};

export default QuotesHomeScraper;
