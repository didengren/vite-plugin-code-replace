module.exports = {
  tabWidth: 2,// 制表符 tab 宽度。（默认 2）
  printWidth: 100,// 指定编辑器中一行代码的长度，超过会换行。（默认 80）
  singleQuote: true,// 使用单引号代替双引号。（默认 false）
  semi: false,// 在语句末尾加分号。（默认 true)
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  //箭头函数中的参数加上括号。（默认 always）
  //always：始终使用。
  //avoid：有需要时使用。
  arrowParens: 'always',
  endOfLine: 'auto',
}
