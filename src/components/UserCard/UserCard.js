'use client'
import useUserStore from '@/store/user'
import { ActionIcon, Avatar, Text } from '@mantine/core'
import { IconHeart, IconHeartFilled, IconTrash } from '@tabler/icons-react'
import classes from './UserCard.module.css'

const UserCard = ({ user }) => {
	const deleteUser = useUserStore(state => state.deleteUser)
	const toggleFavorites = useUserStore(state => state.toggleFavorites)

	return (
		<div className={classes.userCard}>
			<div className={classes.leftContainer}>
				<Avatar
					variant='light'
					radius='xl'
					size='lg'
					src='https://cdn.dribbble.com/users/5160218/screenshots/18349277/media/0acdd6b49bd8ef2d9f1c2f6b83191c84.png?resize=1000x750&vertical=center'
				/>
				<Text
					fw={900}
					size='sm'
					variant='gradient'
					gradient={{ from: 'cyan', to: 'red', deg: 270 }}
				>
					{user.name}
				</Text>
			</div>
			<div className={classes.rightContainer}>
				{user.favorite}
				<ActionIcon
					variant='light'
					color={user.favorite ? 'pink' : 'gray'}
					radius='xl'
					aria-label='Settings'
					onClick={() => toggleFavorites(user.id)}
				>
					{user.favorite ? (
						<IconHeartFilled stroke={2} />
					) : (
						<IconHeart stroke={2} />
					)}
				</ActionIcon>
				<ActionIcon
					variant='light'
					color='red'
					radius='xl'
					aria-label='Settings'
					onClick={() => deleteUser(user.id)}
				>
					<IconTrash stroke={2} />
				</ActionIcon>
			</div>
		</div>
	)
}

export default UserCard
