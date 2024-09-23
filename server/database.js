import mysql from "mysql2/promise";

process.loadEnvFile();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

// QUERYS
export const getTodosById = async (id) => {
  const [rowsTable] = await pool.query(
    `
    SELECT todos.*, shared_todos.shared_with_id
    FROM todos
    LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id 
    WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?;
    `,[id, id]
  );
  return rowsTable;
};

export const getTodoById = async (id) => {
  const [rowTable] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rowTable[0];
};

export const getSharedTodoById = async (id) => {
  const [rowTable] = await pool.query(`SELECT * FROM shared_todos WHERE todo_id = ?`,[id]);
  return rowTable[0];
};

export const getUserById = async (id) => {
  const [rowTable] = await pool.query(`SELECT * FROM users WHERE id = ?`,[id]);
  return rowTable[0];
};

export const getUserByEmail = async (email) => {
  const [rowTable] = await pool.query(`SELECT * FROM users WHERE email = ?`,[email]);
  return rowTable[0];
};

export const createTodo = async(user_id, title)=> {
  const [result] = await pool.query(
    `INSERT INTO todos (user_id, title) VALUES (?, ?)`, [user_id, title]
  );
  const todoId = result.insertId
  return getTodo(todoId)
}

export const deleteTodo = async(id)=> {
  const [result] = await pool.query(
    `DELETE FROM todos WHERE id = ?;`, [id]
  );
  return result
}

export const toogleCompleted = async (id, value) => {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `UPDATE todos SET completed = ${newValue} WHERE id = ?;`, [id]
  )
  return result;
}

export const shareTodo = async (todo_id, user_id, shared_with_id) => {
  const [result] = await pool.query(
    `INSERT INTO shared_todos (todo_id, user_id, shared_witch_id) VALUES (?,?,?)`,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
};
