// ELEMENTOS
const sortRuntime = document.getElementById('sort-runtime')
const sortLengthText = document.getElementById('sort-length')

let canvasBannerDif: number = 20

// COLORES
const canvasObjectColors: string[] = [
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

// REINICIAR CANVAS
const resetCanvas = () => {
	if (canvasCtx) {
		isDragging = false
		initialPinchDistance = null
		cameraOffset = { x: width / 2, y: height / 2 }
		dragStart = { x: 0, y: 0 }
		cameraZoom = 1
		lastZoom = 1
	}
}

// CALLBACK AL SUBIR ARCHIVO
let fileUploadCallback: (json: any) => unknown = () => {}

const onChangeUploadInput = (ev: Event): void => {
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
		fileUploadCallback(json)
	}

	// LEER
	if (file) reader.readAsText(file)
}
