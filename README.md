## camp_cli 命令行工具

作用：从 package.json 出发，递归遍历所有 node_modules 中的 package.json ，生成模块依赖关系图。

注意：根目录下的bin 文件里的index.ts 是项目入口文件， 需要实现功能请新建文件夹

开发环境：

> node版本 ： v18.17.0
>
> npm版本：9.6.7

## 项目使用

```shell
 npm run dev analyze -- --depth=<number> --json <output-file-path&name>

 # example
 # npm run dev analyze -- --depth=1 --json ./output.json
```

#### 目录命名

全部采用小写方式，以中线分隔。有复数结构时，要采用复数命名法， 缩写不用复数。<br />例如：test-data

#### 变量命名

#### 常量命名

#### 方法命名

#### 提交规范

1. 修改部分代码后，提交时请不要使用git add . 请使用git add 修改的文件或文件名的名称
2. git add 后使用 npm run commit 命令 或者 使用 npm 脚本里 commit 命令
3. 执行玩上述命令后请选择你的git提交类型如下图，然后写清楚你修改了什么内容。

```typescript
// git提交类型

feat: "新功能"

init: "规范初始化"

fix: "修复"

docs: "文档变更"

refactor: "重构(既不是增加feature，也不是修复bug)"

perf: "性能优化"

test: "增加测试"

chore: "构建过程或辅助工具的变动"

revert: "回退"

build: "打包"
```
