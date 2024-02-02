import { useGame } from "~/store/game/hooks";
import { WORDS } from "~/constants/game";
import { setJokerCount, setLetters } from "~/store/game/actions";
import { useEffect } from "react";
import WordBubble from "~/pages/game/bubbles/word-bubble";
import { useCurrentAnswer } from "~/hooks/use-current-answer";
import useBreakpoint from "~/hooks/use-breakpoint";

export default function GameBubbles() {
  const { currentQuestion, letters, userAnswers } = useGame();
  const currentAnswer = useCurrentAnswer({ allAnswers: false });
  const breakpoint = useBreakpoint();

  useEffect(() => {
    setLetters([currentAnswer.substring(0, 1)]);
    setJokerCount(
      currentAnswer.length < 3 ? 0 : currentAnswer.length === 3 ? 1 : 2,
    );
  }, [currentQuestion]);

  const getCurrentBubble = () => {
    let str = "";
    for (let i = 0; i < currentAnswer.length; i++) {
      if (letters[i]) {
        str += `${letters[i].toLocaleUpperCase("tr-TR")} `;
      } else {
        str += "_ ";
      }
    }
    return str;
  };

  const trulyPrev =
    userAnswers[currentQuestion - 1] === 0 ||
    userAnswers[currentQuestion - 1] === -1 ||
    currentQuestion === 0;
  const trulyNext = WORDS[currentQuestion + 1] === "z";

  return (
    <div className="mx-auto grid place-items-center md:flex md:items-center md:justify-center gap-[35px] md:gap-[130px]">
      {breakpoint !== "mobile" && (
        <WordBubble trulyState={trulyPrev} variant="prev">
          {WORDS[currentQuestion].toLocaleUpperCase("tr-TR")}
        </WordBubble>
      )}

      <WordBubble variant="now">{getCurrentBubble()}</WordBubble>

      {breakpoint !== "mobile" && (
        <WordBubble trulyState={trulyNext} variant="hold">
          {WORDS[currentQuestion + 2].toLocaleUpperCase("tr-TR")}
        </WordBubble>
      )}
    </div>
  );
}
