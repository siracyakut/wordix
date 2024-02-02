import { useGame } from "~/store/game/hooks";
import { useState } from "react";
import {
  addAnswers,
  addCorrect,
  addPass,
  addTotalJoker,
  addWrong,
  setCurrentQuestion,
  setJokerCount,
  setLetters,
  setUserAnswers,
} from "~/store/game/actions";
import { useCurrentAnswer } from "~/hooks/use-current-answer";
import { isNullOrWhitespace } from "~/utils/formatters";
import useSound from "use-sound";
import correctSound from "~/assets/sounds/correct.mp3";
import wrongSound from "~/assets/sounds/wrong.mp3";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function GameInputs() {
  const { letters, userAnswers, questions, currentQuestion, jokerCount } =
    useGame();
  const [answer, setAnswer] = useState("");
  const [playCorrect] = useSound(correctSound, { interrupt: true });
  const [playWrong] = useSound(wrongSound, { interrupt: true });
  let currentAnswers = useCurrentAnswer({ allAnswers: true });
  let currentAnswer = useCurrentAnswer({ allAnswers: false });
  const navigate = useNavigate();

  const handleAnswer = () => {
    const userAnswer = answer.trim().toLocaleLowerCase("tr-TR");
    if (isNullOrWhitespace(userAnswer)) return;
    if (typeof currentAnswers === "object") {
      currentAnswers = currentAnswers.map((item) =>
        item.toLocaleLowerCase("tr-TR"),
      );
      if (Object.values(currentAnswers).includes(userAnswer)) {
        handleSubmit(true);
      } else {
        handleSubmit(false);
      }
    } else {
      currentAnswers = currentAnswers.toLocaleLowerCase("tr-TR");
      if (userAnswer.includes(currentAnswers)) {
        handleSubmit(true);
      } else {
        handleSubmit(false);
      }
    }
    addAnswers(userAnswer);
  };

  const handleSubmit = (state) => {
    if (state === true) {
      addCorrect();
      playCorrect();
    } else if (state === false) {
      addWrong();
      playWrong();
    } else {
      addPass();
      addAnswers("");
    }

    setUserAnswers(
      userAnswers.map((answer, id) => {
        if (id === currentQuestion) {
          return state === true ? 1 : state === false ? 0 : -1;
        }
        return answer;
      }),
    );
    setAnswer("");

    if (currentQuestion < 25) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results", { replace: true });
    }
  };

  const handleJoker = () => {
    if (jokerCount <= 0) {
      toast.error("Hiç joker hakkınız yok!");
    } else {
      const random = Math.trunc(Math.random() * (currentAnswer.length - 1) + 1);
      if (letters[random]) return handleJoker();
      const items = [...letters];
      items[random] = currentAnswer[random];
      setLetters(items);
      setJokerCount(jokerCount - 1);
      addTotalJoker();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAnswer();
  };

  return (
    <div className="flex items-center justify-center flex-col flex-wrap gap-y-[30px] mt-[50px]">
      <div className="max-w-[450px] p-[20px] border-2 border-dashed border-green-400 rounded-[10px] text-center">
        {questions[currentQuestion].question}
      </div>
      <form
        className="flex items-center justify-center flex-wrap gap-[10px]"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="answer"
          className="border-none outline-none px-4 py-2 dark:bg-zinc-600 text-black dark:text-white rounded-lg shadow-lg"
          maxLength={32}
          minLength={2}
          autoComplete="off"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Cevabınız..."
        />
      </form>
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          className="outline-none font-bold px-4 py-2 text-white bg-blue-400 rounded-lg transition-all hover:scale-110"
          onClick={handleAnswer}
        >
          GÖNDER
        </button>
        <button
          type="button"
          className="outline-none font-bold px-4 py-2 text-white bg-yellow-400 rounded-lg transition-all hover:scale-110"
          onClick={() => handleSubmit(-1)}
        >
          PAS!
        </button>
        <button
          type="button"
          className="outline-none font-bold px-4 py-2 text-white bg-green-500 rounded-lg transition-all hover:scale-110"
          onClick={handleJoker}
        >
          HARF AL!
        </button>
      </div>
    </div>
  );
}
