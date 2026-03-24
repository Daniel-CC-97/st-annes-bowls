"use client";

import { useState, useEffect } from "react";
import Fixture from "../components/fixture";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import { getGames } from "../../utils";
import Hero from "../components/hero";
import AnimateWrapper from "../components/animatedComponent";

interface FixtureType {
  fields: {
    dateAndTime: string; // Assuming dateAndTime is a string in ISO format like "2024-06-21T13:00+01:00"
    teams: [string, string]; // Assuming teams is an array of two strings
    rinks: string;
    venue: string;
    competition: string;
  };
}

const competitions = [
  "Saturday Friendlies",
  "Sunday Friendlies",
  "Midweek Friendlies",
  "Floodlit League",
  "Bristol North East League Dragons",
  "Bristol North East League Blues",
  "Friday Triples League",
  "Glos County League",
];

export default function Page() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGames();
        const filteredFixtures = games.filter(
          (game: any) => !game.fields.result,
        );
        setFixtures(filteredFixtures);
      } catch (error) {
        console.error("Error fetching games: ", error);
      }
    };

    fetchGames();
  }, []);

  const filteredFixtures = selectedCompetition
    ? fixtures.filter(
        (fixture) => fixture.fields.competition === selectedCompetition,
      )
    : fixtures;

  // Sort the filtered fixtures by date
  const sortedFixtures = filteredFixtures.sort(
    (a, b) =>
      new Date(a.fields.dateAndTime).getTime() -
      new Date(b.fields.dateAndTime).getTime(),
  );

  const groupedFixtures = sortedFixtures.reduce(
    (acc, fixture) => {
      const fixtureDate = new Date(fixture.fields.dateAndTime);
      const dateKey = fixtureDate.toLocaleDateString("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(fixture);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  const groupedFixturesEntries = Object.entries(groupedFixtures) as [
    string,
    any[],
  ][];

  return (
    <div className="flex flex-col overflow-x-hidden min-h-screen">
      <NavBar />
      <Hero text="Fixtures" imageUrl="/bowl.jpg" height="small" />
      <main className="flex-grow mx-auto w-full max-w-4xl px-6 py-10">
        <section>
          <h1 className="text-2xl font-semibold text-primary-darker mb-6">
            Upcoming Fixtures
          </h1>

          <div className="mb-8">
            <label
              htmlFor="competition-select"
              className="block text-sm font-medium text-primary mb-2"
            >
              Filter by Competition
            </label>
            <select
              id="competition-select"
              className="block w-full bg-primary text-secondary-vibrant px-3 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-lighter focus:border-secondary-lighter"
              value={selectedCompetition}
              onChange={(e) => setSelectedCompetition(e.target.value)}
            >
              <option value="">All Competitions</option>
              {competitions.map((competition, index) => (
                <option key={index} value={competition}>
                  {competition}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-8">
            {groupedFixturesEntries.map(([dateLabel, fixtures]) => (
              <div key={dateLabel}>
                <h2 className="text-lg font-semibold text-primary-darker mb-3">
                  {dateLabel}
                </h2>
                <div className="flex flex-col gap-4">
                  {Array.isArray(fixtures) && fixtures.length > 0 ? (
                    fixtures.map((fixture, index) => (
                      <AnimateWrapper key={index}>
                        <Fixture fixture={fixture} />
                      </AnimateWrapper>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No fixtures for this date
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
