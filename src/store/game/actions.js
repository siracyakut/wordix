import store from "~/store";
import {
  _addCorrect,
  _addPass,
  _addWrong,
  _setUserAnswers,
  _setCurrentQuestion,
  _setLetters,
  _setQuestions,
  _setScore,
  _setTime,
  _setJokerCount,
  _addTotalJoker,
  _addAnswers,
} from "~/store/game";

export const setTime = (data) => store.dispatch(_setTime(data));
export const setScore = (data) => store.dispatch(_setScore(data));
export const setQuestions = (data) => store.dispatch(_setQuestions(data));
export const setUserAnswers = (data) => store.dispatch(_setUserAnswers(data));
export const setCurrentQuestion = (data) =>
  store.dispatch(_setCurrentQuestion(data));
export const setLetters = (data) => store.dispatch(_setLetters(data));
export const addCorrect = () => store.dispatch(_addCorrect());
export const addWrong = () => store.dispatch(_addWrong());
export const addPass = () => store.dispatch(_addPass());
export const setJokerCount = (data) => store.dispatch(_setJokerCount(data));
export const addTotalJoker = () => store.dispatch(_addTotalJoker());
export const addAnswers = (data) => store.dispatch(_addAnswers(data));
