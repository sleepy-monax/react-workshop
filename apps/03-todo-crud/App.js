import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

function randomId() {
  return Math.floor(Math.random() * (2 ** 64));
}

function useCrud(seed) {
  const [entities, update] = useState(seed);

  return {
    create: entity => update([...entities, { id: randomId(), ...entity }]),
    read: () => entities,
    update: (entity) => {
      update(entities.map(t => (t.id === entity.id ? entity : t)));
    },
    delete: entity => update(entities.filter(t => t.id !== entity.id))
  };
}

function TodoItem({ todo, todos }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Button title={todo.completed ? 'OK' : 'TODO'} onPress={() => todos.update({ ...todo, completed: !todo.completed })} />
      {editMode ? <TextInput
        style={{ flex: 1 }}
        value={todo.title}
        onChangeText={title => todos.update({ ...todo, title })}
      /> : <Text style={{ flex: 1 }}>{todo.title}</Text>}
      <Button title={editMode ? 'Save' : 'Edit'} onPress={() => setEditMode(!editMode)} />
      <Button title='Delete' onPress={() => todos.delete(todo)} />
    </View>
  );
}

function TodoList({ todos }) {
  return (
    <View >
      {todos.read().map(todo => <TodoItem key={todo.id} todo={todo} todos={todos} />)}
    </View>
  );
}

function TodoEdit({ todos }) {
  const [title, updateTitle] = useState('');

  return <View>
    <Text>
      New Todo:
    </Text>
    <TextInput
      placeholder="Add Todo"
      value={title}
      onChangeText={text => updateTitle(text)} />
    <Button title="Add Todo" onPress={() => todos.create({ title, completed: false })} />
  </View>
}

export default function App() {
  const todos = useCrud([
    { id: 1, title: 'Learn React Native', completed: false },
    { id: 2, title: 'Learn React Native', completed: false },
    { id: 3, title: 'Learn React Native', completed: false },
  ]);

  return (
    <View >
      <Text >Todo List</Text>
      <TodoList todos={todos} />
      <TodoEdit todos={todos} />
    </View>
  );
}

