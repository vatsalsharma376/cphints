
export const showHints = "SELECT * FROM temphint ORDER BY thid ASC";
export const checkQuestionExists = "SELECT * FROM question WHERE (qlink1 IS NOT NULL AND qlink1 = $1) OR ((qlink2 IS NOT NULL) AND qlink2 = $2)";
export const approveHint = "INSERT INTO hint (hints,qid,uid) VALUES (ARRAY[$1,$2,$3,$4,$5],$6,$7) RETURNING *"
export const rejectHint = "DELETE FROM temphint WHERE thid = $1"
export const addQuestion = "INSERT INTO question (qlink1,qlink2,platform,qname) VALUES ($1,$2,$3,$4) RETURNING *"