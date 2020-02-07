import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

import * as hljs from 'highlight.js'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import posthtml from 'posthtml'

import plugin from '../src'

const readFile = promisify(fs.readFile)
const fixtures = path.join(__dirname, '__fixtures__')

beforeEach(() => ((hljs as unknown) as jest.Mock).mockClear())

test('basic', createFixtureTest('basic'))
test('nested', createFixtureTest('nested'))
test(
  'does not highlight tags with `nohighlight` class',
  createFixtureTest('nohighlight')
)
test('appends hljs to existing class list', createFixtureTest('existingClass'))

test('configures highlight.js with supplied configuration', async () => {
  const source = '<pre><code>// ambiguous</code></pre>'
  const config = { useBR: true }

  await posthtml([plugin(config)]).process(source)

  expect(hljs.configure).lastCalledWith(config)
})

test('only highlights inline code blocks if options.inline', async () => {
  const source = '<code>// ambiguous</code>'

  await posthtml([plugin()]).process(source)
  await posthtml([plugin({ inline: true })]).process(source)

  expect(hljs.highlightAuto).toHaveBeenCalledTimes(1)
})

test('uses with language specified via language-*', async () => {
  const source =
    '<pre><code class="language-javascript">// ambiguous</code></pre>'

  await posthtml([plugin()]).process(source)

  expect(hljs.highlight).lastCalledWith('javascript', '// ambiguous')
})

test('uses with language specified via lang-*', async () => {
  const source = '<pre><code class="lang-typescript">// ambiguous</code></pre>'

  await posthtml([plugin()]).process(source)

  expect(hljs.highlight).lastCalledWith('typescript', '// ambiguous')
})

function createFixtureTest(name: string) {
  return async () => {
    const source = await readFile(path.join(fixtures, `${name}.html`), 'utf8')
    const [expected, { html: actual }] = await Promise.all([
      readFile(path.join(fixtures, `${name}.expected.html`), 'utf8'),
      posthtml([plugin()]).process(source)
    ])

    expect(actual).toBe(expected)
  }
}
