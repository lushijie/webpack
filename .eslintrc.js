module.exports = {
    "parser": "babel-eslint",
    "env": {
      "node": true,
      "mocha": true,
      "browser": true
    },
    "plugins": [
      "react"
    ],
    "ecmaFeatures": {
      "jsx": true
    },
    "rules": {
        // "eqeqeq": 1,//必须使用全等
        // "no-constant-condition": 1,//禁止在条件中使用常量表达式 if(true) if(1)
        // "no-else-return": 1,//如果if语句里面有return,后面不能跟else语句
        // "no-eq-null": 1,//禁止对null使用==或!=运算符
        // "no-fallthrough": 1,//禁止switch穿透
        // "no-func-assign": 1,//禁止重复的函数声明
        // "no-implicit-coercion": 1,//禁止隐式转换
        // "no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
        // "no-mixed-spaces-and-tabs": [1, false],//禁止混用tab和空格
        // "default-case": 1,//switch语句最后必须有default


        // "no-alert": 2,//禁止使用alert confirm prompt
        // "no-caller": 2,//禁止使用arguments.caller或arguments.callee
        // "no-console": 2,//禁止使用console
        // "no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
        // "no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
        // "no-class-assign": 2,//禁止给类赋值
        // "no-array-constructor": 2,//禁止使用数组构造器
        // "no-debugger": 2,//禁止使用debugger
        // "no-delete-var": 2,//不能对var声明的变量使用delete操作符
        // "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
        // "no-dupe-args": 2,//函数参数不能重复
        // "no-duplicate-case": 2,//switch中的case标签不能重复
        // "no-eval": 2,//禁止使用eval
        // "no-invalid-regexp": 2,//禁止无效的正则表达式
        // "no-with": 2,//禁用with
        // "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
    }
};
