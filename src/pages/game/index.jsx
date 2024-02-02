import ErrorBox from "~/components/error-box";
import { motion } from "framer-motion";
import Loading from "~/components/loading";
import { useQuery } from "react-query";
import { getAZQuestions } from "~/services/questions";
import { setQuestions, setScore, setTime } from "~/store/game/actions";
import GameInfoBar from "~/pages/game/info-bar";
import GameBubbles from "~/pages/game/bubbles";
import GameInputs from "~/pages/game/inputs";
import { useEffect } from "react";
import { useGame } from "~/store/game/hooks";
import { calculateScore } from "~/utils/calculations";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { currentQuestion, correctCount, totalJoker } = useGame();
  const navigate = useNavigate();

  const { error, isFetching } = useQuery(
    ["questions"],
    () => getAZQuestions(),
    {
      onSuccess: (data) => {
        setQuestions(data.data);
      },
    },
  );

  useEffect(() => {
    let interval;

    if (!isFetching && !error) {
      const endTime = Date.now() + 300500;
      setTime(endTime - Date.now());

      interval = setInterval(() => {
        if (endTime - Date.now() <= 0) {
          clearInterval(interval);
          setTime(0);
          navigate("/results", { replace: true });
        } else {
          setTime(endTime - Date.now());
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isFetching, error]);

  useEffect(() => {
    const score = calculateScore(correctCount, totalJoker);
    setScore(score);
  }, [currentQuestion]);

  return !isFetching ? (
    error ? (
      <ErrorBox>{error.data}</ErrorBox>
    ) : (
      <motion.div
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="flex flex-col items-center justify-center w-full h-full mx-auto"
      >
        <GameInfoBar />
        <GameBubbles />
        <GameInputs />
      </motion.div>
    )
  ) : (
    <Loading inline={true} />
  );
}
