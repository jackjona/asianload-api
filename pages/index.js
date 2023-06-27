"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  //  const [consent, setConsent] = useState(false);
  console.log(`%cVersion: 06-27-2023`, `color:green`);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (inputValue.includes("asianhdplay.pro")) {
      fetch("/api", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ queryURL: inputValue }),
      })
        .then((res) => res.json())
        .then((data) => {
          setScrapedData(data);
          setIsLoading(false);
        });
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Head>
        <title>
          {scrapedData.episodeTitle
            ? `${scrapedData.episodeTitle} - Asianload API`
            : "Asianload API"}
        </title>
        <meta name="description" content="An API for Asianload videos." />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main
        className={`flex min-h-screen bg-white flex-col items-center ${
          !scrapedData.iframeURL ? "justify-center" : "justify-between"
        } p-4 text-black`}
      >
        <h1 className="text-6xl font-bold mb-10 text-center">Asianload API</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center text-center mb-4">
            <label className="flex flex-col">
              <h3 className="text-2xl font-semibold mb-6">
                Enter An Asianload URL: &nbsp;
              </h3>
              <input
                className="rounded-md mx-0 py-3 px-6 text-left text-sm  bg-slate-200 border-4 border-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                type="url"
                placeholder="https://asianhdplay.pro/videos/while-you-were-sleeping-2017-episode-1"
                required
              />
            </label>
            <div className="mx-10 my-6 font-semibold text-lg text-red-600">
              <p>{scrapedData.error}</p>
            </div>
            <button className="font-semibold text-md text-white bg-red-500 py-4 px-10 rounded-xl hover:shadow-red-500 hover:shadow-lg hover:bg-red-600 transition duration-300 delay-40 hover:delay-40">
              Submit
            </button>
            {isLoading && (
              <h2 className="mt-10 text-lg font-semibold animate-pulse">
                Loading...
              </h2>
            )}
            {error && (
              <h3 className="mt-12 text-lg text-black max-w-xl">
                An error has occurred. Please make sure the URL matches the
                format:{" "}
                <code>
                  https://asianhdplay.pro/videos/while-you-were-sleeping-2017-episode-1
                </code>
              </h3>
            )}
          </div>
        </form>
        {scrapedData.iframeURL && (
          <>
            <h2 className="font-bold text-2xl mt-10 mb-4 text-center">
              {scrapedData.episodeTitle}
            </h2>
            <div className="relative w-[80vw] pt-[80%] sm:pt-[50%]">
              <iframe
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-xl"
                src={`https:${scrapedData.iframeURL}`}
                allowFullScreen={true}
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                scrolling="no"
                target="_blank"
                // sandbox=" "
              />
            </div>
            <div id="meta" className="lg:mx-20 max-w-[80vw] text-center">
              <h4 className="mt-2 lg:mt-0 text-2xl font-bold">
                {scrapedData.title}
              </h4>
              <p className="mt-4">{scrapedData.desc}</p>
            </div>
            <p
              id="OG-URL"
              className="hidden lg:block max-w-4xl px-20 my-4 text-lg text-center truncate font-bold"
            >
              Original URL:{" "}
              <a
                className="text-blue-600 hover:underline font-normal text-md"
                href={`https:${scrapedData.iframeURL}`}
              >{`https:${scrapedData.iframeURL}`}</a>
            </p>
            <div id="episodeList" className="mt-10">
              <h4 className="px-20 my-4 text-xl text-center font-bold">
                Episode List
              </h4>
              <div className="flex flex-wrap justify-center">
                {
                  // Reverse the order of the episodes and map
                  scrapedData.episodeList
                    .slice(0)
                    .reverse()
                    .map((data, i) => (
                      <div
                        key={i}
                        className="bg-gray-100 hover:scale-105 hover:bg-gray-300 border-2 hover:border-gray-400 transition duration-200 hover:delay-40 rounded-md w-50 m-2"
                      >
                        <a href={data.URL}>
                          <div className="flex flex-col-reverse justify-center items-center">
                            <div
                              id="episodeMeta"
                              className="ml-2 mr-4 my-2 w-60"
                            >
                              <h2 className="text-xs sm:text-sm">
                                {data.date}
                              </h2>
                              <p className="text-md font-semibold w-fit">
                                {data.title}
                              </p>
                            </div>
                            <div className="p-2">
                              <picture>
                                <source
                                  srcSet={`${data.cover}`}
                                  type="image/webp"
                                  className="rounded-lg shadow-sm drop-shadow-sm bg-white"
                                />
                                <source
                                  srcSet={`${data.cover}`}
                                  type="image/jpeg"
                                  className="rounded-lg shadow-sm drop-shadow-sm bg-white"
                                />
                                <img
                                  src={`${data.cover}`}
                                  alt={`${data.title} Episode Cover`}
                                  width="100%"
                                  height="160px"
                                  className="text-center object-cover h-40 sm:h-[160px] sm:w-full max-w-[300px] rounded-md ring ring-gray-200"
                                  loading="lazy"
                                  onError={(e) => {}}
                                />
                              </picture>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))
                }
              </div>
            </div>
          </>
        )}
      </main>
      <footer
        className={
          !scrapedData.iframeURL
            ? "flex justify-center bg-white border-t-4 fixed bottom-0 left-0 w-full mt-[30rem] text-center"
            : "flex justify-center bg-white border-t-4 w-full mt-10 text-center"
        }
      >
        <div className="px-6 pt-4">
          <div className="flex flex-col sm:flex-row justify-center items-center text-lg">
            <p>
              Built by{" "}
              <a
                href="https://github.com/jackjona"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Jack Jona
              </a>{" "}
              | Powered by{" "}
              <a
                href="https://asianhdplay.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                AsianLoad |
              </a>
            </p>
            <a
              className="ml-2 h-8 w-8 text-xl font-semibold leading-6 text-gray-700 hover:text-gray-900"
              href="https://github.com/jackjona/asianload-api"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <p className="text-sm my-2">
            Asianload API (this website) does not host any content. All content
            on Asianload API is sourced from:{" "}
            <a
              href="https://asianhdplay.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              https://asianhdplay.pro
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
