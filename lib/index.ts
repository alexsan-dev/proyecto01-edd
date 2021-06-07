// ELEMENTOS
const localInitDarkValue: boolean =
	window.localStorage.getItem('darkmode') === '1'
const darkBtn: HTMLElement | null = document.querySelector(
	'#darkmode-btn > .icon-moon',
)

// CAMBIAR DARKMODE
const toggleDarkBtn = () => {
	// DARKMODE LOCAL
	const darkValue: boolean = window.localStorage.getItem('darkmode') === '1'

	// CAMBIAR
	setIconDark(!darkValue)
	toggleDarkMode()
}

// INICIAR CON DARKMODE
const setIconDark = (darkValue: boolean) => {
	if (darkBtn) darkBtn.className = darkValue ? 'icon-sun' : 'icon-moon'
}
setIconDark(localInitDarkValue)
