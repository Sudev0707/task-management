import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskComponent, { Task } from '../../component/TaskComponent';
import AddTask from './AddTask';
import EditTask from './EditTask';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slice';
import {
  deleteTaskFromDB,
  getTasksFromDB,
  getUserFromDB,
  saveTaskToDB,
} from '../../sqlite/database';
import {
  deleteTaskAsync,
  loadTasksAsync,
  toggleCompleteAsync,
  updateTaskAsync,
} from '../../redux/taskThunks';
// import { addTask } from '../../redux/taskSlice';

const TaskDashboard: React.FC = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<any>(null);

  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const theme = useColorScheme();
  const styles = getStyles(theme === 'dark');

  const userEmail = useSelector((state: any) => state.user.user.email);
  const taskFromStore = useSelector((state: any) => state.tasks.tasks);
  console.log(taskFromStore, 'bhgjghjgh');

  const onRefresh = async () => {
    if (loading) return;
    setRefreshing(true);

    const dbTasks = await getTasksFromDB();
    setTasks(dbTasks);

    setRefreshing(false);
  };

  console.log(tasks, 'tasks');

  // useEffect(() => {
  //   dispatch(loadTasksAsync());
  // }, [dispatch]);

  // get user

  // get task

  useEffect(() => {
    const loadDbUser = async () => {
      const dbUser = await getUserFromDB();
      console.log('dbUser', dbUser);
      setUser(dbUser);
    };
    loadDbUser();
  }, []);

  // ------------------
  const loadTasks = async () => {
    // setLoading(true);
    const dbTasks = await getTasksFromDB();
    setTasks(dbTasks);
    setLoading(false);
  };
  useEffect(() => {
    loadTasks();
  }, [refreshKey]);

  const refreshTasks = () => {
    setRefreshKey(prev => prev + 1);
  };

  //
  // const addTask = async (task: Task) => {
  //   setTasks(prev => [...prev, { ...task, completed: false }]);
  //   await saveTaskToDB(task)
  //   setShowAddTask(false);
  // };
  //
  // const addTaskHandler = async (task: Task) => {
  //   const newTask = {
  //     ...task,
  //     completed: false,
  //     synced: false,
  //     createdAt: Date.now(),
  //   };

  //   dispatch(addTask(newTask));

  //   await saveTaskToDB(newTask);

  //   setShowAddTask(false);
  // };

  //
  const toggleComplete = (task: Task) => {
    const updated = { ...task, completed: !task.completed };
    // setTasks(prev => prev.map(t => (t.id === task.id ? updated : t)));
    // setTasks(prev =>
    //   prev.map(t => (t.id === task.id ? { ...t, completed: !t.completed } : t)),
    // );
    dispatch(toggleCompleteAsync(task));
    // await saveTaskToDB(updated);
     loadTasks();
  };

  //
  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  const handleUpdate = async (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(t => (t.id === updatedTask.id ? updatedTask : t)),
    );
    await dispatch(updateTaskAsync(updatedTask));

    setShowEdit(false);
    setSelectedTask(null);
  };

  // 🗑 Delete
  const deleteTask = (task: Task) => {
    // setTasks(prev => prev.filter(t => t.id !== task.id));
    // await deleteTaskFromDB(task.id);
    dispatch(deleteTaskAsync(task.id));
    dispatch(loadTasksAsync());
    loadTasks();
  };

  //

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} />
        <View style={styles.header}>
          <Text style={styles.email}>{userEmail}</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>logout</Text>
          </TouchableOpacity>{' '}
        </View>
        {/* <Text>{user?.email}</Text> */}
        {/* <Text>new: {refreshKey} </Text> */}
        {showAddTask ? (
          <AddTask
            // addTask={addTaskHandler}
            onBack={() => setShowAddTask(false)}
            onTaskAdded={refreshTasks}
          />
        ) : loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loaderText}>Loading tasks...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Task Dashboard</Text>
            <Text style={styles.heading}>Total task: {tasks.length}</Text>
            <FlatList
              data={tasks}
              extraData={tasks}
              keyExtractor={item => item.id!}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TaskComponent
                  data={item}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onEdit={handleEdit}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              // onEndReachedThreshold={0.5}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setShowAddTask(true)}
            >
              <Text style={styles.addText}>Add Task</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>

      <EditTask
        visible={showEdit}
        task={selectedTask}
        onClose={() => {
          setShowEdit(false);
          setSelectedTask(null);
        }}
        onSave={handleUpdate}
      />
    </>
  );
};

export default TaskDashboard;

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 14,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDarkMode ? '#2C2C2C' : '#EEE',
    },
    email: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#EAEAEA' : '#333',
      flex: 1,
      marginRight: 10,
    },
    logoutBtn: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      // backgroundColor: '#FFEBE9',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FF6B5F',
    },

    logoutText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#D32F2F',
      textTransform: 'uppercase',
    },

    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: isDarkMode ? '#fff' : '#000',
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
    },
    addBtn: {
      backgroundColor: isDarkMode ? '#1E88E5' : '#007bff',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    addText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    loaderText: {
      marginTop: 10,
      color: '#555',
    },
  });

// const styles =
