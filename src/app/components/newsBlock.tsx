import { useState, useEffect, useRef } from "react";
import { getLongDate, richTextToHtml } from "@/utils";

interface NewsProps {
  newsTitle: string;
  newsContent: any; // Contentful rich text document
  updatedAtDate: string;
}

const NewsBlock: React.FC<NewsProps> = ({
  newsTitle,
  newsContent,
  updatedAtDate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsButton, setNeedsButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const longDate = getLongDate(updatedAtDate);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const containerHeight = contentRef.current.clientHeight;

      setNeedsButton(contentHeight > containerHeight);
    }
  }, [newsContent]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col justify-between lg:justify-start w-full bg-gray-300 text-primary-darker rounded-lg p-1 lg:p-2">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{newsTitle}</h2>
        <span className="text-secondary-darker text-sm font-normal content-center">
          {longDate}
        </span>
      </div>
      <div className="relative">
        <div
          ref={contentRef}
          className={`overflow-hidden transition-max-height duration-500 ease-in-out text-slate-700 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_p:last-child]:mb-0 ${
            isExpanded ? "max-h-[3000px]" : "max-h-32"
          }`}
          dangerouslySetInnerHTML={{ __html: richTextToHtml(newsContent) }}
        />
        {!isExpanded && needsButton && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-300 to-transparent" />
        )}
      </div>
      {needsButton && (
        <button
          className="mt-2 self-middle lg:self-end bg-primary-lighter text-secondary-vibrant font-bold py-1 px-3 rounded"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default NewsBlock;
