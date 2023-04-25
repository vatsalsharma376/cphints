export const addUser = "INSERT INTO users (name, email, password,username) VALUES ($1, $2, $3, $4) RETURNING *";
export const checkAlreadyExists = "SELECT * FROM users WHERE email = $1 OR username = $2";
