"use client";

import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import Footer from "../components/footer";
import { getOfficers } from "@/utils";

import { useEffect, useState } from "react";
import Officer from "../components/officer";

export default function Page() {
  const [committee, setCommittee] = useState<any>([]);
  const [captains, setCaptains] = useState<any>([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const allOfficers = await getOfficers();

        const committeeArray = allOfficers.filter((officer) => {
          const role = officer.fields.roleType;
          return role === "Committee";
        });

        const captainsArray = allOfficers.filter((officer) => {
          const role = officer.fields.roleType;
          return role === "Captain";
        });

        setCommittee(committeeArray);
        setCaptains(captainsArray);
      } catch (error) {
        console.error("Error fetching officers: ", error);
      }
    };

    fetchOfficers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <PageHeader title="Officers" />
      <main className="flex-grow text-primary-darker mx-auto w-full max-w-4xl px-6 py-10">
        {committee.length > 0 && (
          <>
            <h2 className="font-bold text-xl mb-2">Committee</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {committee.map((member, index) => (
                <Officer key={index} officer={member} />
              ))}
            </div>
          </>
        )}

        {captains.length > 0 && (
          <>
            <h2 className="font-bold text-xl mb-2 mt-4">Captains</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {captains.map((captain, index) => (
                <Officer key={index} officer={captain} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
