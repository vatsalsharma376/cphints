export const addUser = "INSERT INTO users (name, email, password, handle, color,username) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *";
export const checkAlreadyExists = "SELECT * FROM users WHERE email = $1 OR username = $2";
