'use client'
import UserCard from '@/components/UserCard/UserCard'
import useUserStore from '@/store/user'
import { Title } from '@mantine/core'
import { useEffect } from 'react'
import classes from './page.module.css'

const Users = () => {
	const users = useUserStore(state => state.users)
	const fetchUsers = useUserStore(state => state.fetchUsers)
	const isLoading = useUserStore(state => state.isLoading)
	const error = useUserStore(state => state.error)

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<main className={classes.main}>
			<Title order={3} textWrap='balance' mb={16}>
				Users
			</Title>
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{!!users.length && (
				<div className={classes.containerUsers}>
					{users.map(user => (
						<UserCard key={user.id} user={user} />
					))}
				</div>
			)}
		</main>
	)
}

export default Users
