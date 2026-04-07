"use client";

import { useState, useEffect, useRef } from "react";
import Fixture from "../components/fixture";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import { getGames, getCompetitions } from "../../utils";
import PageHeader from "../components/pageHeader";
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

export default function Page() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string>("");
  const [competitionList, setCompetitionList] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamList, setTeamList] = useState<string[]>([]);
  const [teamSearchTerm, setTeamSearchTerm] = useState<string>("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState<boolean>(false);
  const teamInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        teamInputRef.current &&
        !teamInputRef.current.contains(event.target as Node)
      ) {
        setIsTeamDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGames();
        const filteredFixtures = games.filter(
          (game: any) =>
            !game.fields.result &&
            new Date(game.fields.dateAndTime) > new Date(),
        );
        setFixtures(filteredFixtures);

        // Collect unique teams from all games
        const allTeams = games.flatMap((game: any) => game.fields.teams || []);
        const uniqueTeams = [...new Set(allTeams)].sort();
        setTeamList(uniqueTeams);
      } catch (error) {
        console.error("Error fetching games: ", error);
      }
    };
    const fetchCompetitions = async () => {
      try {
        const competitionsData = await getCompetitions();
        const competitionNames = competitionsData.map(
          (competition: any) => competition.fields.name,
        );
        setCompetitionList(competitionNames);
      } catch (error) {
        console.error("Error fetching competitions: ", error);
      }
    };

    fetchCompetitions();
    fetchGames();
  }, []);

  const filteredTeamList = teamList.filter((team) =>
    team.toLowerCase().startsWith(teamSearchTerm.toLowerCase()),
  );

  const handleTeamSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSearchTerm(e.target.value);
    setIsTeamDropdownOpen(true);
  };

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setTeamSearchTerm(team);
    setIsTeamDropdownOpen(false);
  };

  const handleTeamInputFocus = () => {
    setIsTeamDropdownOpen(true);
  };

  const clearTeamFilter = () => {
    setSelectedTeam("");
    setTeamSearchTerm("");
    setIsTeamDropdownOpen(false);
  };

  const filteredFixtures = fixtures.filter((fixture) => {
    const competitionMatch =
      !selectedCompetition ||
      fixture.fields.comp?.fields.name === selectedCompetition;
    const teamMatch =
      !selectedTeam || fixture.fields.teams.includes(selectedTeam);
    return competitionMatch && teamMatch;
  });

  // Sort the filtered fixtures by date without mutating original list
  const sortedFixtures = [...filteredFixtures].sort(
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
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <PageHeader title="Fixtures" />
      <main className="flex-grow mx-auto w-full max-w-4xl px-6 py-10">
        <section>
          <h1 className="text-2xl font-semibold text-primary-darker mb-6">
            Upcoming Fixtures
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mb-8">
            <div className="h-20">
              <label
                htmlFor="competition-select"
                className="block text-sm font-medium text-primary mb-2"
              >
                Filter by Competition
              </label>
              <select
                id="competition-select"
                className="block w-full bg-primary text-secondary-lighter px-3 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-lighter focus:border-secondary-lighter h-12"
                value={selectedCompetition}
                onChange={(e) => setSelectedCompetition(e.target.value)}
              >
                <option value="">All Competitions</option>
                {competitionList.map((competition, index) => (
                  <option key={index} value={competition}>
                    {competition}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-20">
              <label
                htmlFor="team-search"
                className="block text-sm font-medium text-primary mb-2"
              >
                Filter by Team
              </label>
              <div className="relative" ref={teamInputRef}>
                <input
                  id="team-search"
                  type="text"
                  className="block w-full bg-primary text-secondary-lighter px-3 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-lighter focus:border-secondary-lighter h-12"
                  value={teamSearchTerm}
                  onChange={handleTeamSearchChange}
                  onFocus={handleTeamInputFocus}
                  placeholder="Search teams..."
                />
                {selectedTeam && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearTeamFilter();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-lighter hover:text-gray-300"
                  >
                    ×
                  </button>
                )}
                {isTeamDropdownOpen && filteredTeamList.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                    {filteredTeamList.map((team, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTeamSelect(team);
                        }}
                      >
                        {team}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {(selectedCompetition || selectedTeam) && (
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCompetition("");
                  setSelectedTeam("");
                  setTeamSearchTerm("");
                  setIsTeamDropdownOpen(false);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}

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
