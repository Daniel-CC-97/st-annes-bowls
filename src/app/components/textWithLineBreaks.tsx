import parse from "html-react-parser";

interface Props {
  text: string;
}

const TextWithLineBreaks: React.FC<Props> = ({ text }) => {
  const formattedText = String(text)
    .replace(/^# (.*)$/gm, '<h1 class="text-2xl font-bold">$1</h1>')
    .replace(/^## (.*)$/gm, '<h2 class="text-xl font-bold">$1</h2>')
    .replace(/^### (.*)$/gm, '<h3 class="text-lg font-bold">$1</h3>')
    .replace(/^#### (.*)$/gm, '<h4 class="text-lg font-bold">$1</h4>')
    .replace(/^##### (.*)$/gm, '<h5 class="text-lg font-bold">$1</h5>')
    .replace(/^###### (.*)$/gm, '<h6 class="text-lg font-bold">$1</h6>')
    .replace(/\n/g, "<br />");

  return <div className="text-primary-darker">{parse(formattedText)}</div>;
};

export default TextWithLineBreaks;
