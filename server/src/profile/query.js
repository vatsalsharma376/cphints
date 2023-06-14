export const activeHints =
  "SELECT q.qid, q.qlink1, q.qlink2, q.platform, q.qname, COUNT(*) OVER() AS total_count FROM question q JOIN hint h ON q.qid = h.qid JOIN users u ON h.uid = u.id WHERE u.id = $1 GROUP BY q.qid, q.qlink1, q.qlink2, q.platform, q.qname LIMIT $2 OFFSET $3";

export const getUser = "SELECT * from USERS where id = $1";
