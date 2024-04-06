import Header from '@/components/Header/Header'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'My Mantine app',
	description: 'I have followed setup instructions carefully',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<Header />
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	)
}
