import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

function randomId() {
  return Math.floor(Math.random() * (2 ** 64));
}

function TodoItem({ todo, todos, updateTodos }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Button title={todo.completed ? 'OK' : 'TODO'} onPress={() => updateTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))} />
      {editMode ? <TextInput
        style={{ flex: 1 }}
        value={todo.title}
        onChangeText={title => updateTodos(todos.map(t => t.id === todo.id ? { ...t, title } : t))}
      /> : <Text>{todo.title}</Text>}
      <Button title={editMode ? 'Save' : 'Edit'} onPress={() => setEditMode(!editMode)} />
      <Button title='Delete' onPress={() => updateTodos(todos.filter(t => t.id !== todo.id))} />
    </View>
  );
}

function TodoList({ todos, updateTodos }) {
  return (
    <View >
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} todos={todos} updateTodos={updateTodos} />)}
    </View>
  );
}

function TodoEdit({ todos, updateTodos }) {
  const [newTodo, setNewTodo] = useState('');

  return <View>
    <Text>
      New Todo:
    </Text>
    <TextInput
      placeholder="Add Todo"
      value={newTodo}
      onChangeText={text => setNewTodo(text)} />
    <Button title="Add Todo" onPress={() => updateTodos([...todos, { id: randomId(), title: newTodo, completed: false }])} />
  </View>
}

export default function App() {
  const [todos, updateTodos] = useState([
    { id: 1, title: 'Learn React Native', completed: false },
    { id: 2, title: 'Learn React Native', completed: false },
    { id: 3, title: 'Learn React Native', completed: false },
  ]);

  return (
    <View >
      <Text >Todo List</Text>
      <TodoList todos={todos} updateTodos={updateTodos} />
      <TodoEdit todos={todos} updateTodos={updateTodos} />
      <StatusBar style="auto" />
    </View>
  );
}

