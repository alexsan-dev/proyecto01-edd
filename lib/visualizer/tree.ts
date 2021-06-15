// GLOBALES
let treeStructure: ArbolBinario | null = null
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
		canvasCtx.translate(maxTreeHeight * -340, maxTreeHeight * -37.5)

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
					const isLeft: boolean = treeXIndex % 2 === 1

					// REINCIAR
					if (treeHeighIndex !== levelCounter) {
						canvasCtx.restore()
						canvasCtx.translate(Math.pow(2, treeHeighIndex) * 25, 0)
						canvasCtx.save()
						levelCounter = treeHeighIndex
					}

					// IZQUIERDO

					// COLOR
					canvasCtx.font = 'bold 18px Montserrat'
					canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#eee'
					canvasCtx.strokeStyle =
						canvasObjectColors[maxTreeHeight - treeHeighIndex]

					// POSICION
					canvasCtx.translate(Math.pow(2, treeHeighIndex) * 50, 0)

					// TEXTO
					if (node) {
						canvasCtx.fillText(
							node.valor,
							-50,
							(maxTreeHeight - treeHeighIndex) * 100,
						)
					}

					if (node) {
						// LINEA
						canvasCtx.beginPath()
						canvasCtx.lineWidth = 5

						if (isLeft) {
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
					}
				}
			}
		}
	}
}
