import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskComponent, { Task } from '../../component/TaskComponent';
import AddTask from './AddTask';
import EditTask from './EditTask';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slice';
import { getUserFromDB } from '../../sqlite/database';

const TaskDashboard: React.FC = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
   const [user, setUser] = useState<any>(null);

    const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);

  const userEmail = useSelector((state: any) => state.user.user.email);
  if (!userEmail) {
    return <Text>...</Text>;
  }
  console.log(tasks, 'tasks');

  useEffect(() => {
    const loadDbUser = async () => {
      const dbUser = await getUserFromDB();
      console.log('dbUser', dbUser);
      setUser(dbUser)
    };
    loadDbUser();
  }, []);

  //
  const addTask = (task: Task) => {
    setTasks(prev => [...prev, { ...task, completed: false }]);
    setShowAddTask(false);
  };

  //
  const toggleComplete = (task: Task) => {
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? { ...t, completed: !t.completed } : t)),
    );
  };

  //
  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  const handleSave = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(t => (t.id === updatedTask.id ? updatedTask : t)),
    );
    setShowEdit(false);
    setSelectedTask(null);
  };

  // 🗑 Delete
  const deleteTask = (task: Task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  //

  const TASKS_PER_PAGE = 10;
 
  const hasMore = displayedTasks.length < tasks.length;

  const loadMoreTasks = () => {
    if (loading) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * TASKS_PER_PAGE;
    const end = start + TASKS_PER_PAGE;

    const nextTasks = tasks.slice(start, end);
    if (nextTasks.length === 0) return; // No more tasks

    setLoading(true);

    setTimeout(() => {
      setDisplayedTasks(prev => [...prev, ...nextTasks]);
      setPage(nextPage);
      setLoading(false);
    }, 300); // small delay for smooth effect
  };
  //

  const handleLogout = () => {
    dispatch(clearUser()); // ✅ clear Redux user
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{userEmail}</Text>
          <TouchableOpacity
            style={{ padding: 7, backgroundColor: '#ffeeedff' }}
            onPress={handleLogout}
          >
            <Text style={{ fontWeight: 800 }}>logout</Text>
          </TouchableOpacity>{' '}
        </View>
        <Text>{user?.email}</Text>
        {showAddTask ? (
          <AddTask addTask={addTask} onBack={() => setShowAddTask(false)} />
        ) : (
          <>
            <Text style={styles.heading}>Task Dashboard</Text>
            <Text style={styles.heading}>Total task: {tasks.length}</Text>
            <FlatList
              data={tasks}
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
              onEndReached={loadMoreTasks}
              onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
              ListFooterComponent={
                loading && hasMore ? (
                  <Text style={{ textAlign: 'center', padding: 10 }}>
                    Loading...
                  </Text>
                ) : null
              }
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
        onSave={handleSave}
      />
    </>
  );
};

export default TaskDashboard;

// const getStyles = (isDarkMode: boolean) => StyleSheet.create({});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addBtn: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
