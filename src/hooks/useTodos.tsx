import React from 'react';
import { TODO_FILTERS, TODOS_ACTIONS } from '../consts';
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
	| { type: TODOS_ACTIONS.INIT; payload: { todos: TodoList } } // init state
	| { type: TODOS_ACTIONS.TOGGLE_COMPLETED; payload: { id: string; completed: boolean } }
	| { type: TODOS_ACTIONS.FILTER_CHANGE; payload: { filter: FilterValue } }
	| { type: TODOS_ACTIONS.REMOVE; payload: { id: string } }
	| { type: TODOS_ACTIONS.ADD; payload: { title: string } }
	| { type: TODOS_ACTIONS.REMOVE_ALL_COMPLETED };

//#region REDUCER
const reducer = (state: State, action: Action): State => {
	if (TODOS_ACTIONS.INIT === action.type) {
		const { todos } = action.payload;
		return { ...state, todos };
	}

	if (TODOS_ACTIONS.TOGGLE_COMPLETED === action.type) {
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

	if (TODOS_ACTIONS.FILTER_CHANGE === action.type) {
		const { filter } = action.payload;
		return {
			...state,
			filterSelected: filter,
		};
	}

	if (TODOS_ACTIONS.REMOVE === action.type) {
		const { id } = action.payload;
		return {
			...state,
			todos: state.todos.filter((todo) => todo.id !== id),
		};
	}

	if (TODOS_ACTIONS.ADD === action.type) {
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

	if (TODOS_ACTIONS.REMOVE_ALL_COMPLETED === action.type) {
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
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const { todos, filterSelected } = state;

	// handlers
	const handleChangeFilter = (filter: FilterValue) => {
		dispatch({ type: TODOS_ACTIONS.FILTER_CHANGE, payload: { filter } });
		const params = new URLSearchParams(window.location.search);
		params.set('filter', filter);
		window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
	};

	const handleRemove = (id: string) => dispatch({ type: TODOS_ACTIONS.REMOVE, payload: { id } });
	const handleAdd = (title: string) => dispatch({ type: TODOS_ACTIONS.ADD, payload: { title } });
	const handleRemoveAllCompleted = () => dispatch({ type: TODOS_ACTIONS.REMOVE_ALL_COMPLETED });
	const toggleComplete = (id: string, completed: boolean) =>
		dispatch({ type: TODOS_ACTIONS.TOGGLE_COMPLETED, payload: { id, completed } });

	// helper function
	const completedCount = React.useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);
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
