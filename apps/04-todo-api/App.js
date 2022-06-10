import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';


function useRest(url) {
  const [entities, update] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => update(data));
  }, []);

  return {
    create: entity => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
        .then(response => response.json())
        .then(data => update([...entities, data]));
    },
    read: () => entities,
    update: (entity) => {
      update(entities.map(t => (t.id === entity.id ? data : t)));
      fetch(`${url}/${entity.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      }).then(response => response.json())
        .then(data => update(entities.map(t => (t.id === entity.id ? data : t))));
    },
    delete: entity => {
      console.log(entity);
      fetch(`${url}/${entity.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
        .then(data => update(entities.filter(t => t.id !== entity.id)));
    }
  };
}

function TodoItem({ todo, todos }) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, updateEditTitle] = useState(todo.title);

  const toggleCompleted = () => todos.update({ ...todo, completed: !todo.completed });

  const toggleEditMode = () => {
    if (editMode) {
      todos.update({ ...todo, title: editTitle })
    }
    setEditMode(!editMode)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Button title={todo.completed ? 'OK' : 'TODO'} onPress={toggleCompleted} />
      {editMode ? <TextInput
        style={{ flex: 1 }}
        value={editTitle}
        onChangeText={title => updateEditTitle(title)}
      /> : <Text style={{ flex: 1 }}>{todo.title}</Text>}
      <Button title={editMode ? 'Save' : 'Edit'} onPress={toggleEditMode} />
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
  const todos = useRest("http://localhost:3000/todos");

  return (
    <View >
      <Text >Todo List</Text>
      <TodoList todos={todos} />
      <TodoEdit todos={todos} />
    </View>
  );
}

