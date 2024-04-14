import { create } from 'zustand'

const useUserStore = create((set, get) => ({
	user: {},
	users: [],
	isLoading: false,
	error: null,
	fetchUsers: async () => {
		try {
			set({ isLoading: true })
			const response = await fetch('https://jsonplaceholder.typicode.com/users')

			if (response.ok) {
				const json = await response.json()
				setTimeout(() => {
					set({ users: json, isLoading: false })
				}, 2000)
			} else {
				set({ error: 'Error', isLoading: false })
			}
		} catch {
			set({ error: 'Error', isLoading: false })
		}
	},
	fetchUser: async id => {
		try {
			set({ isLoading: true })
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/users/${id}`
			)

			if (response.ok) {
				const json = await response.json()
				setTimeout(() => {
					set({ user: json, isLoading: false })
				}, 2000)
			} else {
				set({ error: 'Error', isLoading: false })
			}
		} catch {
			set({ error: 'Error', isLoading: false })
		}
	},
	toggleFavorites: id => {
		set(state => {
			const newDataUsers = state.users.map(user => {
				return user.id === id
					? user.favorite
						? { ...user, favorite: false }
						: { ...user, favorite: true }
					: user
			})
			return { users: newDataUsers }
		})
	},
	deleteUser: id => {
		set(state => ({
			users: state.users.filter(user => user.id !== id),
		}))
	},
}))

export default useUserStore
