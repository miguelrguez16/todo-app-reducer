import React from 'react';
import { Footer, Todos } from './components';
import { Header } from './components/Header';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
	const {
		todos,
		completedCount,
		activeCount,
		filterSelected,
		toggleComplete,
		handleRemove,
		handleChangeFilter,
		handleAdd,
		handleRemoveAllCompleted,
	} = useTodos();

	return (
		<div className="todoapp">
			<Header onAddTodo={handleAdd} />
			<Todos todos={todos} toggleComplete={toggleComplete} handleRemove={handleRemove} />
			<Footer
				activeAccount={activeCount}
				completedAccount={completedCount}
				filterSelected={filterSelected}
				handleChangeFilter={handleChangeFilter}
				handleRemoveAllCompleted={handleRemoveAllCompleted}
			/>
		</div>
	);
};
