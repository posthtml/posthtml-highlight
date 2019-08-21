interface PostHTMLAbstractSyntaxTreeCallback {
  (node: PostHTMLAbstractSyntaxTree): void
}

type PostHTMLAbstractSyntaxTreeExpression =
  | string
  | RegExp
  | {
      tag: string
    }

interface PostHTMLAbstractSyntaxTree {
  tag: string
  attrs: {
    [k: string]: string
  }
  content: (string | PostHTMLAbstractSyntaxTree)[]

  match(
    expression: PostHTMLAbstractSyntaxTreeExpression,
    cb: PostHTMLAbstractSyntaxTreeCallback
  ): void
}
