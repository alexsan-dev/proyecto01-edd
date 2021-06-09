// GLOBAL
let linearStructure: LinearStructure | null = null

// DATOS INICIALES
const setLinearStructure = (newLinearStructure: LinearStructure | null) => {
	linearStructure = newLinearStructure

	if (linearStructure) {
		linearStructure.insertar(1)
		linearStructure.insertar(2)
		linearStructure.insertar(3)
		linearStructure.insertar(4)
		linearStructure.insertar(5)
	}
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		canvasCtx.arc(-400, -75, 20, 0, 2 * Math.PI)
		canvasCtx.fill()
	}
}
