import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  passCount: 0,
  questions: [],
  userAnswers: [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1,
  ],
  currentQuestion: 0,
  letters: [],
  jokerCount: 0,
  totalJoker: 0,
  answers: [],
};

const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    _setTime: (state, action) => {
      state.time = action.payload;
    },
    _setScore: (state, action) => {
      state.score = action.payload;
    },
    _setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    _setUserAnswers: (state, action) => {
      state.userAnswers = action.payload;
    },
    _setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    _setLetters: (state, action) => {
      state.letters = action.payload;
    },
    _addCorrect: (state) => {
      state.correctCount += 1;
    },
    _addWrong: (state) => {
      state.wrongCount += 1;
    },
    _addPass: (state) => {
      state.passCount += 1;
    },
    _setJokerCount: (state, action) => {
      state.jokerCount = action.payload;
    },
    _addTotalJoker: (state) => {
      state.totalJoker += 1;
    },
    _addAnswers: (state, action) => {
      state.answers = [...state.answers, action.payload];
    },
  },
});

export const {
  _setTime,
  _setScore,
  _setQuestions,
  _setUserAnswers,
  _setCurrentQuestion,
  _setLetters,
  _addCorrect,
  _addWrong,
  _addPass,
  _setJokerCount,
  _addTotalJoker,
  _addAnswers,
} = game.actions;
export default game.reducer;
