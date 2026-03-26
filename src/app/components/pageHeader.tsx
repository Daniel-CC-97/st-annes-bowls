interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="relative bg-gradient-to-r from-secondary-lighter to-secondary-darker py-16 lg:py-26 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-3xl mx-auto px-6 w-full relative">
        <h1 className="text-4xl lg:text-6xl font-bold text-white text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-center text-white/90 text-lg mt-4">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
