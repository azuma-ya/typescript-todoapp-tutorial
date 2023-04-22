import React, { useState } from "react";
import "./App.css";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState<Todo[]>([]);

	type Todo = {
		inputValue: string;
		id: number;
		checked: boolean;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//新しいTodoを作成
		const newTodo: Todo = {
			inputValue: inputValue,
			id: ~~(Math.random() * 10000000),
			checked: false,
		};

		setTodos([newTodo, ...todos]);
		setInputValue("");
	};

	const handleEdit = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		e.preventDefault();
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.inputValue = e.target.value;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleChecked = (id: number) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.checked = !todo.checked;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleDelete = (id: number) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	return (
		<div className="App">
			<div>
				<h2>TodoList with Typescript</h2>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<input
						type="text"
						onChange={(e) => {
							handleChange(e);
						}}
						className="inputText"
						value={inputValue}
					/>
					<input type="submit" value="作成" className="submitButton" />
				</form>
				<ul className="todoList">
					{todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="text"
								onChange={(e) => {
									handleEdit(e, todo.id);
								}}
								className="inputText"
								value={todo.inputValue}
								disabled={todo.checked}
							/>
							<input type="checkbox" onChange={() => handleChecked(todo.id)} />
							<button onClick={() => handleDelete(todo.id)}>消</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
