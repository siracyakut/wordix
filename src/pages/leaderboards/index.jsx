import { MdLeaderboard } from "react-icons/md";
import { useQuery } from "react-query";
import { getLeaderboardService } from "~/services/leaderboard";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import LeaderboardItem from "~/pages/leaderboards/leaderboard-item";
import { motion } from "framer-motion";

export default function Leaderboards() {
  const { data, error, isFetching } = useQuery(["leaderboard"], () =>
    getLeaderboardService(),
  );

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="w-full flex flex-col items-center justify-center gap-8"
    >
      <div className="flex items-center gap-x-4 text-orange-500 dark:text-yellow-500">
        <MdLeaderboard size={40} />
        <p className="font-extrabold uppercase text-3xl text-center">
          Liderlik Tablosu
        </p>
      </div>
      {isFetching ? (
        <Loading inline={true} />
      ) : error ? (
        <ErrorBox>{error.data}</ErrorBox>
      ) : (
        <div className="w-full grid gap-5 max-w-[450px] border-2 border-light dark:border-zinc-500 p-5 max-h-[600px] overflow-y-auto overflow-x-hidden rounded-md">
          {data.data.map((item, index) => (
            <LeaderboardItem key={item._id} data={item} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
