# vite-plugin-code-replace

[中文文档](./README_ZH-CN.md)

## how to use

1. install

   `yarn add vite-plugin-code-replace -D`

2. config `vite.config.ts`

```javascript
import StringReplace from 'vite-plugin-code-replace'

defineConfig({
    plugins: [
        StringReplace([
            {
                search: 'aaaaa', // search this string in content
                replace: 'bbbbb', // replace search string with this
            },
            {
                search: /a{5,}/g, // you can use RegEXP to search in content
                replace: 'bbbbb', // replace search string with this
            },
           {
              fileName: 'aaa.txt', // if fileName set, this rule will only execute in this file.
              search: /a{5,}/g,
              replace: 'bbbbb',
           },
        ])
    ]
})
```
