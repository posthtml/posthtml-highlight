import * as hljs from 'highlight.js'

export type Options = hljs.IOptions & {
  inline?: boolean
}

export default function createHighlightPlugin(config: Options = {}) {
  return function highlightPlugin(tree: any) {
    const highlightCodeTags = (node: any) => tree.match.call(node, { tag: 'code' }, highlightNode)
    hljs.configure(config)
    if (config.inline) {
      highlightCodeTags(tree)
    } else {
      tree.match({ tag: 'pre' }, highlightCodeTags)
    }
  }
}

function highlightNode(node: any) {
  if (!node.attrs) node.attrs = {}
  if (!node.attrs.class) node.attrs.class = ''
  if (node.attrs.class.indexOf('nohighlight') > -1) return node
  node.attrs.class = (node.attrs.class as string + ' hljs').trimLeft()
  if (hasExplicitLanguage(node)) {
    const lang = getExplicitLanguage(node)
    node.content = hljs.highlight(lang, node.content[0]).value
  } else {
    node.content = hljs.highlightAuto(node.content[0]).value
  }
  return node
}

function hasExplicitLanguage(node: any) {
  const classes: string = node.attrs.class
  return classes.indexOf('language-') > -1 || classes.indexOf('lang-') > -1
}

function getExplicitLanguage(node: any) {
  return node.attrs.class.match(/(?:lang|language)-(\w*)/)[1]
}
