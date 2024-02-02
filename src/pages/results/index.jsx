import {
  MdArrowForwardIos,
  MdOutlineClear,
  MdOutlineDone,
  MdOutlineStar,
  MdOutlineTimer,
} from "react-icons/md";
import { formatNumber, secToTime } from "~/utils/formatters";
import { useGame } from "~/store/game/hooks";
import { Navigate } from "react-router-dom";
import ResultItem from "~/pages/results/result-item";
import ResultRanking from "~/pages/results/ranking";
import { motion } from "framer-motion";

export default function Results() {
  const {
    questions,
    score,
    correctCount,
    wrongCount,
    passCount,
    time,
    userAnswers,
    answers,
  } = useGame();

  return questions.length > 0 ? (
    <motion.div
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="w-full flex flex-col gap-20"
    >
      <ResultRanking />
      <div className="flex flex-col items-center justify-center mx-auto flex-wrap p-5 min-w-[300px] min-h-[300px] rounded-[20px] gap-[15px] border-[3px] border-solid [border-image:linear-gradient(to_bottom,red,rgba(0,0,0,0))_1_100%]">
        <p className="text-[25px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#fd0000] to-[#250000]">
          SONUÇLARINIZ
        </p>
        <div className="flex items-center gap-x-2">
          <MdOutlineStar className="text-yellow-400" size={25} />
          <p>{formatNumber(score)}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <MdOutlineDone className="text-green-500" size={25} />
          <p>{correctCount} Doğru</p>
        </div>
        <div className="flex items-center gap-x-2">
          <MdOutlineClear className="text-red-600" size={25} />
          <p>{wrongCount} Yanlış</p>
        </div>
        <div className="flex items-center gap-x-2">
          <MdArrowForwardIos className="text-yellow-600" size={20} />
          <p>{passCount} Pas</p>
        </div>
        <div className="flex items-center gap-x-2">
          <MdOutlineTimer className="text-blue-300" size={25} />
          <p>Kalan Süre: {secToTime(time)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto flex-wrap p-5 max-w-[350px] w-full min-h-[300px] rounded-[20px] gap-[15px] border-[3px] border-solid [border-image:linear-gradient(to_bottom,red,rgba(0,0,0,0))_1_100%]">
        <p className="text-[25px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#fd0000] to-[#250000]">
          CEVAP ANAHTARI
        </p>
        {questions.map((item, index) => (
          <ResultItem
            key={index}
            item={item}
            userAnswers={userAnswers}
            answers={answers}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  ) : (
    <Navigate to="/" />
  );
}
