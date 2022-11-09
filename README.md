# sanity-plugin-canvas-tool

## Installation

```sh
npm install sanity-plugin-canvas-tool
```

## Usage

Install the plugin in your [Sanity Studio](https://sanity.io/studio) configuration 
`sanity.config.ts` (or `.js`):

```ts
import {defineConfig} from 'sanity'
import {myPlugin} from 'sanity-plugin-canvas-tool'

export const defineConfig({
  // ...

  plugins: [
    myPlugin({}),
  ],
})
```
## License

[MIT](LICENSE) © Marius Lundgård
