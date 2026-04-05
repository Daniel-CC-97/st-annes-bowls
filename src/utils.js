import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const getClient = () => {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    throw new Error("Contentful environment variables are required.");
  }

  return createClient({
    space: spaceId,
    accessToken,
  });
};

const fetchContentfulEntries = async (contentType, order, limit) => {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: contentType,
      order,
      limit,
    });
    return response.items || [];
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
};

export const getSmallArticles = async () =>
  fetchContentfulEntries("smallArticle");
export const getHomePageText = async () =>
  fetchContentfulEntries("homePageBlock");
export const getGames = async () =>
  fetchContentfulEntries("game", undefined, 1000);
export const getOfficers = async () =>
  fetchContentfulEntries("officer", "fields.order");
export const getImages = async () => fetchContentfulEntries("image");
export const getGalleries = async () => fetchContentfulEntries("gallery");
export const getNews = async () =>
  fetchContentfulEntries("news", "-sys.updatedAt");
export const getHistory = async () => fetchContentfulEntries("history");
export const getCompetitions = async () =>
  fetchContentfulEntries("competitionleague");

export const getLongDate = (dateTimeString) => {
  const date = new Date(dateTimeString);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) daySuffix = "st";
  else if (day === 2 || day === 22) daySuffix = "nd";
  else if (day === 3 || day === 23) daySuffix = "rd";

  return `${dayOfWeek} ${month} ${day}${daySuffix} ${year}`;
};

export const splitArray = (arr) => {
  if (!Array.isArray(arr)) {
    return [[], []];
  }
  const midpoint = Math.ceil(arr.length / 2);
  return [arr.slice(0, midpoint), arr.slice(midpoint)];
};

export const adjustIframeHeight = () => {
  const iframes = document.getElementsByTagName("iframe");
  let loadedCount = 0;

  Array.from(iframes).forEach((iframe) => {
    iframe.onload = () => {
      loadedCount += 1;
      if (loadedCount === iframes.length) {
        Array.from(iframes).forEach((iframeItem) => {
          iframeItem.style.height = "1400px";
        });
      }
    };
  });
};

export const richTextToHtml = (richText) => {
  if (!richText) return "";

  try {
    return documentToHtmlString(richText);
  } catch (error) {
    console.error("Error converting rich text to HTML:", error);
    return "";
  }
};
