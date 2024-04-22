import React from 'react';
import { TODO_FILTERS } from '../consts';
import { TodoList, type FilterValue } from '../types/todo';
import { mockedToDos } from '../utils/mocks';

interface State {
	todos: TodoList;
	filterSelected: FilterValue;
}

const initialState = {
	todos: mockedToDos,
	filterSelected: (() => {
		const params = new URLSearchParams(window.location.search);
		const filter = params.get('filter') as FilterValue | null;
		if (filter === null) return TODO_FILTERS.ALL;
		// check filter is valid, if not return ALL
		return Object.values(TODO_FILTERS).includes(filter) ? filter : TODO_FILTERS.ALL;
	})(),
};

type Action =
	| { type: 'INIT'; payload: { todos: TodoList } } // init state
	| { type: 'TOGGLE_COMPLETED'; payload: { id: string; completed: boolean } }
	| { type: 'FILTER_CHANGE'; payload: { filter: FilterValue } }
	| { type: 'REMOVE'; payload: { id: string } }
	| { type: 'ADD'; payload: { title: string } }
	| { type: 'REMOVE_ALL_COMPLETED' };

//#region REDUCER
const reducer = (state: State, action: Action): State => {
	if ('INIT' === action.type) {
		const { todos } = action.payload;
		return { ...state, todos };
	}

	if ('TOGGLE_COMPLETED' === action.type) {
		const { id, completed } = action.payload;

		const newTodos = state.todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					completed,
				};
			} else {
				return todo;
			}
		});

		return {
			...state,
			todos: newTodos,
		};
	}

	if ('FILTER_CHANGE' === action.type) {
		const { filter } = action.payload;
		return {
			...state,
			filterSelected: filter,
		};
	}

	if ('REMOVE' === action.type) {
		const { id } = action.payload;
		return {
			...state,
			todos: state.todos.filter((todo) => todo.id !== id),
		};
	}

	if ('ADD' === action.type) {
		const { title } = action.payload;
		const newTodo = {
			id: crypto.randomUUID(),
			title,
			completed: false,
		};

		return {
			...state,
			todos: [...state.todos, newTodo],
		};
	}

	if ('REMOVE_ALL_COMPLETED' === action.type) {
		const newTodos = state.todos.filter((todo) => !todo.completed);
		return {
			...state,
			todos: newTodos,
		};
	}

	return state;
};
//#endregion

//#region USETODOS
export const useTodos = (): {
	todos: TodoList;
	activeCount: number;
	completedCount: number;
	filterSelected: FilterValue;
	toggleComplete: (id: string, completed: boolean) => void;
	handleChangeFilter: (filter: FilterValue) => void;
	handleRemove: (id: string) => void;
	handleAdd: (title: string) => void;
	handleRemoveAllCompleted: () => void;
} => {
	const [{ todos, filterSelected }, dispatch] = React.useReducer(reducer, initialState);

	// handlers
	const toggleComplete = (id: string, completed: boolean) =>
		dispatch({ type: 'TOGGLE_COMPLETED', payload: { id, completed } });

	const handleChangeFilter = (filter: FilterValue) => {
		dispatch({ type: 'FILTER_CHANGE', payload: { filter } });
		const params = new URLSearchParams(window.location.search);
		params.set('filter', filter);
		window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
	};

	const handleRemove = (id: string) => dispatch({ type: 'REMOVE', payload: { id } });
	const handleAdd = (title: string) => dispatch({ type: 'ADD', payload: { title } });
	const handleRemoveAllCompleted = () => dispatch({ type: 'REMOVE_ALL_COMPLETED' });

	// helper function
	const completedCount = todos.filter((todo) => todo.completed).length;
	const activeCount = todos.length - completedCount;

	const filteredTodos = todos.filter((todo) => {
		if (filterSelected === TODO_FILTERS.ACTIVE) {
			return !todo.completed;
		}

		if (filterSelected === TODO_FILTERS.COMPLETED) {
			return todo.completed;
		}

		return true;
	});

	return {
		todos: filteredTodos,
		completedCount,
		activeCount,
		filterSelected,
		toggleComplete,
		handleChangeFilter,
		handleRemove,
		handleAdd,
		handleRemoveAllCompleted,
	};
};
//#endregion
