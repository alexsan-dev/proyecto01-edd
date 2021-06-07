const width = window.innerWidth
const height = window.innerHeight
const svg = d3
	.select('svg')
	.attr('width', `${width - 60}px`)
	.attr('height', `${height - 60 - 50}px`)

const resetted = () =>
	// @ts-ignore
	svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity)

const zoomed = () => {
	// @ts-ignore
	view.attr('transform', d3.event.transform)

	// @ts-ignore
	gX.call(xAxis.scale(d3.event.transform.rescaleX(x)))

	// @ts-ignore
	gY.call(yAxis.scale(d3.event.transform.rescaleY(y)))
}
const zoom = d3
	.zoom()
	.scaleExtent([1, 40])
	.translateExtent([
		[-100, -100],
		[width + 90, height + 100],
	])
	.on('zoom', zoomed)

const x = d3
	.scaleLinear()
	.domain([-1, width + 1])
	.range([-1, width + 1])

const y = d3
	.scaleLinear()
	.domain([-1, height + 1])
	.range([-1, height + 1])

const xAxis = d3
	.axisBottom(x)
	.ticks(((width + 2) / (height + 2)) * 10)
	.tickSize(height)
	.tickPadding(8 - height)
	// @ts-ignore
	.tickFormat('')

const yAxis = d3
	.axisRight(y)
	.ticks(10)
	.tickSize(width)
	.tickPadding(8 - width)

	// @ts-ignore
	.tickFormat('')

const view = svg
	.append('rect')
	.attr('class', 'view')
	.attr('x', 0.5)
	.attr('y', 0.5)
	.attr('width', width - 1)
	.attr('height', height - 1)

const gX = svg.append('g').attr('class', 'axis axis--x').call(xAxis)

const gY = svg.append('g').attr('class', 'axis axis--y').call(yAxis)

d3.select('.reset').on('click', resetted)
// @ts-ignore
svg.call(zoom)
