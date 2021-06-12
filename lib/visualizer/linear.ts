// GLOBAL
let linearStructure: LinearStructure | null = null
let linearStructureLength: number = 0
let className: string = 'ListaSimple'
let isLikeStack: boolean = false
let isCircular: boolean = false
let isSimple: boolean = true

// TIPOS
type InsertMode = 'start' | 'end' | 'order'

// CONFIGURACIÓN GLOBAL
let insertMode: InsertMode = 'end'
let repeatValues: boolean = true
let newNodeValue: string = ''
let oldNodeValue: string = ''
canvasBannerDif = 110

// ELEMENTOS
const editor = document.querySelector('.editor > pre > code')
const navBtns = document.querySelectorAll('.nav-btn')

// DATOS INICIALES
const setLinearStructure = (
	newLinearStructure: LinearStructure | null,
	linearClassName: string,
	simple: boolean,
	circular: boolean = false,
	likeStack: boolean = false,
	insertModeType: InsertMode = 'end',
) => {
	// CONFIGURAR GLOBALES
	linearStructure = newLinearStructure
	className = linearClassName
	insertMode = insertModeType
	isLikeStack = likeStack
	isCircular = circular
	isSimple = simple

	// ELEMENTOS INICIALES
	if (linearStructure) {
		linearStructure.insertar(1)
		linearStructure.insertar(2)
		linearStructure.insertar(3)
		linearStructure.insertar(4)
		linearStructure.insertar(5)
	}

	// ACTUALIZAR TAMAÑO
	linearStructureLength = linearStructure?.getTamaño() || 5
}

// LEER ARCHIVO
fileUploadCallback = (json: JSONInputFile) => {
	const { valores } = json

	// BORRAR
	if (linearStructure)
		for (
			let linearIndex: number = 0;
			linearIndex < linearStructureLength;
			linearIndex++
		)
			linearStructure.pop()

	// TEXTOS
	linearStructureLength = 0
	if (editor)
		// @ts-ignore
		editor.innerHTML = `<strong style="color:var(--monoConstIce)">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong style="color:var(--monoClassIce)">${className}</strong><strong style="color:var(--gray)">&#x3c;</strong><strong style="color:var(--monoNumberIce)">number</strong><strong style="color:var(--gray)">&#x3e;</strong>()\n`

	// ITERAR
	valores.forEach((valor: string | number) => {
		newNodeValue = valor.toString()
		addNode()
	})

	// ELEMENTOS
	setElementsLength(linearStructure ? linearStructure.getTamaño() : 0)
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		canvasCtx.globalCompositeOperation = 'destination-over'
		for (let nodeIndex = 0; nodeIndex < linearStructureLength; nodeIndex++) {
			// POSICIONES EN X
			const nodeX: number = -579 + 150 * nodeIndex

			// NODO FINAL LISTA CIRCULAR
			if (isCircular && nodeIndex === 0 && !isSimple) {
				const nodeEndX = -530 + 150 * -1

				// CIRCULO
				canvasCtx.beginPath()
				canvasCtx.arc(nodeEndX, 0, 30, 0, 2 * Math.PI)

				// COLOR
				canvasCtx.save()
				canvasCtx.globalAlpha = 0.5
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee'
				canvasCtx.strokeStyle =
					canvasObjectColors[
						linearStructureLength + 2 > canvasObjectColors.length - 1
							? linearStructureLength +
							  2 -
							  canvasObjectColors.length *
									Math.floor(linearStructureLength / canvasObjectColors.length)
							: linearStructureLength + 2
					]
				canvasCtx.lineWidth = 7

				// DIBUJAR BORDE DE COLOR Y CIRCULO
				canvasCtx.stroke()
				canvasCtx.fill()
				canvasCtx.closePath()

				// VALOR DE NODO
				const nodeEndValue = linearStructure
					? linearStructure.obtener(linearStructureLength - 1).valor.toString()
					: ''

				// TEXTO
				if (linearStructure) {
					canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
					canvasCtx.font = `bold ${20 - nodeEndValue.length * 0.5}px Montserrat`
					canvasCtx.textAlign = 'center'
					canvasCtx.fillText(nodeEndValue, nodeEndX, -50)
				}

				// REINICIAR
				canvasCtx.restore()
			}

			// CIRCULO
			canvasCtx.beginPath()
			if (!isLikeStack) canvasCtx.arc(nodeX, 0, 40, 0, 2 * Math.PI)

			// COLOR
			canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee'
			canvasCtx.strokeStyle =
				canvasObjectColors[
					nodeIndex > canvasObjectColors.length - 1
						? nodeIndex -
						  canvasObjectColors.length *
								Math.floor(nodeIndex / canvasObjectColors.length)
						: nodeIndex
				]
			canvasCtx.lineWidth = 7

			// DIBUJAR BORDE Y CIRCULO
			if (!isLikeStack) {
				canvasCtx.stroke()
				canvasCtx.fill()
			}

			// DIBUJAR UN CUADRADO CON BORDES REDONDOS
			else {
				canvasCtx.beginPath()
				canvasCtx.roundRect(nodeX - nodeX / 3.5 - 200, -40, 80, 80, 10)
				canvasCtx.stroke()
				canvasCtx.closePath()
				canvasCtx.fillRect(nodeX - nodeX / 3.5 - 200, -40, 80, 80)
			}

			// CERRAR
			canvasCtx.closePath()

			// VALOR DE NODO
			const nodeValue = linearStructure
				? linearStructure.obtener(nodeIndex).valor.toString()
				: ''

			// TEXTO
			if (linearStructure) {
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
				canvasCtx.font = `bold ${20 - nodeValue.length * 0.5}px Montserrat`
				canvasCtx.textAlign = 'center'
				canvasCtx.fillText(
					nodeValue,
					isLikeStack ? nodeX - nodeX / 3.5 - 160 : nodeX,
					isLikeStack ? -55 : -50,
				)
			}

			// FLECHA NODO SIGUIENTE
			if (
				(nodeIndex < linearStructureLength - 1 ||
					(isCircular && nodeIndex === linearStructureLength - 1)) &&
				!isLikeStack
			) {
				// ES LA FLECHA CIRCULAR AL FINAL
				const isCircularEnd =
					isCircular && nodeIndex === linearStructureLength - 1

				// INICIAR
				canvasCtx.beginPath()
				if (isSimple || isCircular) {
					canvasCtx.save()

					// AUMENTAR TAMAÑO
					if (isSimple) {
						canvasCtx.scale(2, 2)
						canvasCtx.translate(225, 0)
					}

					// CAMBIAR OPACIDAD
					if (isCircularEnd) canvasCtx.globalAlpha = 0.5
				}

				// FLECHA
				canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb'
				canvasCtx.arrow(
					(isSimple ? nodeX / 2 : nodeX) + 5 + (isSimple ? -215 : 0),
					-1,
					isSimple ? (isCircularEnd ? 36 : 60) : 95,
					4,
				)

				// CERRAR Y REINICIAR
				canvasCtx.closePath()
				if (isSimple || isCircular) canvasCtx.restore()
			}

			// NODO FINAL LISTA CIRCULAR
			if (isCircular && nodeIndex === linearStructureLength - 1) {
				// CIRCULO
				const nodeRootX = -625 + 150 * (nodeIndex + 1)
				canvasCtx.beginPath()
				canvasCtx.arc(nodeRootX, 0, 30, 0, 2 * Math.PI)

				// COLOR
				canvasCtx.save()
				canvasCtx.globalAlpha = 0.5
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee'
				canvasCtx.strokeStyle =
					canvasObjectColors[
						nodeIndex + 1 > canvasObjectColors.length - 1
							? nodeIndex +
							  1 -
							  canvasObjectColors.length *
									Math.floor(nodeIndex / canvasObjectColors.length)
							: nodeIndex + 1
					]
				canvasCtx.lineWidth = 7

				// BORDE Y CIRCULO
				canvasCtx.stroke()
				canvasCtx.fill()
				canvasCtx.closePath()

				// VALOR DE NODO
				const nodeRootValue = linearStructure
					? linearStructure.obtener(0).valor.toString()
					: ''

				// TEXTO
				if (linearStructure) {
					canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
					canvasCtx.font = `bold ${
						20 - nodeRootValue.length * 0.5
					}px Montserrat`
					canvasCtx.textAlign = 'center'
					canvasCtx.fillText(nodeRootValue, nodeRootX, -50)
				}

				// REINICIAR
				canvasCtx.restore()
			}

			// FLECHA NODO ANTERIOR
			if (
				(nodeIndex > 0 && !isSimple) ||
				(isCircular && nodeIndex === 0 && !isSimple)
			) {
				if (!isSimple || isCircular) {
					canvasCtx.save()

					// CAMBIAR OPACIDAD PARA CIRCULARES
					if (isCircular && nodeIndex === 0) {
						canvasCtx.globalAlpha = 0.5

						// CAMBIAR TAMAÑO
						if (!isSimple) {
							canvasCtx.scale(0.8, 0.8)
							canvasCtx.translate(-170, 0)
						}
					}
				}

				// FLECHA
				canvasCtx.beginPath()
				canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb'
				canvasCtx.arrow(nodeX + 5 - 105, -1, 95, 4, true, true)
				canvasCtx.closePath()

				// REINICIAR
				if (!isSimple || isCircular) canvasCtx.restore()
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
			`\ndata.<strong style="color: var(--monoFuncGreen)">${method}</strong>(<strong style="color: var(--lightPurple)">${value}</strong>)`
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
			setElementsLength(linearStructureLength)

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
			setElementsLength(linearStructureLength)

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
			setElementsLength(linearStructureLength)

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
			setElementsLength(linearStructureLength)

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
