import hljs, { HLJSOptions } from 'highlight.js'
import { Node } from 'posthtml'

export type Options = Partial<HLJSOptions> & {
  inline?: boolean
}

export default function createHighlightPlugin(
  config: Options = {}
): (tree: Node) => void {
  return function highlightPlugin(tree: Node): void {
    const highlightCodeTags = (node: Node): Node[] =>
      tree.match.call(node, { tag: 'code' }, highlightNode)

    hljs.configure(config)

    if (config.inline) {
      highlightCodeTags(tree)
    } else {
      tree.match({ tag: 'pre' }, highlightCodeTags)
    }
  }
}

function highlightNode(node: Node): Node {
  const attrs = node.attrs || {}
  const classList = `${attrs.class || ''} hljs`.trimLeft()
  if (classList.includes('nohighlight')) return node
  const lang = getExplicitLanguage(classList)
  attrs.class = classList
  node.attrs = attrs
  if (node.content) {
    node.content = node.content.map((c) => mapContentOrNode(c, lang))
  }
  return node
}

function getExplicitLanguage(classList: string): string | undefined {
  const matches = /(?:lang|language)-(\w*)/.exec(classList)
  return matches === null ? void 0 : matches[1]
}

function mapContentOrNode(
  contentOrNode: string | Node,
  lang?: string
): string | Node {
  if (typeof contentOrNode === 'string') {
    if (lang) {
      return hljs.highlight(contentOrNode, { language: lang }).value
    } else {
      return hljs.highlightAuto(contentOrNode).value
    }
  } else {
    highlightNode(contentOrNode)
    return contentOrNode
  }
}
