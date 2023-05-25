"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [scrapedData, setScrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [consent, setConsent] = useState(false);

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
        <title>Asianload API</title>
      </Head>
      <main
        className={`flex min-h-screen bg-white flex-col items-center ${
          !scrapedData.iframeURL ? "justify-center" : "justify-between"
        } p-4 text-black`}
      >
        <h1 className="text-6xl font-bold mt-20 mb-10 text-center">
          Asianload API
        </h1>
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
            <div className="relative w-[80vw] pt-[50%]">
              <iframe
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-xl"
                src={`https:${scrapedData.iframeURL}`}
                allowFullScreen={true}
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                scrolling="no"
                target="_blank"

                /* sandbox=" " */
              />
            </div>
            <div id="meta" className="lg:mx-20 max-w-[80vw]">
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
            {/* <div id="episodeList" className="mt-10">
            <h4>Episode List</h4>
            <div className="flex flex-wrap justify-center">
              {scrapedData.episodeList.map((data, i) => (
                <div
                  key={i}
                  className="bg-red-200 hover:scale-105 hover:bg-red-600/80 transition duration-300 delay-40 hover:delay-40 rounded-lg m-2 w-80"
                >
                  <a href={data.URL}>
                    <div className="flex flex-col-reverse justify-center items-center">
                      <div className="w-48 sm:w-full">
                        <h2 className="text-xs sm:text-sm">{data.date}</h2>
                        <p className="text-md font-semibold w-fit">
                          {data.title}
                        </p>
                      </div>
                      <div className="flex">
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
                            alt={`${data.title} book cover`}
                            width="100%"
                            height="100%"
                            className="rounded-lg shadow-sm drop-shadow-sm bg-white"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div> */}
          </>
        )}
        <footer
          className={
            !scrapedData.iframeURL
              ? "flex justify-center border-t-4 fixed bottom-0 left-0 w-full mt-[30rem] text-center"
              : "flex justify-center border-t-4 w-full mt-10 text-center"
          }
        >
          <div className="px-6 pt-4">
            <p className="text-lg">
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
                AsianLoad
              </a>
            </p>
            <p className="text-sm my-2">
              Asianload API (this website) does not host any content. All
              content on Asianload API is sourced from:{" "}
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
      </main>
    </>
  );
}
