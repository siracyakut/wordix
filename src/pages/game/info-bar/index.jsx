import {
  MdArrowForwardIos,
  MdOutlineClear,
  MdOutlineDone,
  MdOutlineStar,
  MdOutlineTimer,
} from "react-icons/md";
import { useGame } from "~/store/game/hooks";
import { formatNumber, secToTime } from "~/utils/formatters";

export default function GameInfoBar() {
  const { correctCount, wrongCount, passCount, time, score } = useGame();

  return (
    <div className="flex items-center justify-center flex-wrap mb-[60px] font-bold border-[3px] border-light dark:border-zinc-500 rounded-lg p-[10px]">
      <div className="flex items-center justify-center w-full mb-4 md:mb-0 md:w-auto">
        <div className="border-r-[3px] border-light dark:border-zinc-500 pr-2 flex items-center gap-x-2">
          <MdOutlineTimer className="text-blue-300" size={25} />
          <span className="text-blue-300">{secToTime(time)}</span>
        </div>
        <div className="md:border-r-[3px] md:border-light md:dark:border-zinc-500 px-2 flex items-center gap-x-2">
          <MdOutlineStar className="text-yellow-400" size={25} />
          <span className="text-yellow-400">{formatNumber(score)}</span>
        </div>
      </div>
      <div className="border-r-[3px] border-light dark:border-zinc-500 px-2 flex items-center gap-x-2">
        <MdOutlineDone className="text-green-500" size={25} />
        <span className="text-green-500">{correctCount}</span>
      </div>
      <div className="border-r-[3px] border-light dark:border-zinc-500 px-2 flex items-center gap-x-2">
        <MdOutlineClear className="text-red-600" size={25} />
        <span className="text-red-600">{wrongCount}</span>
      </div>
      <div className="pl-2 flex items-center gap-x-2">
        <MdArrowForwardIos className="text-yellow-600" size={20} />
        <span className="text-yellow-600">{passCount}</span>
      </div>
    </div>
  );
}
