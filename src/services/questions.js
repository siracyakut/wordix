import { get, post } from "~/utils/request";

export const getQuestionByIdService = (data) => post("/questions/get", data);
export const getQuestionByLetter = (data) => get(`/questions/${data}`);
export const getAZQuestions = () => get("/questions");
export const getAllQuestionsService = () => get("/questions/all");
export const updateQuestionService = (data) => post("/questions/update", data);
export const deleteQuestionService = (data) => post("/questions/delete", data);
