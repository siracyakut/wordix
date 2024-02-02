import { FaStar } from "react-icons/fa6";
import CountUp from "react-countup";
import {
  MdArrowForwardIos,
  MdOutlineClear,
  MdOutlineDone,
  MdOutlineTimer,
} from "react-icons/md";
import { secToTime } from "~/utils/formatters";
import useBreakpoint from "~/hooks/use-breakpoint";

export default function LeaderboardItem({ data, index }) {
  const breakpoint = useBreakpoint();

  return (
    <div className="flex flex-col gap-4 bg-slate-500/20 hover:bg-slate-500/40 dark:bg-zinc-700 p-5 rounded break-all cursor-pointer dark:hover:bg-zinc-600 transition-all">
      <div className="w-full flex items-center justify-between gap-2">
        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex-shrink-0">
          {index + 1}.
        </p>
        <p className="font-medium">
          {breakpoint === "mobile"
            ? data.username.split("@")[0]
            : data.username}
        </p>
        <div className="flex items-center gap-x-2 flex-shrink-0">
          <FaStar size={20} color="orange" />
          <CountUp
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700"
            start={0}
            end={data.score.$numberDecimal}
            decimals={2}
          />
        </div>
      </div>
      <div className="flex items-center justify-between font-bold">
        <div className="flex items-center gap-x-2 text-green-700 dark:text-green-500">
          <MdOutlineDone size={25} />
          <p>{data.trueCount}</p>
        </div>
        <div className="flex items-center gap-x-2 text-red-600">
          <MdOutlineClear size={25} />
          <p>{data.falseCount}</p>
        </div>
        <div className="flex items-center gap-x-2 text-yellow-600">
          <MdArrowForwardIos size={20} />
          <p>{data.passCount}</p>
        </div>
        <div className="flex items-center gap-x-2 text-blue-600 dark:text-blue-300">
          <MdOutlineTimer size={22} />
          <p>{secToTime((300 - data.time) * 1000)}</p>
        </div>
      </div>
    </div>
  );
}
