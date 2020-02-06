# react-mathjax-node

> A react component that renders MathJax formulars.

[![Version](https://img.shields.io/npm/v/@innodoc/react-mathjax-node?label=version)](https://www.npmjs.com/package/@innodoc/react-mathjax-node)
[![License](https://img.shields.io/npm/l/@innodoc/react-mathjax-node)](https://www.npmjs.com/package/@innodoc/react-mathjax-node)

<a href="#features">Features</a> •
<a href="#installation">Installation</a> •
<a href="#usage">Usage</a> •
<a href="#api">API</a> •
<a href="#license">License</a>

This library aims to deliver high performance and ease-of-use while still being
flexible in terms of configuration. Multiple areas in the same application can
be handled independently of each other. react-mathjax-node hides all the hairy
details of integrating MathJax with React.

Check out the [examples](https://innodoc.github.io/react-mathjax-node/).

## Features

- Uses MathJax version 3.
- Supports multiple MathJax-enabled areas that are managed independently.
- Integrates well with your webpack setup.
- Self-contained, CDN-less hosting possible.

## Installation

```sh
$ npm install @innodoc/react-mathjax-node # or
$ yarn add @innodoc/react-mathjax-node
```

## Usage

You need at least one `MathJax.Provider` and one `MathJax.Div` or
`MathJax.Span`.

```js
import MathJax from '@innodoc/react-mathjax-node'

<MathJax.Provider>
  <p>
    Example formular: <MathJax.Span texCode="f(x)=x^2" />
  </p>
</MathJax.Provider>
```

See the [examples](https://innodoc.github.io/react-mathjax-node/) for other
ways of using react-mathjax-node.

## API

### Components

Both `MathJax.Div` and `MathJax.Span` have the same props.

| Prop            | Description                      | Type     | Default |
| --------------- | -------------------------------- | -------- | ------- |
| `classNameHide` | className while typesetting.     | `string` | `null`  |
| `classNameShow` | className when done typesetting. | `string` | `null`  |
| `texCode`       | TeX code to typeset.             | `string` | `''`    |

#### `MathJax.Div`

> Block element MathJax formular.

#### `MathJax.Span`

> Inline element MathJax formular.

### `MathJax.Context`

> The MathJax context considers all formulars in the component sub-tree.

Every MathJax formular needs to have a `MathJax.Provider` somewhere up the
component tree.

```js
const { addCallback, removeCallback, typesetDone } = useContext(MathJax.Context)
```

| Property         | Description                                                                                                        | Type       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- |
| `addCallback`    | Add a callback when all formulars are typeset. ([Example](https://innodoc.github.io/react-mathjax-node/callback/)) | `function` |
| `removeCallback` | Remove callback.                                                                                                   | `function` |
| `typesetDone`    | If all formulars are typeset. ([Example](https://innodoc.github.io/react-mathjax-node/fade-in/))                   | `Boolean`  |

### `MathJax.Provider`

> The Provider manages all formulars in its component sub-tree.

There can be an arbitrary number of Providers in your application. So you can
have different areas with formulars and distinct display logic.

### `MathJax.ConfigProvider`

> Use the ConfigProvider to customize the MathJax options.

Using the `ConfigProvider` is completely optional. It gives you freedom to
customize the MathJax configuration options. You should only have one
`ConfigProvider` in your component tree as there will be one instance of
MathJax for the entire application. Make sure all used `MathJax.Provider`s are
somewhere in the component sub-tree of your `ConfigProvider`. Typically the
`ConfigProvider` would reside somewhere near the top of your component tree.

```js
  <MathJax.ConfigProvider options={myCustomMathJaxOptions}>
    <MathJax.Provider>
      <MathJax.Div texCode="..." />
    </MathJax.Provider>
    <MathJax.Provider>
      <MathJax.Div texCode="..." />
    </MathJax.Provider>
  </MathJax.ConfigProvider>
```

Please refer to the
[MathJax documentation](https://docs.mathjax.org/en/latest/options/index.html)
for a full description of the MathJax configuration options.

See the [example](https://innodoc.github.io/react-mathjax-node/custom-config/)
on how to customize the font URL.

### `MathJax.useMathJax`

> React hook that adds MathJax typesetting capabilities.

Typically you should just use either `MathJax.Div` or `MathJax.Span` which use
`useMathJax` under the hood.

```js
const MathJaxComponent = () => {
  const ref = useMathJax('x^2')
  return <span ref={ref} />
}
```

| Argument      | Description           | Type                  | Default  |
| ------------- | ----------------------| --------------------- | -------- |
| `texCode`     | TeX code to typeset.  | `string`              | `''`     |
| `displayType` | Element display Type. | `inline` or `display` | `inline` |

## License

MIT
