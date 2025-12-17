import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskComponent, { Task } from '../../component/TaskComponent';
import AddTask from './AddTask';
import EditTask from './EditTask';
import uuid from 'react-native-uuid';

const TaskDashboard: React.FC = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  console.log(tasks,'tasks');
  
  //
  const addTask = (task: Task) => {
    setTasks(prev => [
      ...prev,
      { ...task, id: uuid.v4().toString(), completed: false },
    ]);
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

  return (
    <>
      <SafeAreaView style={styles.container}>
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
