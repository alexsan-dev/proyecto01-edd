// CONFIGURACIÓN
const BAR_MARGIN: number = 10
const BAR_WIDTH: number = 5
const BAR_HEIGHT: number = 300
let VELOCITY: number = 200

// GLOBALES
let runningSortAnimation: boolean = false
let globalSortData: number[] = [
	4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
]
let globalCopySortData: number[] = [...globalSortData]
let globalSortLength: number = globalSortData.length
let sortBarWidth: number = (BAR_WIDTH / globalSortLength) * 100
let maxSortDataValue: number = Math.max(...globalSortData)
let sortBarHeight: number = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)

// COLORES
const barColors: string[] = [
	'#ffd280',
	'#ffb1a3',
	'#5e81f4',
	'#8fc7ff',
	'#9ba0fc',
	'#5e81f4',
	'#ffae33',
]

// CARDAR JSON
const onChangeSortLoad = (ev: Event): void => {
	// INPUT
	const input = ev.target as HTMLInputElement
	const file = input.files ? input.files[0] : null

	// READER
	const reader = new FileReader()
	reader.onload = () => {
		const text = reader.result
		const json = JSON.parse(
			typeof text === 'string' ? text : '{}',
		) as JSONSortFile
		globalCopySortData = json.data
		globalSortData = json.data
		globalSortLength = json.data.length
		sortBarWidth = (BAR_WIDTH / json.data.length) * 100
		maxSortDataValue = Math.max(...json.data)
		sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)
	}

	// LEER
	if (file) reader.readAsText(file)
}

// CALLBACK PARA DIBUJAR
const drawInCanvas: () => unknown = () => {
	if (canvasCtx) {
		// LIMPIAR
		canvasCtx.clearRect(0, 0, width, height)

		// DIBUJAR BARRAS
		for (let barIndex: number = 0; barIndex < globalSortLength; barIndex++) {
			canvasCtx.fillStyle =
				barColors[
					barIndex > barColors.length - 1
						? barIndex -
						  barColors.length * Math.floor(barIndex / barColors.length)
						: barIndex
				]
			canvasCtx.fillRect(
				sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20,
				-(sortBarHeight * globalSortData[barIndex]) + 150,
				sortBarWidth,
				sortBarHeight * globalSortData[barIndex],
			)
		}
	}
}

// INICIAR ORDENAMIENTO
const startSorting = (
	sortMethod: (
		data: number[],
		stepCallback: (newSortData: number[], step: number) => unknown,
	) => unknown,
) => {
	// ORDENAMIENTO
	sortMethod(globalSortData, (newSortData: number[], step: number) => {
		// COPIAR DATOS
		let tmpSortData = [...newSortData]

		// ANIMAR
		runningSortAnimation = true
		setTimeout(() => {
			globalSortData = tmpSortData
		}, step * VELOCITY)
	})
}

// REINICIAR DATOS
const restartSortedData = () => {
	resetCanvas()
	globalSortData = globalCopySortData
}

// CAMBIAR VELOCIDAD
const onChangeSortVelocity = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	console.log(+target.value)
	VELOCITY = +target.value
}
