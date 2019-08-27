import * as hljs from 'highlight.js'

export const configure = jest.fn(hljs.configure)
export const highlight = jest.fn(hljs.highlight)
export const highlightAuto = jest.fn(hljs.highlightAuto)

export function mockClear(): void {
  configure.mockClear()
  highlight.mockClear()
  highlightAuto.mockClear()
}
