import * as hljs from 'highlight.js'
import { PostHTML } from 'posthtml'

export type Options = hljs.IOptions & {
  inline?: boolean
}

export default function createHighlightPlugin(
  config: Options = {}
): (tree: PostHTML.Node) => void {
  return function highlightPlugin(tree: PostHTML.Node): void {
    const highlightCodeTags = (node: PostHTML.Node): PostHTML.Node[] =>
      tree.match.call(node, { tag: 'code' }, highlightNode)
    hljs.configure(config)
    if (config.inline) {
      highlightCodeTags(tree)
    } else {
      tree.match({ tag: 'pre' }, highlightCodeTags)
    }
  }
}

function highlightNode(node: PostHTML.Node): PostHTML.Node {
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
  contentOrNode: string | PostHTML.Node,
  lang?: string
): string | PostHTML.Node {
  if (typeof contentOrNode === 'string') {
    if (lang) {
      return hljs.highlight(lang, contentOrNode).value
    } else {
      return hljs.highlightAuto(contentOrNode).value
    }
  } else {
    highlightNode(contentOrNode)
    return contentOrNode
  }
}
