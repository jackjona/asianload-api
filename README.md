# Asianload API

An API for Asianload (https://asianhdplay.pro) videos.

## API Data

- `<iframe/>` src URL
- Drama Title
- Description
- Episode Title
- Episode List

## Built With

- Nextjs
- TailwindCSS
- Cheerio

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and past the asianload URL or send a POST request to [http://localhost:3000/api](http://localhost:3000/api).

## POST Request Example:

API URL:

[http://localhost:3000/api](http://localhost:3000/api)

Request:

```json
{
  "queryURL": "https://asianhdplay.pro/videos/while-you-were-sleeping-2017-episode-1"
}
```

Response:

```json
{
  "status": "Recieved",
  "source": "https://github.com/nesaku/biblioreads",
  "scrapeURL": "https://asianhdplay.pro/videos/while-you-were-sleeping-2017-episode-1",
  "title": "While You Were Sleeping (2017)                ",
  "desc": "A young woman with bad premonition dreams meets two people who suddenly develop the same ability.Nam Hong Joo lives with her mother, Yoon Moon Sun, a widow who runs a small restaurant. Jung Jae Chan, a rookie prosecutor, and his younger brother, Seung Won, move in across the street. Since she was young, Hong Joo has had the ability to see bad events before they happen, but she is often unable to do anything about it.One day, Jae Chan has a strange premonition dream about an accident involving Hong Joo and Lee Yoo Beom, a ruthless attorney who used to be Jae Chan’s tutor. Jae Chan decides to interfere in the course of events and ends up saving the lives of Hong Joo and Han Woo Tak, a young police officer. When Jae Chan, Hong Joo, and Woo Tak then start having dreams about one another, they realize that their lives are now somehow entwined.But can the three discover the reason that they were brought together, and can they prevent the people closest to them from getting hurt?                    ",
  "episodeTitle": "While You Were Sleeping (2017) Episode 1 English Subbed",
  "iframeURL": "//asianhdplay.pro/streaming.php?id=MTI1NzY2&x=https://hls107.drafastcdn.pro/newhls/666769353df83a4474a67b14bdcc46a5/ep.1.v0.1681883755.m3u8&title=While+You+Were+Sleeping+%282017%29&typesub=SUB&sub=&cover=Y292ZXIvd2hpbGUteW91LXdlcmUtc2xlZXBpbmctMjAxNy5wbmc=",
  "episodeList": [
    {
      "0": {
        "id": 1,
        "cover": "https://asiancdn.com/images/666769353df83a4474a67b14bdcc46a5/32_cover.jpg",
        "title": "While You Were Sleeping (2017) Episode 32",
        "date": "2017-11-15 23:07:39",
        "URL": "/videos/while-you-were-sleeping-2017-episode-32"
      }
    }
  ],
  "lastScraped": "2023-05-25T20:29:24.231Z"
}
```
