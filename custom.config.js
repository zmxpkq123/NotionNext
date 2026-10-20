/**
 * 个人站点配置
 *
 * 这个文件集中保存从 NotionNext v4.0.5 迁移来的个性化设置。
 * blog.config.js 只保留一个接入点，便于后续同步上游版本。
 *
 * 配置优先级仍遵循新版规则：
 * Notion Config > Vercel 环境变量 > 本文件 > 上游默认配置。
 */

const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL

module.exports = {
  // 站点与外观
  THEME: process.env.NEXT_PUBLIC_THEME || 'hexo',
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'auto',
  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'Zmxpkq',
  BIO: process.env.NEXT_PUBLIC_BIO || '远在远方的风 🎐',
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://zmxpkq.de',
  SITE_LOGO: process.env.NEXT_PUBLIC_SITE_LOGO || '/brand/site-logo-v1.png',
  SITE_COVER: process.env.NEXT_PUBLIC_SITE_COVER || '/brand/site-cover-v1.jpg',
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || '/brand/site-logo-v1.png',
  GREETING_WORDS:
    process.env.NEXT_PUBLIC_GREETING_WORDS ||
    '<br><br>大风从东吹到西<br>从北刮到南<br>无视黑夜和黎明',
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU ?? true,

  // 联系方式。新版会以 Base64 保存邮箱，避免直接暴露在页面源码中。
  CONTACT_EMAIL: publicEmail
    ? btoa(unescape(encodeURIComponent(publicEmail)))
    : 'MzMyMzYzOTIyMUBxcS5jb20=',
  CONTACT_TELEGRAM:
    process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || 'https://t.me/zmxpkq123',

  // 旧版使用的霞鹜文楷字体
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans',
  FONT_URL: process.env.NEXT_PUBLIC_FONT_URL || [
    'https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.7.0/style.css',
    'https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css',
    'https://fonts.googleapis.com/css?family=Bitter&display=swap'
  ],
  FONT_SANS: [
    '"LXGW WenKai Screen"',
    '"LXGW WenKai"',
    '"PingFang SC"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Hiragino Sans GB"',
    '"Microsoft YaHei"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Segoe UI"',
    '"Noto Sans SC"',
    'HarmonyOS_Regular',
    '"Helvetica Neue"',
    'Helvetica',
    '"Source Han Sans SC"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"'
  ],
  FONT_SERIF: [
    '"LXGW WenKai Screen"',
    '"LXGW WenKai"',
    'Bitter',
    '"Noto Serif SC"',
    'SimSun',
    '"Times New Roman"',
    'Times',
    'serif',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Apple Color Emoji"'
  ],

  // 交互与动效
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU ?? false,
  POST_SHARE_BAR_ENABLE: process.env.NEXT_PUBLIC_POST_SHARE_BAR ?? 'false',
  SAKURA: process.env.NEXT_PUBLIC_SAKURA ?? true,
  WIDGET_PET: process.env.NEXT_PUBLIC_WIDGET_PET ?? false,
  WIDGET_PET_SWITCH_THEME:
    process.env.NEXT_PUBLIC_WIDGET_PET_SWITCH_THEME ?? false,
  ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS ?? false
}
