// CONFIGURACIÓN
const BAR_MARGIN: number = 10
const BAR_WIDTH: number = 5
const BAR_HEIGHT: number = 300
let VELOCITY: number = 200

// GLOBALES
let globalSortData: number[] = [
	4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
]
let globalCopySortData: number[] = [...globalSortData]
let globalSortLength: number = globalSortData.length
let sortBarWidth: number = (BAR_WIDTH / globalSortLength) * 100
let maxSortDataValue: number = Math.max(...globalSortData)
let sortBarHeight: number = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)

// ELEMENTOS
const codeDataArray = document.getElementById('code-data-array')
const sortStepText = document.getElementById('sort-step-text')
const sortRuntime = document.getElementById('sort-runtime')
const sortPerformance = document.getElementById('sort-performance')
const sortLengthText = document.getElementById('sort-length')

// METODO DE SORT
let sortMethod: (
	data: number[],
	stepCallback?: (newSortData: number[], step: number) => unknown,
) => unknown = () => null

// COLORES
const barColors: string[] = [
	'#F44336',
	'#E91E63',
	'#9C27B0',
	'#673AB7',
	'#3F51B5',
	'#2196F3',
	'#009688',
	'#4CAF50',
	'#CDDC39',
	'#FFC107',
	'#FF5722',
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

		// ASIGNAR VARIABLES GLOBALES
		globalCopySortData = json.data
		globalSortData = json.data
		globalSortLength = json.data.length
		sortBarWidth = (BAR_WIDTH / json.data.length) * 100
		maxSortDataValue = Math.max(...json.data)
		sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)

		// CAMBIAR MUESTRA DE CÓDIGO
		if (sortLengthText) sortLengthText.textContent = globalSortLength.toString()
		if (codeDataArray) codeDataArray.textContent = json.data.join(', ')
		if (sortStepText) sortStepText.textContent = '0'
		if (sortPerformance) sortPerformance.textContent = '0%'
		setSortRuntime()
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
			// COLOR
			canvasCtx.fillStyle =
				barColors[
					barIndex > barColors.length - 1
						? barIndex -
						  barColors.length * Math.floor(barIndex / barColors.length)
						: barIndex
				]

			// BARRA
			canvasCtx.fillRect(
				sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20,
				-(sortBarHeight * globalSortData[barIndex]) + 150,
				sortBarWidth,
				sortBarHeight * globalSortData[barIndex],
			)

			// TEXTO
		}
	}
}

// INICIAR ORDENAMIENTO
const startSorting = () => {
	// ORDENAMIENTO
	sortMethod(globalSortData, (newSortData: number[], step: number) => {
		// COPIAR DATOS
		let tmpSortData = [...newSortData]

		// ANIMAR
		setTimeout(() => {
			globalSortData = tmpSortData
			if (sortStepText) sortStepText.textContent = step.toString()
			if (sortPerformance)
				sortPerformance.textContent = `${(
					(globalSortLength / step) *
					100
				).toFixed(2)}%`
		}, step * VELOCITY)
	})
}

// TIEMPO DE EJECUCION
const setSortRuntime = () => {
	// CALCULAR TIEMPO
	const t0 = performance.now()
	sortMethod(globalSortData)
	const tf = performance.now()

	// MOSTRAR
	if (sortRuntime) sortRuntime.textContent = `${(tf - t0).toFixed(3)}ms`
}

// REINICIAR DATOS
const restartSortedData = () => {
	resetCanvas()
	globalSortData = globalCopySortData
}

// CAMBIAR VELOCIDAD
const onChangeSortVelocity = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	VELOCITY = 850 - +target.value
}

// INICIAR A ORDENAR
setSortRuntime()
