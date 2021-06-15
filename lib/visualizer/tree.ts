// GLOBALES
let treeStructure: ArbolBinario | null = null
let treeElementsLength: number = 7
let maxTreeHeight: number = 0

// DATOS INICIALES
const setTreeStructure = (newTreeStructure: ArbolBinario | null) => {
	// CONFIGURAR GLOBALES
	treeStructure = newTreeStructure

	// ELEMENTOS INICIALES
	if (treeStructure) {
		treeStructure.insertar(1)
		treeStructure.insertar(2)
		treeStructure.insertar(3)
		treeStructure.insertar(4)

		treeStructure.insertar(5)
		treeStructure.insertar(6)
		treeStructure.insertar(7)

		maxTreeHeight = treeStructure.raiz.altura
	}
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		canvasCtx.translate(maxTreeHeight * -340, maxTreeHeight * -41)

		if (treeStructure) {
			const queue: (NodoAvl | null)[] = [treeStructure.raiz]
			let levelCounter: number = 0

			for (
				let treeHeighIndex: number = maxTreeHeight;
				treeHeighIndex > 0;
				treeHeighIndex--
			) {
				for (
					let treeXIndex: number = 0;
					treeXIndex < Math.pow(2, maxTreeHeight - treeHeighIndex);
					treeXIndex++
				) {
					// NODO
					const node = queue.shift()
					queue.push(node?.izquierdo || null)
					queue.push(node?.derecho || null)

					// IZQUIERDO O DERECHO
					const isRight: boolean = treeXIndex % 2 === 1

					// REINCIAR
					if (treeHeighIndex !== levelCounter) {
						canvasCtx.restore()
						canvasCtx.translate(Math.pow(2, treeHeighIndex) * 25, 0)
						canvasCtx.save()
						levelCounter = treeHeighIndex
					}

					// COLOR
					canvasCtx.strokeStyle =
						canvasObjectColors[maxTreeHeight - treeHeighIndex]

					// POSICIÓN
					canvasCtx.translate(Math.pow(2, treeHeighIndex) * 50, 0)

					if (node) {
						// LINEA
						canvasCtx.beginPath()
						canvasCtx.lineWidth = 5

						if (isRight) {
							canvasCtx.moveTo(0, (maxTreeHeight - treeHeighIndex) * 100)
							canvasCtx.lineTo(
								Math.pow(2, treeHeighIndex) * -25 + 10,
								(maxTreeHeight - treeHeighIndex) * 100 - 75,
							)
						} else if (treeHeighIndex !== maxTreeHeight) {
							canvasCtx.moveTo(0, (maxTreeHeight - treeHeighIndex) * 100)
							canvasCtx.lineTo(
								Math.pow(2, treeHeighIndex) * 25 - 10,
								(maxTreeHeight - treeHeighIndex) * 100 - 75,
							)
						}

						canvasCtx.stroke()
						canvasCtx.closePath()

						// CIRCULO
						canvasCtx.beginPath()

						canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
						canvasCtx.lineWidth = 7

						canvasCtx.arc(
							0,
							(maxTreeHeight - treeHeighIndex) * 100,
							25,
							0,
							2 * Math.PI,
						)
						// DIBUJAR BORDE Y CIRCULO
						canvasCtx.stroke()
						canvasCtx.fill()
						canvasCtx.closePath()

						canvasCtx.beginPath()
						canvasCtx.textAlign = 'center'
						canvasCtx.textBaseline = 'middle'
						canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
						canvasCtx.font = `bold ${
							20 - node.valor.toString().length * 2.5
						}px Montserrat`

						// TEXTO
						canvasCtx.fillText(
							node.valor,
							treeHeighIndex > 1 ? 50 * (isRight ? 1 : -1) : 0,
							(maxTreeHeight - treeHeighIndex) * 100 +
								(treeHeighIndex > 1 ? 0 : 50),
						)

						canvasCtx.closePath()
					}
				}
			}
		}
	}
}

// AGREGAR NODO
const addNodeOnTree = () => {
	if (treeStructure && newNodeValue.length > 0) {
		// INSERTAR
		treeStructure.insertar(newNodeValue)
		maxTreeHeight = treeStructure.raiz.altura

		// RE DIMENSION
		setElementsLength(treeElementsLength + 1)

		// AGREGAR MUESTRA DE CÓDIGO
		addTestCode('insertar', newNodeValue)

		// OCULTAR MENU
		hideNavMenu(1)
		removeBanner()
	}
}

// ELIMINAR NODO
const removeNodeOnTree = () => {
	if (treeStructure && oldNodeValue.length > 0) {
		// INSERTAR
		treeStructure.eliminar(oldNodeValue)
		maxTreeHeight = treeStructure.raiz.altura

		// RE DIMENSION
		setElementsLength(treeElementsLength - 1)

		// AGREGAR MUESTRA DE CÓDIGO
		addTestCode('eliminar', oldNodeValue)

		// OCULTAR MENU
		hideNavMenu(1)
		removeBanner()
	}
}

// ACTUALIZAR NODO
const updateNodeOnTree = () => {
	if (treeStructure && oldNodeValue.length > 0 && newNodeValue.length > 0) {
		// INSERTAR
		treeStructure.actualizar(oldNodeValue, newNodeValue)
		maxTreeHeight = treeStructure.raiz.altura

		// AGREGAR MUESTRA DE CÓDIGO
		addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)

		// OCULTAR MENU
		hideNavMenu(1)
		removeBanner()
	}
}
