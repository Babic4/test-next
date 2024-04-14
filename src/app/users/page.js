'use client'
import UserCard from '@/components/UserCard/UserCard'
import useUserStore from '@/store/user'
import { Input, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classes from './page.module.css'

const Users = () => {
	const users = useUserStore(state => state.users)
	const fetchUsers = useUserStore(state => state.fetchUsers)
	const isLoading = useUserStore(state => state.isLoading)
	const error = useUserStore(state => state.error)
	const [search, setSearch] = useState('')
	const [searching, setSearching] = useState(null)

	useEffect(() => {
		fetchUsers()
	}, [])

	useEffect(() => {
		setSearching(users)
	}, [users])

	useEffect(() => {
		const regex = new RegExp(`^${search}`, 'gi')
		setSearching(users.filter(user => user.name.match(regex)))
	}, [search])

	return (
		<main className={classes.main}>
			<div className={classes.header}>
				<Title order={3} textWrap='balance'>
					Users
				</Title>
				{!!users.length && (
					<Input
						placeholder='Search...'
						size='xs'
						radius='xl'
						value={search}
						onChange={event => setSearch(event.currentTarget.value)}
						leftSection={<IconSearch size={18} />}
						classNames={{ input: classes.input }}
					/>
				)}
			</div>
			{isLoading && users.length === 0 && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{!isLoading && (
				<div className={classes.containerUsers}>
					{!!searching?.length ? (
						searching.map(user => <UserCard key={user.id} user={user} />)
					) : (
						<div>Not users</div>
					)}
				</div>
			)}
		</main>
	)
}

export default Users
