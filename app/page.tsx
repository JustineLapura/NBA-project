"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ... (rest of your code)
interface PlayerStats {
  id: number;
  player_name: string;
  age: number;
  games: number;
  games_started: number;
  minutes_played: number;
  field_goals: number;
  field_attempts: number;
  field_percent: string;
  three_fg: number;
  three_attempts: number;
  three_percent: string;
  two_fg: number;
  two_attempts: number;
  two_percent: string;
  effect_fg_percent: string;
  ft: number;
  fta: number;
  ft_percent: string;
  ORB: number;
  DRB: number;
  TRB: number;
  AST: number;
  STL: number;
  BLK: number;
  TOV: number;
  PF: number;
  PTS: number;
  team: string;
  season: number;
}

async function getData(page: number) {
  const res = await fetch(
    `https://nba-stats-db.herokuapp.com/api/playerdata/season/2023?page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PlayerStats[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const teams: string[] = data.map((playerData) => playerData.team);
  const displayedTeams = [...new Set(teams)];
  // console.log(displayedTeams);

  const fetchData = async (page: number) => {
    try {
      const newData = await getData(page);
      setData(newData.results);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    fetchData(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1);
    }
  };

  const selectTeam = (selectedTeam: string) => {
    setSelectedTeam(selectedTeam);
  };

  console.log(selectedTeam);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between gap-4 py-16 px-4">
      <h1>Nba Project</h1>
      <h1>{displayedTeams.length} teams found</h1>
      <h1>NBA Season {data.length > 0 ? data[0].season : "N/A"}</h1>
      <div className="grid place-items-center max-w-[600px] mx-auto grid-cols-6 gap-4">
        {displayedTeams.map((team: string) => (
          <div
            key={team}
            className="border border-gray-400 rounded-xl p-4  hover:bg-gray-800 active:bg-gray-950 hover:text-gray-50 duration-200 cursor-pointer"
            onClick={() => selectTeam(team)}
          >
            {team}
          </div>
        ))}
      </div>
      
      {/* Teams Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>

      {/* View Players  */}
      <div className="grid gap-4 h-full w-full max-w-[1240px] mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {selectedTeam && data
          .filter((playerData) => playerData.team === selectedTeam)
          .map((playerData: PlayerStats) => (
            <div
              key={playerData.id}
              className="flex justify-center items-center border border-gray-400 rounded-xl p-4 "
            >
              <h1>{playerData.player_name}</h1>
            </div>
          ))}
      </div>
    </main>
  );
}

// import Image from "next/image";

// interface PlayerStats {
//   id: number;
//   player_name: string;
//   age: number;
//   games: number;
//   games_started: number;
//   minutes_played: number;
//   field_goals: number;
//   field_attempts: number;
//   field_percent: string;
//   three_fg: number;
//   three_attempts: number;
//   three_percent: string;
//   two_fg: number;
//   two_attempts: number;
//   two_percent: string;
//   effect_fg_percent: string;
//   ft: number;
//   fta: number;
//   ft_percent: string;
//   ORB: number;
//   DRB: number;
//   TRB: number;
//   AST: number;
//   STL: number;
//   BLK: number;
//   TOV: number;
//   PF: number;
//   PTS: number;
//   team: string;
//   season: number;
// }

// async function getData() {
//   const res = await fetch(
//     "https://nba-stats-db.herokuapp.com/api/playerdata/season/2023"
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// export default async function Home() {
//   const data = await getData();
//   console.log(data);

//   return (
//     <main className="flex min-h-screen w-full flex-col items-center justify-between gap-4 py-16 px-4">
//       <h1>Nba Project</h1>
//       <h1>{data.count} results found</h1>
//       <h1>NBA Season {data.results[0].season}</h1>
//       <div className="grid gap-4 h-full w-full max-w-[1240px] mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//         {data.results.map((playerData: PlayerStats) => (
//           <div className="border border-gray-400 p-4 rounded-xl">
//             <h1 className="text-center font-bold text-gray-900">{playerData.player_name}</h1>
//             <h1>Team: {playerData.team}</h1>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
