// CONFIGURACIÓN
const BAR_MARGIN: number = 10
const BAR_WIDTH: number = 5
const BAR_HEIGHT: number = 300
canvasBannerDif = 25

// GLOBALES
let globalSortData: number[] = [
	4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
]
let globalCopySortData: number[] = [...globalSortData]
let globalSortLength: number = globalSortData.length
let sortBarWidth: number = (BAR_WIDTH / globalSortLength) * 100
let maxSortDataValue: number = Math.max(...globalSortData)
let sortBarHeight: number = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)
let fontSize: number = 20

// ELEMENTOS
const codeDataArray = document.getElementById('code-data-array')
const sortStepText = document.getElementById('sort-step-text')
const sortPerformance = document.getElementById('sort-performance')

// METODO DE SORT
let sortMethod: (
	data: number[],
	stepCallback?: (newSortData: number[], step: number) => unknown,
) => unknown = () => null

// CARDAR JSON
fileUploadCallback = (json: JSONInputFile) => {
	// ASIGNAR VARIABLES GLOBALES
	const valores = json.valores as number[]
	globalCopySortData = valores
	globalSortData = valores
	globalSortLength = valores.length
	sortBarWidth = (BAR_WIDTH / valores.length) * 100
	maxSortDataValue = Math.max(...valores)
	sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)

	// TAMAÑOS DE FUENTE
	if (globalSortLength > 0 && globalSortLength <= 10) fontSize = 25
	else if (globalSortLength > 15 && globalSortLength <= 30) fontSize = 17
	else if (globalSortLength > 30 && globalSortLength <= 50) fontSize = 13
	else fontSize = 10

	// CAMBIAR MUESTRA DE CÓDIGO
	if (sortLengthText) sortLengthText.textContent = globalSortLength.toString()
	if (codeDataArray) codeDataArray.textContent = valores.join(', ')
	if (sortStepText) sortStepText.textContent = '0'
	if (sortPerformance) sortPerformance.textContent = '0%'

	// ESTILOS Y TEXTOS
	removeBanner()
	setSortRuntime()
}

// CALLBACK PARA DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		// LIMPIAR
		canvasCtx.clearRect(0, 0, width, height)

		// DIBUJAR BARRAS
		for (let barIndex: number = 0; barIndex < globalSortLength; barIndex++) {
			// COLOR
			canvasCtx.fillStyle =
				canvasObjectColors[
					barIndex > canvasObjectColors.length - 1
						? barIndex -
						  canvasObjectColors.length *
								Math.floor(barIndex / canvasObjectColors.length)
						: barIndex
				]

			// BARRA
			const rectX: number =
				sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20
			const rectY: number = -(sortBarHeight * globalSortData[barIndex]) + 138
			const rectH: number = sortBarHeight * globalSortData[barIndex]

			canvasCtx.fillRect(rectX, rectY, sortBarWidth, rectH)

			// TEXTO
			canvasCtx.fillStyle = '#fff'
			canvasCtx.font = `bold ${fontSize}px Montserrat`
			canvasCtx.textAlign = 'center'
			canvasCtx.textBaseline = 'middle'
			canvasCtx.fillText(
				globalSortData[barIndex].toString(),
				rectX + sortBarWidth / 2,
				160,
			)
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

setSortRuntime()
