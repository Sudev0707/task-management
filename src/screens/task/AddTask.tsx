import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Task } from '../../component/TaskComponent';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { addTaskAsync } from '../../redux/taskThunks';
// import { addTask } from '../../redux/taskSlice';

type Props = {
  //   addTask: (task: Task) => void;
  onBack: () => void;
  //    onTaskAdded: () => void;
};

const AddTask: React.FC<Props> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<any>();
  const isDisabled = !title.trim() && !description.trim();

  const theme = useColorScheme();
  const styles = getStyles(theme === 'dark');

  const handleAddTask = () => {
    if (isDisabled) return;
    const task = {
      id: uuid.v4().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      synced: false,
    };

    dispatch(addTaskAsync(task));

    // addTask({
    //   id: uuid.v4().toString(),
    //   //   id: Math.random().toString(36).substr(2, 9),
    //   title: title.trim(),
    //   description: description.trim(),
    //   completed: false,
    //   //   date: Date.now()
    // });

    setTitle('');
    setDescription('');
    onBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <TextInput
        placeholder="title"
        placeholderTextColor={'gray'}
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="description"
        placeholderTextColor={'gray'}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, isDisabled && styles.disabled]}
        onPress={handleAddTask}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderColor: isDarkMode ? '#444' : '#ccc',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9',
      color: isDarkMode ? '#fff' : '#000',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    disabled: {
      backgroundColor: isDarkMode ? '#555' : '#aaa',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    back: {
      marginTop: 16,
      textAlign: 'center',
      color: isDarkMode ? '#4da3ff' : '#007bff',
      fontWeight: '600',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      borderColor: isDarkMode ? '#4da3ff' : '#007bff',
    },
  });
