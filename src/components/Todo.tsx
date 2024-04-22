import { TodoType } from '../types/todo';

interface Props extends TodoType {
	toggleComplete: (id: string, completed: boolean) => void;
	handleRemove: (id: string) => void;
}

export const Todo: React.FC<Props> = ({ id, title, completed, toggleComplete, handleRemove }) => {
	return (
		<div className="view" id={`${id}-container`}>
			<input
				className="toggle"
				checked={completed}
				type="checkbox"
				onChange={(event) => toggleComplete(id, event.target.checked)}></input>
			<label>{title}</label>
			<button
				className="destroy"
				onClick={() => {
					handleRemove(id);
				}}></button>
		</div>
	);
};
