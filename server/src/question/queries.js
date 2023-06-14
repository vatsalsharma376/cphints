export const hintsForEachQ = "SELECT q.qid, COUNT(h.hid),qname,platform,qlink1 FROM question q LEFT JOIN hint h ON q.qid = h.qid GROUP BY q.qid LIMIT $1 OFFSET $2;";
