import { TodoList } from '../types/todo';
import { Todo } from './Todo';

interface Props {
	todos: TodoList;
	toggleComplete: (id: string, completed: boolean) => void;
	handleRemove: (id: string) => void;
}

export const Todos: React.FC<Props> = ({ todos, toggleComplete, handleRemove }) => {
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
					<Todo
						key={todo.id}
						id={todo.id}
						title={todo.title}
						completed={todo.completed}
						toggleComplete={toggleComplete}
						handleRemove={handleRemove}
					/>
				</li>
			))}
		</ul>
	);
};
