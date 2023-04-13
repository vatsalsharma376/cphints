export const addTemporaryHint = "INSERT INTO temphint (hints,qlink,uid) VALUES (ARRAY[$1,$2,$3,$4,$5],$6,$7) RETURNING *";
