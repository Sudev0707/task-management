import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const db = SQLite.openDatabase({
  name: 'taskmanager.db',
  location: 'default',
});

export const initDB = async () => {
  const database = await db;
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uid TEXT,
      email TEXT
    );
  `);

  //
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS task (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      completed INTEGER,
        synced INTEGER DEFAULT 0
    );
  `);
};

export const saveUserToDB = async (user: any) => {
  const database = await db;
  await database.executeSql('DELETE FROM user');
  await database.executeSql('INSERT INTO user (uid, email) VALUES (?, ?)', [
    user.uid,
    user.email,
  ]);

  console.log('user', user);
};

//
export const getUserFromDB = async () => {
  const database = await db;
  const res = await database.executeSql('SELECT * FROM user ');
  console.log(' USER FOUND: ', res);
  return res[0].rows.length ? res[0].rows.item(0) : null;

  //   const results = await db.executeSql('SELECT * FROM user');
  //   const rows = results[0].rows;
  //   const users = [];
  //   for (let i = 0; i < rows.length; i++) {
  //     users.push(rows.item(i));
  //   }

  //   console.log('USER DATA ', users);
  //  if (res[0].rows.length > 0) {
  //     const user = res[0].rows.item(0);
  //     console.log('USER DATA FROM SQLITE:', user);
  //     return user;
  //   }
  //   console.log('NO USER FOUND IN SQLITE');
  //   return null;
};

export const clearUserFromDB = async () => {
  const database = await db;
  await database.executeSql('DELETE FROM user');
};

// ------ save task
export const saveTaskToDB = async (task: any) => {
  const database = await db;
  await database.executeSql(
    `INSERT INTO task (id, title, description, completed, synced) VALUES (?, ?, ?, ?, ?)`,
    [
      task.id,
      task.title,
      task.description,
      task.completed ? 1 : 0,
      task.synced ? 1 : 0,
    ],
  );
};

export const getTasksFromDB = async () => {
  const database = await db;
  const result = await database.executeSql('SELECT * FROM task');
  const rows = result[0].rows;
  const tasks: any[] = [];
  for (let i = 0; i < rows.length; i++) {
    const res = rows.item(i);
    tasks.push({
      id: res.id,
      title: res.title,
      description: res.description,
      completed: res.completed === 1,
      synced: res.synced === 1,
    });
  }
  return tasks;
};

export const updateTaskInDB = async (task: any) => {
  const database = await db;
  await database.executeSql(
    `UPDATE task
     SET title = ?, description = ?, completed = ?, synced = ?
     WHERE id = ?`,
    [
      task.title,
      task.description,
      task.completed ? 1 : 0,
      task.synced ? 1 : 0,
      task.id,
    ]
  );
};


export const deleteTaskFromDB = async (id: string) => {
  const database = await db;
  await database.executeSql(`DELETE FROM task WHERE id = ?`, [id]);
};

// ---------------- firebase sync
export const getUnsyncedTasks = async () => {
  const database = await db;
  const result = await database.executeSql(
    'SELECT * FROM task WHERE synced = 0',
  );
  const rows = result[0].rows;
  const tasks: any[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    tasks.push({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed === 1,
    });
  }
  return tasks;
};

// Mark a task as synced after uploading to Firestore
export const markTaskSynced = async (id: string) => {
  const database = await db;
  await database.executeSql(`UPDATE task SET synced = 1 WHERE id = ?`, [id]);
};
