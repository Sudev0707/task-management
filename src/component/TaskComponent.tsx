import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export type Task = {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
};

interface Props {
  data: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskComponent: React.FC<Props> = ({
  data,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <View
      style={[
        styles.container,
        data.completed && styles.completedContainer,
      ]}
    >
      <Text>ID: {data.id}</Text>
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() => onToggleComplete(data)}
      >
     
        <View
          style={[
            styles.checkbox,
            data.completed && styles.checkboxChecked,
          ]}
        >
          {data.completed && <View style={styles.checkMark} />}
        </View>

 
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              data.completed && styles.completedText,
            ]}
            numberOfLines={1}
          >
            {data.title}
          </Text>

          {!!data.description && (
            <Text
              style={[
                styles.description,
                data.completed && styles.completedText,
              ]}
              numberOfLines={2}
            >
              {data.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <Text style={styles.status}>
          {data.completed ? 'Completed' : 'Incomplete'}
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => onEdit?.(data)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete?.(data)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F6FFFA',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DFF5EA',
  },

  completedContainer: {
    backgroundColor: '#F1F1F1',
    borderColor: '#E0E0E0',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  checkboxChecked: {
    backgroundColor: '#1E90FF',
  },

  checkMark: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },

  actions: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  status: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },

  buttons: {
    flexDirection: 'row',
  },

  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 8,
  },

  editText: {
    color: '#4CAF50',
    fontWeight: '600',
  },

  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E53935',
  },

  deleteText: {
    color: '#E53935',
    fontWeight: '600',
  },
});

