import { get, post } from "~/utils/request";

export const getLeaderboardService = () => get("/leaderboard");
export const addLeaderboardService = (data) => post("/leaderboard/add", data);
