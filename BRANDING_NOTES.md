# 网站图片设置

- P1: `1000472147.jpg`，使用内置 ImageGen 抠除黑色背景，保留金色图案及原有 `©Yoh` 署名。
- 透明 Logo: `public/brand/site-logo-v1.png`，1254 × 1254，RGBA；已验证存在透明像素。
- P2: `1000472142.jpg`，原图直接复制为 `public/brand/site-cover-v1.jpg`，3121 × 2502，未改动原图。
- 页眉 Logo 和浏览器图标使用 P1；页眉 Logo 为 30 × 30px，与标题间距 6px。
- 配置位于 `custom.config.js` 的 `SITE_LOGO` 和 `BLOG_FAVICON`。
- 头像及背景保持原有 Notion 数据读取逻辑，由用户在 Notion 中更改，代码不覆盖。
- P2 仅保留为素材文件，不再通过代码设置首页背景。

## ImageGen 最终提示词

Use case: background-extraction. Edit target: the provided original gold ornamental celestial emblem on black. Primary request: remove ONLY the black background and black negative spaces, producing a clean cutout PNG with genuine transparent alpha for a website logo. Preserve the exact original asymmetrical gold crescent, concentric thin golden circular lines, star details, pale gold/green central disc, left vertical gold ornamental lines, distressed foil texture, proportions, and the visible ©Yoh credit exactly as in the source. Do not redesign, simplify, invent ornament, alter the illustration, erase the credit, or add text. Preserve delicate fine lines with clean antialiased edges and no black halo. Keep entire emblem unclipped on a square transparent canvas with a small even safe margin. Transparency must be actual transparency, not a black, white, or checkerboard background.
