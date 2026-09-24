
# MaaYuan Docs

MaaYuan 中文文档站，使用 VitePress 2.0.0-alpha.20、Vue 和 Teek 1.6.2 文档主题。

- 当前站点结构：VitePress 单中文入口（通过 `zh/` 重写到根路径）
- GitHub 仓库：<https://github.com/syoius/MaaYuan-docs>

## 本地开发

使用 Node.js 24 和 pnpm 9：

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
pnpm test
python3 -m unittest discover -s tests -p 'test_*.py'
```

## 阅读设置

桌面端通过导航栏右侧的书本图标打开主题增强面板：

- 布局切换：原始宽度、全部展开，以及可调宽度模式；宽度滑块在宽屏下可用。
- 主题色板：选择预设颜色，并通过“扩散”控制页面背景等元素是否跟随配色。
  首页「MaaYuan」标题渐变和图片光晕始终跟随主题色，不受“扩散”开关影响。
- 聚光灯：开启后跟随鼠标突出当前阅读区域，支持“置于侧边”和“置于底部”两种样式。

默认使用原始宽度和 VitePress 主色，颜色扩散、聚光灯默认关闭。切换色板只改变主题强调色；需要背景一起变色时，可主动开启“扩散”。升级后首次访问会关闭之前默认开启的扩散，保留配色和布局，之后的手动选择仍会保存。设置保存在当前浏览器本地。手机端通过右下角色板入口调整颜色，布局切换和聚光灯受屏幕宽度及触控设备限制。

## 主题维护

- `.vitepress/config.mjs` 使用 `defineTeekConfig` 配置主题。保留手工导航和 `zh/` 重写规则，关闭自动侧栏、永久链接、标题注入和博客元数据生成。
- `.vitepress/theme/index.js` 继承 Teek，通过插槽保留随机首页图、公告、快速开始弹窗及文章分享。原固定分区栏由导航菜单和侧栏替代。
- `components/Layout.vue` 仅延迟启用依赖浏览器容器的主题浮层和返回顶部按钮，正文正常静态渲染。随机首页图在挂载后随机选择，保证服务端与客户端首帧一致。
- 首页正文由自带响应式样式的社区组件渲染，使用 `markdownStyles: false`，避免首页 Markdown 容器在首帧计算浏览器宽度导致 hydration 不一致。
- 表格保留 VitePress 默认横向滚动样式，避免 Teek 可选表格样式在窄屏撑开页面。
- 样式使用 `vitepress-theme-teek/theme-chalk/index.css`，不加载本项目未使用、且发布包缺失字体文件的社交 iconfont。
- VitePress 当前采用 `next` 渠道的预发布版并固定版本。Teek 1.6.2 及部分附带插件仍声明 VitePress `^1.6.4`，安装会有 peer dependency 警告；每次升级都需验证构建和页面交互，不能视为上游已承诺兼容。

- `patches/vitepress-theme-teek@1.6.2.patch` 通过 pnpm 自动应用，将 Teek 目录高亮已移除的 `getScrollOffset` 调用改为读取标题的 CSS `scroll-margin-top`，与 VitePress 2 默认主题一致。升级 Teek 后需检查上游是否已修复，再移除补丁。

主题变更后除构建和测试外，还需检查首页、安装页、开发文档、搜索、公告和快速开始弹窗，以及桌面/移动布局、深浅色、四种宽度模式、两种聚光灯样式和刷新后的设置恢复。站点开启 `ignoreDeadLinks`，构建成功不能替代链接检查。
