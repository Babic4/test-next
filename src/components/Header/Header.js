import classes from './Header.module.css'

const Header = () => {
	return (
		<header className={classes.header}>
			<span className={classes.name}>My App</span>
			<nav>
				<ul></ul>
			</nav>
		</header>
	)
}

export default Header
