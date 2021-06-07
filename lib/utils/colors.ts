const toCamelCase = (text: string) =>
	text.replace(text.charAt(0), text.charAt(0).toUpperCase())

// COLORES
interface IPColor {
	name: string
	value: string
}

interface IColor {
	name: string
	value: string
	darkValue: string
}

// COLORES PRIMARIOS
const primaryColors: IPColor[] = [
	{ name: '--paper', value: '#f2f2f2' },
	{ name: '--pale', value: '#e5e5e5' },
	{ name: '--night', value: '#222' },
	{ name: '--dark', value: '#333' },
	{ name: '--hole', value: '#4c4c4c' },
	{ name: '--darkNight', value: '#888' },
	{ name: '--gray', value: '#999' },
	{ name: '--bone', value: '#f5f5fb' },
	{ name: '--white', value: '#fff' },
	{ name: '--lightOrange', value: '#ffd280' },
	{ name: '--lightRose', value: '#ffb1a3' },
	{ name: '--blue', value: '#5e81f4' },
	{ name: '--oceanLight', value: '#8095ff' },
	{ name: '--lightBlueGray', value: '#778dad' },
	{ name: '--blueGray', value: '#768492' },
	{ name: '--lightGray', value: '#8da1b5' },
	{ name: '--darkGray', value: '#272829' },
	{ name: '--oceanBright', value: '#8fc7ff' },
	{ name: '--darkOcean', value: '#011f3b' },
	{ name: '--moonOcean', value: '#011f3bcc' },
	{ name: '--lightPurple', value: '#9ba0fc' },
	{ name: '--lightOceanGray', value: '#83919e' },
	{ name: '--lightTeal', value: '#eef2fd' },
	{ name: '--brightTeal', value: '#dfe6fd' },
	{ name: '--teal', value: '#5e81f4' },
	{ name: '--ice', value: '#0cc3e7' },
	{ name: '--lightIce', value: '#d5f5fb' },
	{ name: '--cold', value: '#d3f4fb' },
	{ name: '--soda', value: '#ffae33' },
	{ name: '--lightSoda', value: '#ffefd6' },
	{ name: '--brightSoda', value: '#ffe6e8' },
]

// COLORES INMUTABLES
const localDarkValue: string | null = window.localStorage.getItem('darkmode')
const baseColors: IColor[] = []

// PERMUTACIÓN DE COLORES
const colorPer: IColor[] = []

// RECORRER COLORES
primaryColors.forEach((pColor: IPColor) => {
	// RECORRER COLORES
	primaryColors.forEach((pSColor: IPColor) =>
		colorPer.push({
			name:
				pColor.name === pSColor.name
					? pColor.name
					: `${pColor.name}${toCamelCase(pSColor.name.substr(2))}`,
			value: pColor.value,
			darkValue: pSColor.value,
		}),
	)
})

// COLORES FINALES
const colors: IColor[] = baseColors.concat(colorPer)

const changeColor = (selectedColor: IColor, dark: boolean) => {
	// SELECCIONAR BODY
	const { body } = document

	// CAMBIAR PROPIEDAD
	body.style.setProperty(
		selectedColor.name,
		dark ? selectedColor.darkValue : selectedColor.value,
	)
}

const setEachColors = (darkValue: boolean): void =>
	colors.forEach((color: IColor) => changeColor(color, darkValue))

/**
 * Cambiar estado de darkmode
 */
const toggleDarkMode = (): void => {
	// LEER VARIABLE GLOBAL
	const darkValue: boolean = window.localStorage.getItem('darkmode') === '1'
	window.localStorage.setItem('darkmode', darkValue ? '0' : '1')

	// RECORRER CAMBIOS
	setEachColors(!darkValue)
}

// ACTIVAR
if (!localDarkValue) {
	window.localStorage.setItem('darkmode', '1')
	toggleDarkMode()
} else setEachColors(localDarkValue === '1')
