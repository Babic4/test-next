'use client'
import {
	Box,
	Button,
	PasswordInput,
	Popover,
	Progress,
	Text,
	TextInput,
	rem,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import classes from './page.module.css'

function PasswordRequirement({ meets, label }) {
	return (
		<Text
			c={meets ? 'teal' : 'red'}
			style={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size='xs'
			radius='md'
		>
			{meets ? (
				<IconCheck style={{ width: rem(14), height: rem(14) }} />
			) : (
				<IconX style={{ width: rem(14), height: rem(14) }} />
			)}{' '}
			<Box ml={10}>{label}</Box>
		</Text>
	)
}

const requirements = [
	{ re: /[0-9]/, label: 'Includes number' },
	{ re: /[a-z]/, label: 'Includes lowercase letter' },
	{ re: /[A-Z]/, label: 'Includes uppercase letter' },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
]

function getStrength(password) {
	let multiplier = password.length > 5 ? 0 : 1

	requirements.forEach(requirement => {
		if (!requirement.re.test(password)) {
			multiplier += 1
		}
	})

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

export default function Home() {
	const [popoverOpened, setPopoverOpened] = useState(false)
	const [value, setValue] = useState('')
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(value)}
		/>
	))

	const strength = getStrength(value)
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

	return (
		<main className={classes.main}>
			<div className={classes.formContainer}>
				<form className={classes.form}>
					<h2>Create account</h2>
					<TextInput
						classNames={{ input: classes.input }}
						size='xs'
						radius='md'
						label='Email'
						placeholder='Your email'
					/>
					<Popover
						opened={popoverOpened}
						position='bottom'
						width='target'
						transitionProps={{ transition: 'pop' }}
					>
						<Popover.Target>
							<div
								onFocusCapture={() => setPopoverOpened(true)}
								onBlurCapture={() => setPopoverOpened(false)}
							>
								<PasswordInput
									classNames={{ input: classes.input }}
									size='xs'
									radius='md'
									label='Password'
									placeholder='Your password'
									value={value}
									onChange={event => setValue(event.currentTarget.value)}
								/>
							</div>
						</Popover.Target>
						<Popover.Dropdown>
							<Progress color={color} value={strength} size={5} mb='xs' />
							<PasswordRequirement
								label='Includes at least 6 characters'
								meets={value.length > 5}
							/>
							{checks}
						</Popover.Dropdown>
					</Popover>
					<Button variant='light' color='pink' size='xs' radius='xl'>
						Register
					</Button>
				</form>
			</div>
		</main>
	)
}
