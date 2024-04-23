export const TODO_FILTERS = {
	ALL: 'all',
	ACTIVE: 'active',
	COMPLETED: 'completed',
} as const;

export enum TODOS_ACTIONS {
	INIT = 'INIT',
	TOGGLE_COMPLETED = 'TOGGLE_COMPLETED',
	FILTER_CHANGE = 'FILTER_CHANGE',
	REMOVE = 'REMOVE',
	ADD = 'ADD',
	REMOVE_ALL_COMPLETED = 'REMOVE_ALL_COMPLETED',
}

export const FILTERS_BUTTONS = {
	[TODO_FILTERS.ALL]: {
		literal: 'Todos',
		href: `/?filter=${TODO_FILTERS.ALL}`,
	},
	[TODO_FILTERS.ACTIVE]: {
		literal: 'Activos',
		href: `/?filter=${TODO_FILTERS.ACTIVE}`,
	},
	[TODO_FILTERS.COMPLETED]: {
		literal: 'Completados',
		href: `/?filter=${TODO_FILTERS.COMPLETED}`,
	},
} as const;
