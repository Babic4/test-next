'use client'
import useTodoStore from '@/store/todo'
import useUserStore from '@/store/user'
import {
	ActionIcon,
	Avatar,
	Button,
	Checkbox,
	Text,
	Title,
} from '@mantine/core'
import { IconEye, IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classes from './page.module.css'

const User = ({ params }) => {
	const user = useUserStore(state => state.user)
	const fetchUser = useUserStore(state => state.fetchUser)
	const isLoading = useUserStore(state => state.isLoading)
	const error = useUserStore(state => state.error)

	const todos = useTodoStore(state => state.todos)
	const fetchTodosUser = useTodoStore(state => state.fetchTodosUser)
	const updateTodo = useTodoStore(state => state.updateTodo)

	const [following, setFollowing] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [fetching, setFetching] = useState(false)

	const scrollHandler = e => {
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
			100
		) {
			setFetching(true)
		}
	}

	const showTodo = () => {
		fetchTodosUser(currentPage).then(() =>
			setCurrentPage(prevPage => prevPage + 1)
		)
	}

	useEffect(() => {
		if (fetching) {
			fetchTodosUser(currentPage)
				.then(() => setCurrentPage(prevPage => prevPage + 1))
				.finally(() => setFetching(false))
		}
	}, [fetching])

	useEffect(() => {
		fetchUser(params.id)
		document.addEventListener('scroll', scrollHandler)
		return () => document.removeEventListener('scroll', scrollHandler)
	}, [])

	return (
		<main className={classes.main}>
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{!!user && !isLoading && (
				<div className={classes.userBox}>
					<div className={classes.header}>
						<Avatar
							variant='light'
							radius='xl'
							size='xl'
							src='https://cdn.dribbble.com/users/5160218/screenshots/18349277/media/0acdd6b49bd8ef2d9f1c2f6b83191c84.png?resize=1000x750&vertical=center'
						/>
						<div className={classes.nameBox}>
							<Text fw={900} size='lg'>
								{user.name}
							</Text>
							<span>{user.email}</span>
						</div>
						<Button
							leftSection={
								following ? (
									<IconHeart stroke={2} />
								) : (
									<IconHeartFilled stroke={2} />
								)
							}
							size='xs'
							color={following ? 'gray' : 'red'}
							onClick={() => setFollowing(!following)}
						>
							{following ? 'Unfollow' : 'Follow'}
						</Button>
					</div>
					<div className={classes.info}>
						<div className={classes.itemInfo}>
							<span>posts</span>
							<span>9</span>
						</div>
						<div className={classes.itemInfo}>
							<span>followers</span>
							<span>5</span>
						</div>
						<div className={classes.itemInfo}>
							<span>following</span>
							<span>2001</span>
						</div>
					</div>
					<div className={classes.details}>
						<span>info</span>
						<span>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book.
						</span>
					</div>
				</div>
			)}

			<div className={classes.titleBox}>
				<Title order={4} textWrap='balance'>
					Todos user
				</Title>
				<ActionIcon
					variant='filled'
					aria-label='Settings'
					onClick={() => showTodo()}
				>
					<IconEye stroke={2} />
				</ActionIcon>
			</div>
			{!!todos && !isLoading && (
				<div className={classes.todosWrapper}>
					{todos.map(todo => (
						<div
							key={'id' + Math.random().toString(16).slice(2)}
							className={classes.todosBox}
						>
							<span>
								<b>{todo.id}.</b> {todo.title}
							</span>
							<Checkbox
								checked={todo.completed}
								onChange={() => updateTodo(todo.id)}
								color='green.6'
								iconColor='dark.8'
								size='xs'
							/>
						</div>
					))}
				</div>
			)}
		</main>
	)
}

export default User
