export const activeHints =
  "SELECT  q.platform, q.qname FROM question q JOIN hint h ON q.qid = h.qid JOIN users u ON h.uid = u.id WHERE u.id = $1  LIMIT $2 OFFSET $3";
// GROUP BY q.qid, q.qlink1, q.qlink2, q.platform, q.qname

export const reviewHints =
  "SELECT  q.platform, q.qname FROM question q JOIN temphint h ON q.qlink1 = h.qlink JOIN users u ON h.uid = u.id WHERE u.id = $1 LIMIT $2 OFFSET $3";

export const getActiveCount =
  "SELECT COUNT(DISTINCT q.qid) AS total_count FROM question q JOIN hint h ON q.qid = h.qid JOIN users u ON h.uid = u.id WHERE u.id = $1";

export const getReviewCount =
  "SELECT COUNT(DISTINCT q.qid) AS total_count FROM question q JOIN temphint h ON q.qlink1 = h.qlink JOIN users u ON h.uid = u.id WHERE u.id = $1";

export const getUser = "SELECT * from USERS where id = $1";

export const getStats =
  "SELECT SUM(upvote) AS total_upvotes, SUM(downvote) AS total_downvotes, COUNT(*) AS total_hints FROM hint WHERE uid = $1;";

export const getReviewStats =
  "SELECT COUNT(*) AS total_in_review FROM temphint WHERE uid = $1;";
