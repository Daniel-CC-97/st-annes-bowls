interface FixtureProps {
  fixture: {
    fields: {
      dateAndTime: string; // Assuming dateAndTime is a string in ISO format like "2024-06-21T13:00+01:00"
      teams: [string, string]; // Assuming teams is an array of two strings
      rinks: string;
      venue: string;
      competition: string;
      comp?: any; // Optional untill all fields updated
    };
  };
}

const Fixture: React.FC<FixtureProps> = ({ fixture }) => {
  const dateStr = fixture.fields.dateAndTime;
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const simpleTime = `${hours}:${minutes}`;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-1 lg:gap-0 bg-gray-300 text-primary-darker rounded-lg p-1 lg:p-2">
      <div className="flex w-full lg:w-4/5 justify-center gap-2 lg:gap-4 items-center">
        <h6 className="w-1/3 text-right lg:text-lg">
          {fixture.fields.teams[0]}
        </h6>
        <span className="bg-primary text-secondary-lighter font-extrabold text-2xl rounded text-center py-2 w-20">
          {simpleTime}
        </span>
        <h6 className="w-1/3 lg:whitespace-nowrap lg:text-lg">
          {fixture.fields.teams[1]}
        </h6>
      </div>
      <p className="text-sm block font-bold lg:hidden text-center">
        {fixture.fields.rinks && Number(fixture.fields.rinks) > 0 && (
          <span className="font-normal mr-2">
            {fixture.fields.rinks}{" "}
            {Number(fixture.fields.rinks) === 1 ? "Rink" : "Rinks"}
          </span>
        )}
        {fixture.fields.venue}
      </p>
      <div className="w-full lg:w-3/5 text-center lg:text-right flex justify-center items-center gap-2 lg:block">
        <h6 className="font-bold">
          {fixture.fields.comp?.fields.name}{" "}
          {fixture.fields.rinks && Number(fixture.fields.rinks) > 0 && (
            <span className="font-normal hidden lg:inline ml-2">
              {fixture.fields.rinks}{" "}
              {Number(fixture.fields.rinks) === 1 ? "Rink" : "Rinks"}
            </span>
          )}
        </h6>
        <p className="text-sm hidden lg:block">{fixture.fields.venue}</p>
      </div>
    </div>
  );
};

export default Fixture;
