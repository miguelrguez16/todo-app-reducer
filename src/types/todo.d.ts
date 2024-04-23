export interface TodoType {
	id: string;
	title: string;
	completed: boolean;
}

export type ToDoId = Pick<Todo, 'id'>;
export type ToDoTitle = Pick<Todo, 'title'>;
export type ToDoCompleted = Pick<Todo, 'completed'>;

export type TodoList = Todo[];
export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
