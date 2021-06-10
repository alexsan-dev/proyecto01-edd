// GLOBAL
let linearStructure: LinearStructure | null = null
let simple: boolean = true
let linearStructureLength: number = 0
canvasBannerDif = 20

// DATOS INICIALES
const setLinearStructure = (
	newLinearStructure: LinearStructure | null,
	newSimple: boolean,
) => {
	linearStructure = newLinearStructure
	linearStructureLength = 5
	simple = newSimple

	if (linearStructure) {
		linearStructure.insertar(1)
		linearStructure.insertar(2)
		linearStructure.insertar(3)
		linearStructure.insertar(4)
		linearStructure.insertar(5)
	}
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
				canvasCtx.arrow(
					nodeX + 5 + (simple ? 25 : 0),
					-1,
					simple ? 120 : 95,
					simple ? 5 : 4,
				)
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
