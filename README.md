# PostHTML Highlight Plugin <img align="right" width="220" height="200" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![Version][npm-version-shield]][npm]
[![License][wtfpl-shield]][wtfpl]
[![TypeScript][typescript-shield]][typescript]
[![Build][travis-ci-shield]][travis-ci]
[![Coverage][codecov-shield]][codecov]
[![Dependency Status][david-dm-shield]][david-dm]
[![Greenkeeper][greenkeeper-shield]][greenkeeper]
[![Downloads][npm-stats-shield]][npm-stats]
[![Chat][gitter-shield]][gitter]

Compile-time syntax highlighting for code blocks via [highlight.js][]

Before:
``` html
<pre><code>
  const foo = 'foo'
  console.log(foo)
</code></pre>
```

After:
``` html
<pre><code class="hljs">
  <span class="hljs-keyword">const</span> foo = <span class="hljs-string">'foo'</span>
  console.<span class="hljs-built_in">log</span>(foo)
</code></pre>
```

## Install

```
$ yarn add -D posthtml posthtml-highlight
```
_or_
```
$ npm i posthtml posthtml-highlight
```

If using TypeScript, additionally install `@types/highlight.js`

## Usage

``` js
const fs = require('fs')
const posthtml = require('posthtml')
const highlight = require('posthtml-highlight')

const source = fs.readFileSync('./before.html')

posthtml([
  highlight(/* optional */ {
    /**
     * By default, only code tags wrapped in pre tags are highlighted (i.e. <pre><code><code/><pre/>)
     * 
     * Set `inline: true` to highlight all code tags
     */
    inline: true,

    /**
     * You may also pass any highlight.js options (http://highlightjs.readthedocs.io/en/latest/api.html#configure-options)
     */
    useBR: true
  })
])
  .process(source)
  .then((result) => fs.writeFileSync('./after.html', result.html))
```

### Styling

You will also need to include a highlight.js stylesheet

View the available color schemes [here](https://highlightjs.org/static/demo/), then  
a) include via a [CDN](https://cdnjs.com/libraries/highlight.js)  
b) install via npm (`yarn add -D highlight.js`, `./node_modules/highlight.js/styles/*`)  
c) download via the [highlight.js repo](https://github.com/isagalaev/highlight.js/tree/master/src/styles)

### Specifying a language

Specifying a language as per [highlight.js's usage docs][] is supported, with the caveat that you must use the `lang-*` or `language-*` prefix

### Skip highlighting on a node

Add the `nohighlight` class as per [highlight.js's usage docs][]

[highlight.js]: https://highlightjs.org/

[highlight.js's usage docs]: https://highlightjs.org/usage/

[npm]: https://www.npmjs.com/package/posthtml-highlight
[npm-version-shield]: https://img.shields.io/npm/v/posthtml-highlight.svg

[npm-stats]: http://npm-stat.com/charts.html?package=posthtml-highlight&author=&from=&to=
[npm-stats-shield]: https://img.shields.io/npm/dt/posthtml-highlight.svg?maxAge=2592000

[david-dm]: https://david-dm.org/posthtml/posthtml-highlight
[david-dm-shield]: https://david-dm.org/posthtml/posthtml-highlight.svg

[typescript]: https://www.typescriptlang.org/
[typescript-shield]: https://img.shields.io/badge/definitions-TypeScript-blue.svg

[travis-ci]: https://travis-ci.org/posthtml/posthtml-highlight/
[travis-ci-shield]: https://img.shields.io/travis/posthtml/posthtml-highlight/master.svg

[codecov]: https://codecov.io/gh/posthtml/posthtml-highlight
[codecov-shield]: https://img.shields.io/codecov/c/github/posthtml/posthtml-highlight.svg

[greenkeeper]: https://greenkeeper.io/
[greenkeeper-shield]: https://badges.greenkeeper.io/posthtml/posthtml-highlight.svg

[gitter]: https://gitter.im/posthtml/posthtml
[gitter-shield]: https://badges.gitter.im/posthtml/posthtml.svg

[wtfpl]: ./LICENSE.md
[wtfpl-shield]: https://img.shields.io/npm/l/posthtml-highlight.svg
