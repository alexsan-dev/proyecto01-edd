// GLOBALES
let treeStructure: ArbolBinario | null = null

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
	}
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
	}
}
