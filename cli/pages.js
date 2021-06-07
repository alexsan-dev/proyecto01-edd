// FILE SYSTEM
const path = require('path')
const fs = require('fs')

// ARGUMENTOS
const args = process.argv
const pageName = args[2]

// ESCRIBIR ARCHIVO
const writeFile = (dirName, filename, content) => {
	fs.writeFile(
		path.resolve(`./${dirName}/pages/${pageName}/${filename}`),
		content,
		'utf-8',
		(err) => {
			if (err) console.log(err)
		},
	)
}

// ESCRIBIR CARPETA
const createDir = (dirName, cb) => {
	fs.mkdir(
		path.resolve(`./${dirName}/pages/${pageName}`),
		{ recursive: true },
		(err) => {
			if (err) console.log(err)
			else cb()
		},
	)
}

// CREAR PAGINA EN PUBLIC
fs.exists(path.resolve(`./public/pages/${pageName}/index.html`), (exists) => {
	if (!exists) {
		// ESCRIBIR CARPETA
		createDir('public', () => {
			writeFile(
				'public',
				'index.html',
				`<!DOCTYPE html>
<html lang="es">
    <head>
		<title>${pageName}</title>
		<meta name="description" content="Open source visualization of data structures and algorithms in JavaScript"/>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link href="styles.css" rel="stylesheet" />
        <link href="../../styles/global.css" rel="stylesheet" />
		<link href="../../icons/style.css" rel="stylesheet" />
		<link href="../../styles/normalize.css" rel="stylesheet" />
    </head>
	<body>
		<script src="https://d3js.org/d3.v5.min.js"></script>
		<script src="../../../scripts/utils/colors.js"></script>
        <script src="../../../scripts/pages/${pageName}/index.js"></script>
    </body>
</html>
            `,
			)
			writeFile('public', 'styles.css', '')
		})

		// ESCRIBIR TYPESCRIPT
		createDir('lib', () => {
			writeFile('lib', 'index.ts', '')
		})
	} else console.log('Esta pagina ya existe')
})
