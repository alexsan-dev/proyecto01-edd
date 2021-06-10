interface JSONSortFile {
	data: number[]
}

type LinearStructure = ListaSimple

interface CanvasRenderingContext2D {
	arrow: (
		x: number,
		y: number,
		distance: number,
		width?: number,
		down?: boolean,
		left?: boolean,
		double?: boolean,
	) => void
}
