import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
	todos: [],
	isLoading: false,
	error: null,
	fetchTodosUser: async page => {
		try {
			if (page === 1) set({ todos: [] })
			set({ isLoading: true })
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`
			)

			if (response.ok) {
				const json = await response.json()
				set(state => ({ todos: [...state.todos, ...json], isLoading: false }))
			} else {
				set({ error: 'Error', isLoading: false })
			}
		} catch {
			set({ error: 'Error', isLoading: false })
		}
	},
	updateTodo: id => {
		set(state => {
			const newTodos = state.todos.map(todo => {
				return todo.id === id ? { ...todo, completed: !todo.completed } : todo
			})
			return { todos: newTodos }
		})
	},
	// fetchUser: async id => {
	// 	try {
	// 		set({ isLoading: true })
	// 		const response = await fetch(
	// 			`https://jsonplaceholder.typicode.com/users/${id}`
	// 		)

	// 		if (response.ok) {
	// 			const json = await response.json()
	// 			setTimeout(() => {
	// 				set({ user: json, isLoading: false })
	// 			}, 2000)
	// 		} else {
	// 			set({ error: 'Error', isLoading: false })
	// 		}
	// 	} catch {
	// 		set({ error: 'Error', isLoading: false })
	// 	}
	// },
}))

export default useTodoStore
