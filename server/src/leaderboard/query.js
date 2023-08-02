export const getLeaderboardData =
  "SELECT u.id, u.username, COUNT(t.thid) AS num_hints FROM users u JOIN temphint t ON u.id = t.uid GROUP BY u.id, u.username ORDER BY num_hints DESC LIMIT 10;";
