import { create } from 'zustand'

const useUserStore = create(set => ({
	users: [],
	isLoading: false,
	error: null,
	fetchUsers: async () => {
		try {
			set({ isLoading: true })
			const response = await fetch('https://jsonplaceholder.typicode.com/users')

			if (response.ok) {
				const json = await response.json()
				set({ users: json, isLoading: false })
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
			console.log(newDataUsers)
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
