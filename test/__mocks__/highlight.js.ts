import hljs from 'highlight.js'

const configure = jest.fn(hljs.configure)
const highlight = jest.fn(hljs.highlight)
const highlightAuto = jest.fn(hljs.highlightAuto)

function mockClear(): void {
  configure.mockClear()
  highlight.mockClear()
  highlightAuto.mockClear()
}

export default {
  configure,
  highlight,
  highlightAuto,
  mockClear,
}
