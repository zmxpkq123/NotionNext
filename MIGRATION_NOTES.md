# NotionNext 个人配置迁移说明

本目录由旧版 `4.0.5` 迁移到新版 `4.10.8`。迁移时使用官方
`v4.0.5` 作为基准，逐文件比较旧库，以区分个人定制与上游代码变化。

## 已迁移

- 站点主题：`hexo`
- 外观模式：`auto`
- 作者名、简介、Telegram、邮箱
- 生产站点地址：`https://notion-next-puce-sigma.vercel.app`
- 首页欢迎语
- 霞鹜文楷字体及原字体加载地址
- 关闭自定义右键菜单
- 关闭文章分享条
- 开启樱花效果
- 关闭宠物挂件及宠物切换主题
- 关闭 RSS
- 关闭 Hexo 首页分类大图标按钮
- 旧版自定义 `public/favicon.ico`

除 favicon 外，个人站点设置集中保存在根目录
`custom.config.js`。`blog.config.js` 仅在对象末尾引入该文件。

## 已由新版原生实现，不再复制旧代码

旧库曾自行修改或新增以下功能。新版已经提供更完整的原生实现，因此
保留新版代码，以免重复实现和增加同步冲突：

- Algolia 搜索弹窗、全文索引生成、更新与删除
- 图片懒加载占位图和 `title` 属性
- Notion 的 `type`、`status`、`category` 单选字段归一化
- 推荐文章与全文检索文本提取
- Heo 搜索按钮和路由切换状态处理
- 主题切换组件

以下旧差异不影响功能，因此没有迁移：

- 只删除空行或增加注释的改动
- 删除当时未被引用的通用 `LoadingCover.js`
- 删除旧版中无实际行为的监听代码

## 不应提交到 GitHub 的配置

没有复制旧 `.env.local`。Notion 数据库 ID 和任何密钥应继续配置在
Vercel 的 Project Settings → Environment Variables 中。

必需：

- `NOTION_PAGE_ID`

建议：

- `NEXT_PUBLIC_LINK=https://notion-next-puce-sigma.vercel.app`

仅在使用 Algolia 时配置：

- `NEXT_PUBLIC_ALGOLIA_APP_ID`
- `ALGOLIA_ADMIN_APP_KEY`
- `NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_APP_KEY`
- `NEXT_PUBLIC_ALGOLIA_INDEX`

`ALGOLIA_ADMIN_APP_KEY` 是服务端密钥，不要写入任何受 Git 管理的文件。

## 配置优先级

新版读取顺序为：

1. Notion Config 数据库
2. Vercel 环境变量
3. `custom.config.js`
4. NotionNext 上游默认配置

如果部署后某项设置没有按本文件生效，请先检查 Notion Config 中是否有
同名键；Notion Config 会覆盖源码中的值。

## 后续同步作者更新

建议继续使用 `main` 保存同步后的上游代码，`deploy/blog` 保存部署配置：

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

git checkout deploy/blog
git merge main
git push origin deploy/blog
```

个人改动主要位于：

- `custom.config.js`
- `blog.config.js` 末尾的一个引入点
- `themes/hexo/config.js` 的 `HEXO_HOME_NAV_BUTTONS`
- `public/favicon.ico`

合并上游时优先保留新版代码，再恢复上述少量个人改动即可。
