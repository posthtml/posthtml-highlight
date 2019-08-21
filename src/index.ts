import * as hljs from 'highlight.js'

export type Options = hljs.IOptions & {
  inline?: boolean
}

export default function createHighlightPlugin(
  config: Options = {}
): (tree: PostHTMLAbstractSyntaxTree) => void {
  return function highlightPlugin(tree: PostHTMLAbstractSyntaxTree): void {
    const highlightCodeTags = (node: PostHTMLAbstractSyntaxTree): void =>
      tree.match.call(node, { tag: 'code' }, highlightNode)
    hljs.configure(config)
    if (config.inline) {
      highlightCodeTags(tree)
    } else {
      tree.match({ tag: 'pre' }, highlightCodeTags)
    }
  }
}

function highlightNode(
  node: PostHTMLAbstractSyntaxTree
): PostHTMLAbstractSyntaxTree {
  const attrs = node.attrs || {}
  const classList = `${attrs.class || ''} hljs`.trimLeft()
  if (classList.indexOf('nohighlight') > -1) return node
  const lang = getExplicitLanguage(classList)
  attrs.class = classList
  node.attrs = attrs
  node.content = node.content.map((c): string | PostHTMLAbstractSyntaxTree =>
    mapContentOrNode(c, lang)
  )
  return node
}

function getExplicitLanguage(classList: string): string | undefined {
  const matches = classList.match(/(?:lang|language)-(\w*)/)
  return matches === null ? void 0 : matches[1]
}

function mapContentOrNode(
  contentOrNode: string | PostHTMLAbstractSyntaxTree,
  lang?: string
): string | PostHTMLAbstractSyntaxTree {
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
