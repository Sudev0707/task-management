import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Task } from '../../component/TaskComponent';
import uuid from 'react-native-uuid';


type Props = {
  addTask: (task: Task) => void;
  onBack: () => void;
};

const AddTask: React.FC<Props> = ({ addTask, onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isDisabled = !title.trim() && !description.trim();

  const handleAddTask = () => {
    if (isDisabled) return;

    addTask({
    //   id: uuid.v4().toString(),
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    //   date: Date.now()
    });

    setTitle('');
    setDescription('');
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textArea: { height: 100 },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: { backgroundColor: '#aaa' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  back: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007bff',
    fontWeight: '600',
     borderWidth: 1,
       borderRadius: 8,
    padding: 12,
  },
});
