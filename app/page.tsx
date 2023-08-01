import Image from "next/image";

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

async function getData() {
  const res = await fetch(
    "https://nba-stats-db.herokuapp.com/api/playerdata/season/2023"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between gap-4 py-16 px-4">
      <h1>Nba Project</h1>
      <h1>{data.count} results found</h1>
      <h1>NBA Season {data.results[0].season}</h1>
      <div className="grid gap-4 h-full w-full max-w-[1240px] mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((playerData: PlayerStats) => (
          <div className="border border-gray-400 p-4 rounded-xl">
            <h1 className="text-center font-bold text-gray-900">{playerData.player_name}</h1>
            <h1>Team: {playerData.team}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
