import { FilterValue } from '../types/todo';
import { Filters } from './Filters';

interface Props {
	activeAccount: number;
	completedAccount: number;
	filterSelected: FilterValue;
	handleChangeFilter: (filter: FilterValue) => void;
	handleRemoveAllCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
	activeAccount = 0,
	completedAccount,
	filterSelected,
	handleChangeFilter,
	handleRemoveAllCompleted,
}) => {
	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>{activeAccount} tareas pendientes</strong>
			</span>

			<Filters filterSelected={filterSelected} handleChangeFilter={handleChangeFilter} />
			{completedAccount > 0 && (
				<button className="clear-completed" onClick={() => handleRemoveAllCompleted()}>
					Borrar completados
				</button>
			)}
		</footer>
	);
};
