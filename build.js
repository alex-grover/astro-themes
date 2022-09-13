import fs from 'fs/promises'

import { transform } from 'esbuild'
import ts from 'typescript'

import tsconfig from './tsconfig.json' assert { type: 'json' }

console.log('Building...')

console.log('Starting transpile and minify...')

const input = await fs.readFile('Themes.ts')

const snippet = await transform(input, {
  target: 'es6',
  format: 'esm',
  loader: 'ts',
  minify: true,
})

console.log('Starting type generation...')

let types
const host = ts.createCompilerHost(tsconfig.compilerOptions)
host.writeFile = (fileName, contents) => (types = contents)
ts.createProgram(['Themes.ts'], tsconfig.compilerOptions, host).emit()

console.log('Writing output file...')

const template = await fs.readFile('Themes.astro.template')

const output = template
  .toString()
  .replace('{types}', types.trim())
  .replace('{snippet}', snippet.code.trim())

await fs.mkdir('build', { recursive: true })
await fs.writeFile('build/Themes.astro', output)

console.log('Build complete!')
