"use client";

import { getHomePageText, richTextToHtml } from "../utils";
import { useEffect, useState } from "react";

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import PageHeader from "./components/pageHeader";

// Reusable container component for consistent spacing
const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`max-w-3xl mx-auto px-6 w-full ${className}`}>{children}</div>
);

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
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <PageHeader
        title="St Anne's Bowls Club"
        subtitle="A welcoming community for all levels"
      />

      {/* Main Content */}
      <main className="flex-grow py-12">
        <Container>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-primary-darker mb-6">
              About the Club
            </h2>

            {/* Body Text */}
            <div className="text-primary-darker [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_p:last-child]:mb-0">
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

            {/* Callout / Secondary Section */}
            <div className="mt-12 p-6 border border-primary-lighter bg-secondary-vibrant/50 rounded-xl">
              <div className="text-primary-darker [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_p:last-child]:mb-0">
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
            </div>
          </section>
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
