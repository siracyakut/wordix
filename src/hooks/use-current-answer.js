import PropTypes from "prop-types";
import { useGame } from "~/store/game/hooks";

export const useCurrentAnswer = ({ allAnswers }) => {
  const { questions, currentQuestion } = useGame();

  let answer = questions[currentQuestion].answer.toLocaleUpperCase("tr-TR");
  if (answer.includes(",")) {
    if (allAnswers) {
      answer = answer.split(",").map((item) => item.trim());
    } else {
      answer = answer.split(",")[0].trim();
    }
  }

  return answer;
};

useCurrentAnswer.propTypes = {
  allAnswers: PropTypes.bool.isRequired,
};
