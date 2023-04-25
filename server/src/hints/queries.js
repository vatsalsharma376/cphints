export const addTemporaryHint = "INSERT INTO temphint (hints,qlink,uid) VALUES (ARRAY[$1,$2,$3,$4,$5],$6,$7) RETURNING *";
export const upvoteHint = "UPDATE temphint SET upvotes = upvotes + 1 WHERE thid = $1 RETURNING *";
export const downvoteHint = "UPDATE temphint SET downvotes = downvotes + 1 WHERE thid = $1 RETURNING *";