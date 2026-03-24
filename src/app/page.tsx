"use client";

import { membershipText } from "./data/homepage-text";
import { getHomePageText, richTextToHtml } from "../utils";
import { useEffect, useState } from "react";

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";

export default function Home() {
  const [homePageTexts, setHomePageTexts] = useState<any[]>([]);

  useEffect(() => {
    const fetchHomePageText = async () => {
      try {
        const data = await getHomePageText();
        setHomePageTexts(data);
      } catch (error) {
        console.error("Error fetching home page text: ", error);
      }
    };

    fetchHomePageText();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <Hero
        text="St Anne's Park Bowls Club"
        imageUrl="/hero-image.png"
        height="large"
      ></Hero>
      {/* Main Content */}
      <main className="max-w-7xl flex-grow mx-auto px-2 sm:px-6 lg:px-8">
        <section>
          <div className="text-primary-darker rounded-lg [&_p]:mb-4 [&_p:last-child]:mb-0">
            {homePageTexts &&
              homePageTexts.length > 0 &&
              homePageTexts.map((block, index) => (
                <div key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: richTextToHtml(block.fields.mainText),
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="text-primary-darker text-xl font-bold bg-gradient-to-tr from-secondary-lighter to-secondary-darker p-2 mt-4 lg:mt-8 lg:p-4 rounded-lg">
            {homePageTexts &&
              homePageTexts.length > 0 &&
              homePageTexts.map((block, index) => (
                <div key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: richTextToHtml(block.fields.secondaryText),
                    }}
                  />
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}
