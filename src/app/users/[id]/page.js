'use client'
import useUserStore from '@/store/user'
import { Avatar, Button, Text } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import classes from './page.module.css'

const User = ({ params }) => {
	const user = useUserStore(state => state.user)
	const fetchUser = useUserStore(state => state.fetchUser)
	const isLoading = useUserStore(state => state.isLoading)
	const error = useUserStore(state => state.error)

	const [following, setFollowing] = useState(false)

	useEffect(() => {
		fetchUser(params.id)
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
							<span>{Math.floor(Math.random() * 1000)}</span>
						</div>
						<div className={classes.itemInfo}>
							<span>followers</span>
							<span>{Math.floor(Math.random() * 1000)}</span>
						</div>
						<div className={classes.itemInfo}>
							<span>following</span>
							<span>{Math.floor(Math.random() * 1000)}</span>
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
		</main>
	)
}

export default User
