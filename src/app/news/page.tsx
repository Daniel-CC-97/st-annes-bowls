"use client";
import { useEffect, useState } from "react";

import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import Footer from "../components/footer";
import { getNews } from "@/utils";
import NewsBlock from "../components/newsBlock";

export default function Page() {
  const [news, setNews] = useState<any>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const allNews = await getNews();
        setNews(allNews);
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <NavBar />
      <PageHeader title="News" />
      <main className="flex-grow text-primary-darker mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-4">
          {news.map((newsEntry, index) => (
            <NewsBlock
              key={index}
              newsTitle={newsEntry.fields.title}
              newsContent={newsEntry.fields.body.content}
              updatedAtDate={newsEntry.sys.updatedAt}
            ></NewsBlock>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
