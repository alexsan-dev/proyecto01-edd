// TIPOS
type ScreenEvent = MouseEvent & TouchEvent
interface CanvasCoords {
	x: number
	y: number
}

// CANVAS
let canvas: HTMLCanvasElement = document.getElementById(
	'canvas',
) as HTMLCanvasElement
let canvasCtx: CanvasRenderingContext2D | null = canvas.getContext('2d')

// CONFIG
const width: number = window.innerWidth - 60
const height: number = window.innerHeight - 160
let cameraOffset: CanvasCoords = {
	x: width / 2,
	y: height / 2,
}
let cameraZoom: number = 1
let MAX_ZOOM: number = 5
let MIN_ZOOM: number = 0.1
let SCROLL_SENSITIVITY: number = 0.003

// RUNTIME
let isDragging: boolean = false
let dragStart: CanvasCoords = { x: 0, y: 0 }
let initialPinchDistance: number | null = null
let lastZoom: number = cameraZoom

// METODOS
let drawInCanvas: () => unknown = () => {}

// DIBUJAR
const draw = (): void => {
	// PROPIEDADES INICIALES
	canvas.width = width
	canvas.height = height

	if (canvasCtx) {
		// CENTRAR ANTES DE HACER ZOOM
		canvasCtx.translate(width / 2, height / 2)
		canvasCtx.scale(cameraZoom, cameraZoom)
		canvasCtx.translate(
			-width / 2 + cameraOffset.x,
			-height / 2 + cameraOffset.y,
		)

		// DIBUJAR
		drawInCanvas()

		// ANIMACIÓN
		requestAnimationFrame(draw)
	}
}

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

// OBTENER POSICIÓN DE PUNTERO O TOQUE
const getEventLocation = (event: ScreenEvent): CanvasCoords => {
	if (event.touches && event.touches.length == 1) {
		return { x: event.touches[0].clientX, y: event.touches[0].clientY }
	} else if (event.clientX && event.clientY) {
		return { x: event.clientX, y: event.clientY }
	} else return { x: 0, y: 0 }
}

// EVENTO AL PASAR MOUSE O TOQUE
const onCanvasPointerDown = (event: ScreenEvent): void => {
	isDragging = true
	dragStart.x = getEventLocation(event).x / cameraZoom - cameraOffset.x
	dragStart.y = getEventLocation(event).y / cameraZoom - cameraOffset.y
}

// EVENTO AL SEPARAR MOUSE O TOQUE
const onCanvasPointerUp = (_event?: MouseEvent | TouchEvent): void => {
	isDragging = false
	initialPinchDistance = null
	lastZoom = cameraZoom
}

// MOVER MOUSE O TOQUE
const onCanvasPointerMove = (event: ScreenEvent): void => {
	if (isDragging) {
		cameraOffset.x = getEventLocation(event).x / cameraZoom - dragStart.x
		cameraOffset.y = getEventLocation(event).y / cameraZoom - dragStart.y
	}
}

// EVENTOS TOUCH
const handleCanvasTouch = (
	event: ScreenEvent,
	singleTouchHandler: (event: ScreenEvent) => unknown,
): void => {
	if (event.touches.length == 1) singleTouchHandler(event)
	else if (event.type == 'touchmove' && event.touches.length == 2) {
		isDragging = false
		handleCanvasPinch(event)
	}
}

// ZOOM IN
const handleCanvasPinch = (event: TouchEvent): void => {
	// DISTANCIAS
	event.preventDefault()
	let touch1: CanvasCoords = {
		x: event.touches[0].clientX,
		y: event.touches[0].clientY,
	}
	let touch2: CanvasCoords = {
		x: event.touches[1].clientX,
		y: event.touches[1].clientY,
	}

	// CUADRADO DE LA DISTANCIA
	let currentDistance: number =
		(touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2

	// ALEJAR ZOOM
	if (initialPinchDistance == null) initialPinchDistance = currentDistance
	else adjustCanvasZoom(null, currentDistance / initialPinchDistance)
}

// AJUSTAR ZOOM ALEJAR/ACERCAR
const adjustCanvasZoom = (
	zoomAmount: number | null,
	zoomFactor?: number,
): void => {
	if (!isDragging) {
		// FACTOR DE ZOOM
		if (zoomAmount) cameraZoom += zoomAmount
		else if (zoomFactor) cameraZoom = zoomFactor * lastZoom

		// ASIGNAR ZOOM TOTAL
		cameraZoom = Math.min(cameraZoom, MAX_ZOOM)
		cameraZoom = Math.max(cameraZoom, MIN_ZOOM)
	}
}

// AGREGAR EVENTOS AL CANVAS
canvas.addEventListener('mousedown', (event: MouseEvent) =>
	onCanvasPointerDown(event as ScreenEvent),
)
canvas.addEventListener('touchstart', (event: TouchEvent) =>
	handleCanvasTouch(event as ScreenEvent, onCanvasPointerDown),
)
canvas.addEventListener('mouseup', onCanvasPointerUp)
canvas.addEventListener('touchend', (event: TouchEvent) =>
	handleCanvasTouch(event as ScreenEvent, onCanvasPointerUp),
)
canvas.addEventListener('mousemove', (event: MouseEvent) =>
	onCanvasPointerMove(event as ScreenEvent),
)
canvas.addEventListener('touchmove', (event: TouchEvent) =>
	handleCanvasTouch(event as ScreenEvent, onCanvasPointerMove),
)
canvas.addEventListener('wheel', (event: WheelEvent) =>
	adjustCanvasZoom(event.deltaY * SCROLL_SENSITIVITY),
)

// INICIAR
draw()
