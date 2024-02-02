import { useSelector } from "react-redux";

export const useGame = () => useSelector((state) => state.game);
export const useTime = () => useSelector((state) => state.game.time);
export const useQuestions = () => useSelector((state) => state.game.questions);
export const useUserAnswers = () =>
  useSelector((state) => state.game.userAnswers);
