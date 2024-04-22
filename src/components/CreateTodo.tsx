import { useState } from 'react';

interface Props {
	onAddTodo: (title: string) => void;
}

export const CreateTodo: React.FC<Props> = ({ onAddTodo }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onAddTodo(inputValue);
		setInputValue('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className="new-todo"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				onKeyDown={() => {}}
				placeholder="Qué quieres hacer"
				autoFocus></input>
		</form>
	);
};
