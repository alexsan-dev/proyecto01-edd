// GLOBAL
let linearStructure: LinearStructure | null = null
let simple: boolean = true
let linearStructureLength: number = 0

// TIPOS
type InsertMode = 'start' | 'end' | 'order'

// CONFIGURACIÓN GLOBAL
let insertMode: InsertMode = 'start'
let repeatValues: boolean = true
let newNodeValue: string = ''
let oldNodeValue: string = ''
canvasBannerDif = 135

// ELEMENTOS
const editor = document.querySelector('.editor > pre > code')
const navBtns = document.querySelectorAll('.nav-btn')

// DATOS INICIALES
const setLinearStructure = (
	newLinearStructure: LinearStructure | null,
	newSimple: boolean,
) => {
	linearStructure = newLinearStructure
	simple = newSimple

	if (linearStructure) {
		linearStructure.insertar(1)
		linearStructure.insertar(2)
		linearStructure.insertar(3)
		linearStructure.insertar(4)
		linearStructure.insertar(5)
	}
	linearStructureLength = linearStructure?.getTamaño() || 5
}

// DIBUJAR
CanvasRenderingContext2D.prototype.arrow = function (
	x: number,
	y: number,
	distance: number,
	width?: number,
	down?: boolean,
	left?: boolean,
	double?: boolean,
) {
	// FLECHA
	const lineWidth = width || 4
	this.lineWidth = lineWidth

	// CURVA
	this.moveTo(x, y)
	this.quadraticCurveTo(
		x + distance / 2,
		y + (distance / 2) * (down ? 1 : -1),
		x + distance,
		y,
	)
	this.strokeStyle = this.fillStyle
	this.stroke()

	// TRIANGULO
	if (!left || double) {
		this.beginPath()
		this.lineWidth = 1

		if (!down) {
			this.moveTo(x + distance - 5, y + 5)
			this.lineTo(x + distance + 5, y - 5)
			this.lineTo(x + distance + 5, y + 5)
		} else {
			this.moveTo(x + distance + 5, y + 5)
			this.lineTo(x + distance - 5, y - 5)
			this.lineTo(x + distance + 5, y - 5)
		}

		this.stroke()
		this.fill()
		this.closePath()
	}

	if (left || double) {
		this.beginPath()
		this.lineWidth = 1
		if (!down) {
			this.moveTo(x - 5, y - 5)
			this.lineTo(x + 5, y + 5)
			this.lineTo(x - 5, y + 5)
		} else {
			this.moveTo(x - 5, y + 5)
			this.lineTo(x + 5, y - 5)
			this.lineTo(x - 5, y - 5)
		}

		this.stroke()
		this.fill()
		this.closePath()
	}
}

// LEER ARCHIVO
fileUploadCallback = (json: any) => {
	console.log(json)
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		canvasCtx.globalCompositeOperation = 'destination-over'
		for (let nodeIndex = 0; nodeIndex < linearStructureLength; nodeIndex++) {
			// POSICIONES
			const nodeX: number = -579 + 150 * nodeIndex

			// CIRCULO
			canvasCtx.beginPath()
			canvasCtx.arc(nodeX, 0, 40, 0, 2 * Math.PI)

			// COLOR
			canvasCtx.fillStyle = '#aaa'
			canvasCtx.strokeStyle =
				canvasObjectColors[
					nodeIndex > canvasObjectColors.length - 1
						? nodeIndex -
						  canvasObjectColors.length *
								Math.floor(nodeIndex / canvasObjectColors.length)
						: nodeIndex
				]
			canvasCtx.lineWidth = 7
			canvasCtx.stroke()
			canvasCtx.fill()
			canvasCtx.closePath()

			// TEXTO
			if (linearStructure) {
				canvasCtx.font = 'bold 20px Montserrat'
				canvasCtx.textAlign = 'center'
				canvasCtx.fillText(
					linearStructure.obtener(nodeIndex).valor.toString(),
					nodeX,
					-50,
				)
			}

			// FLECHA NODO SIGUIENTE
			if (nodeIndex < linearStructureLength - 1) {
				canvasCtx.beginPath()
				canvasCtx.fillStyle = 'white'
				canvasCtx.arrow(nodeX + 5 + (simple ? 25 : 0), -1, simple ? 120 : 95, 4)
			}

			// FLECHA NODO ANTERIOR
			if (nodeIndex > 0 && !simple) {
				canvasCtx.beginPath()
				canvasCtx.fillStyle = 'white'
				canvasCtx.arrow(nodeX + 5 - 105, -1, 95, 4, true, true)
				canvasCtx.closePath()
			}
		}
	}
}

// GUARDAR VALORES DE NODOS
const saveNewNodeValue = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	newNodeValue = target.value
}

const saveOldNodeValue = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	oldNodeValue = target.value
}

// CAMBIAR OPCIÓN DE REPETIR VALORES
const changeRepeatValues = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	repeatValues = target.checked
}

// CAMBIAR MODO PARA INSERTAR
const changeInsertMode = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	insertMode = target.value as InsertMode
}

// AGREGAR CÓDIGO
const addTestCode = (method: string, value: string) => {
	if (editor)
		editor.innerHTML =
			editor.innerHTML +
			`\ndata.<strong style="color: var(--green)">${method}</strong>(<strong style="color: var(--lightPurple)">${value}</strong>)`
}

// AGREGAR NODO
const addNode = () => {
	if (linearStructure && newNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(newNodeValue)

		// INSERTAR
		if (repeatValues || (!repeatValues && nodeOnStructure === null)) {
			if (insertMode === 'start') linearStructure.push(newNodeValue)
			else if (insertMode === 'end') linearStructure.insertar(newNodeValue)
			// RE DIMENSION
			linearStructureLength = linearStructure.getTamaño()

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode(
				insertMode === 'start'
					? 'push'
					: insertMode === 'end'
					? 'insertar'
					: 'insertar',
				newNodeValue,
			)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// ELIMINAR NODO
const removeNode = () => {
	if (linearStructure && oldNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(oldNodeValue)

		if (nodeOnStructure !== null) {
			// ELIMINAR
			linearStructure.eliminar(oldNodeValue)

			// RE DIMENSION
			linearStructureLength = linearStructure.getTamaño()

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode('eliminar', oldNodeValue)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// ELIMINAR NODO
const findNode = () => {
	if (linearStructure && oldNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(oldNodeValue)

		if (nodeOnStructure !== null) {
			// ELIMINAR
			linearStructure.buscar(oldNodeValue)

			// RE DIMENSION
			linearStructureLength = linearStructure.getTamaño()

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode('buscar', oldNodeValue)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// ELIMINAR NODO
const updateNode = () => {
	if (linearStructure && newNodeValue.length > 0 && oldNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(oldNodeValue)
		const newNodeOnStructure: LinearNode | null =
			linearStructure.buscar(newNodeValue)

		if (
			nodeOnStructure !== null &&
			(repeatValues || (newNodeOnStructure === null && !repeatValues))
		) {
			// ELIMINAR
			linearStructure.actualizar(oldNodeValue, newNodeValue)

			// RE DIMENSION
			linearStructureLength = linearStructure.getTamaño()

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// EVENTOS DE ELEMENTOS
const inputsMenuSwitcher = Array.prototype.slice
	.call(navBtns)
	.map(
		(element: Element) =>
			element.previousElementSibling as HTMLInputElement | null,
	)
	.filter(Boolean) as HTMLInputElement[]

// OCULTAR TODOS
navBtns.forEach((navElement: Element, navIndex: number) =>
	navElement.addEventListener('click', () =>
		inputsMenuSwitcher.forEach(
			(inputElement: HTMLInputElement, inpIndex: number) => {
				if (navIndex !== inpIndex) inputElement.checked = false
			},
		),
	),
)

// OCULTAR MANUALMENTE
const hideNavMenu = (index: number) => {
	inputsMenuSwitcher.forEach(
		(inputElement: HTMLInputElement, inpIndex: number) => {
			if (index === inpIndex) inputElement.checked = false
		},
	)
}
