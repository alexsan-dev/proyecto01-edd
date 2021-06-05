// FILE SYSTEM
const path = require('path')
const fs = require('fs')

// ARGUMENTOS
const args = process.argv
const pageName = args[2]

// ESCRIBIR ARCHIVO
const writeFile = (dirName, ext, content) => {
	fs.writeFile(
		path.resolve(`./${dirName}/pages/${pageName}/index.${ext}`),
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
				'html',
				`<!DOCTYPE html>
<html lang="es">
    <head>
        <title>${pageName}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link href="./styles/index.css" rel="stylesheet" />
		<link href="../../icons/lineicons.css" rel="stylesheet" />
		<link href="../../styles/normalize.css" rel="stylesheet" />
    </head>
    <body>
        <script src="../../../scripts/pages/${pageName}/index.js"></script>
    </body>
</html>
            `,
			)
		})

		// ESCRIBIR TYPESCRIPT
		createDir('lib', () => {
			writeFile('lib', 'ts', '')
		})
	} else console.log('Esta pagina ya existe')
})
