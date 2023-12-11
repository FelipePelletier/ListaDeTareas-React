import { useState } from "react";
import Todo from "./Todo";
import "./TodoApp.css";

const TodoApp = () => {
  const [title, setTitle] = useState("hola"); //estado para que se creen las tareas
  const [todos, setTodos] = useState([]); //estados para que se almacenen las tareas

  const handleChange = (e) => {
    //escribir o cambiar dentro del form
    const value = e.target.value;
    setTitle(value);
  };

  const handleSubmit = (e) => {
    //funcion para que cuando agregue una tarea se almacene en array
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const temp = [...todos];
    temp.unshift(newTodo);

    setTodos(temp);

    setTitle("");
  };

  const handleUpdate = (id, value) => {
    //funcion para actualizar tarea
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  };

  const handleDelete = (id) => {
    const temp = todos.filter((item) => item.id != id);

    setTodos(temp);
  };

  return (
    <div className="todoContainer">
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input onChange={handleChange} className="todoInput" value={title} />
        <input
          onClick={handleSubmit}
          type="submit"
          value="Crear tarea"
          className="buttonCreate"
        />
      </form>

      <div className="todosContainer">
        {/* mostrar las tareas recorriendo el array */}
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
