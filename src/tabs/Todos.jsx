import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(window.localStorage.getItem('todos')) ?? []
  );

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleCreateTodo = value => {
    const newTodo = { text: value, id: nanoid() };
    setTodos(prevState => [...prevState, newTodo]);
  };

  const deleteTodo = removeId => {
    const updatedTodos = todos.filter(({ id }) => id !== removeId);
    setTodos(updatedTodos);
  };

  const updateTodo = (newText, id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <>
      <SearchForm onSubmit={handleCreateTodo} />
      <Grid>
        {todos.length > 0 &&
          todos.map(({ text, id }, index) => {
            return (
              <GridItem key={id}>
                <Todo
                  description={text}
                  index={index}
                  id={id}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              </GridItem>
            );
          })}
      </Grid>
    </>
  );
};
