# Remark Simple PlantUML Plugin

`remark-simple-plantuml` is a simple plugin for [remarkjs](https://github.com/remarkjs/remark) that converts PlantUML code blocks to image nodes.

This project is currently under development.

## Example

You can use this plugin like following

### Markdown

````markdown
# Your markdown including PlantUML code block

```plantuml Your title
class SimplePlantUMLPlugin {
    + transform(syntaxTree: AST): AST
}
```
````

### JavaScript

```javascript
const remark = require("remark");
const simplePlantUML = require("remark-simple-plantuml");
const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "./your-markdown.md")).toString();
const output = remark().use(simplePlantUML).processSync(input).toString();

console.log(output);
// will be 
// > # Your markdown including PlantUML code block
// >
// > ![Your title](https://www.plantuml.com/plantuml/png/Iyv9B2vM2CxCBSX93SX9p2i9zVK9o2bDpynJgEPI009jXPAYnBpYjFoYN8tYohoIn8gGejHKAmN7u11DCCbL2m00)
```

## Plugin Options

You can use specific PlantUML server by the option 'baseUrl'.
(The default is `https://www.plantuml.com/plantuml/png`)

If you want to use SVG, you can configure like following.

```javascript
remark().use(simplePlantUML, { baseUrl: "https://www.plantuml.com/plantuml/svg" }).processSync(input);
```

## Integration

You can use this plugin in any frameworks support remarkjs.

If you want to use in the classic preset of Docusaurus 2, like me, set configuration in your `docusaurus.config.js` like following.

```javascript
const simplePlantUML = require("remark-simple-plantuml");

...,
presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [simplePlantUML]
        }
      }
    ]
  ],
...