# Skills 索引 — 纯 UI 开发参考

> 本目录收录来自开源社区的高质量 AI 编码 Skills 和设计数据，供模型写代码时参考。

## 📁 目录结构

```
skills/
├── 📄 Skill 文件（Anthropic 官方，152k ⭐）
├── 📁 cursor-rules/（Cursor 编码规则，81 ⭐）
├── 📁 ux-skill-data/（反 AI 味设计引擎，36 ⭐）
└── 📁 brand-designs/（130+ 品牌设计拆解）
```

## 📄 Skill 文件（直接给模型当上下文）

| 文件 | 来源 | 用途 |
|------|------|------|
| `frontend-design.md` | anthropics/skills | **反 AI 味设计核心** — 两阶段法、反默认套路、排版/结构/动效/文案全部有原则 |
| `web-artifacts-builder.md` | anthropics/skills | React + Tailwind + shadcn 构建复杂页面，明确"反 slop"指令 |
| `canvas-design.md` | anthropics/skills | 静态视觉设计（海报/插画），先写视觉哲学再表达 |
| `theme-factory.md` | anthropics/skills | 10 套主题预设（色板 + 字体配对），开箱即用 |
| `algorithmic-art.md` | anthropics/skills | p5.js 生成艺术，先写算法哲学再用代码表达 |
| `mcp-builder.md` | anthropics/skills | MCP Server 构建指南 |
| `brand-guidelines.md` | anthropics/skills | Anthropic 品牌样式指南（示例） |

## 📁 cursor-rules/（模块化编码规则）

| 文件 | 用途 |
|------|------|
| `000-cursor-rules.md` | Cursor Rules 格式规范（怎么写规则） |
| `002-tech-stack.md` | 技术栈锁定：Next.js 15 + React 19 + TS + Tailwind v4 |
| `003-file-structure.md` | 项目目录结构规范 |
| `004-accessibility.md` | WCAG 无障碍标准 |
| `2000-react.md` | React 19 组件开发规范 |
| `2002-tailwindcss.md` | Tailwind 收口 + cn() + 暗色模式 |
| `2003-shadcn-ui.md` | Shadcn UI 组件集成规范 |

## 📁 ux-skill-data/（反 AI 味设计数据引擎）

> 来自 `Laith0003/ux-skill`（36 ⭐），最硬的反 slop 工具

| 文件 | 数据量 | 用途 |
|------|--------|------|
| `anti-patterns.json` | **152 条** | 反 AI 味检测规则（正则匹配），禁止 Inter 大字/紫色渐变/三卡网格等 |
| `landing-patterns.json` | **40 种** | 落地页模式（含解剖图+动效+反 slop 检查） |
| `motion-presets.json` | **57 个** | 动画预设（时长/缓动/变换精确到毫秒） |
| `palettes.json` | **176 套** | 专业色板（含色调/情绪/适用场景） |
| `type-pairs.json` | **70 组** | 字体配对（display × body × mono） |
| `ux-guidelines.json` | **112 条** | UX 设计法则（Hick's Law 等学术支撑） |
| `page-sequences.json` | 多套 | 页面序列/流程模式 |
| `components.json` | 多套 | 组件设计规范 |
| `styles.json` | 多套 | 视觉风格定义 |
| `industries.json` | 多套 | 行业视觉特征 |
| `chart-types.json` | 多套 | 图表类型选择 |
| `tech-stacks.json` | 多套 | 技术栈参考 |

## 📁 brand-designs/（品牌设计拆解，26 个品牌）

> 每个 JSON 包含：设计哲学、字体系统、色板、圆角、间距、商标信号

| 品牌 | 亮点 |
|------|------|
| `stripe.json` | 深海军蓝 + 电网靛蓝 + 大气渐变网格 |
| `linear.app.json` | #010102 最深暗面 + 薰衣草蓝单色点缀 |
| `vercel.json` | 黑白双调 + 多色网格渐变 |
| `figma.json` | 黑白编辑框 + 超大手工色块 |
| `supabase.json` | 白底黑字 + 单色翠绿 CTA |
| `arc-browser.json` | 暖白底 + 水彩渐变英雄条 |
| `clay.json` | 奶油底 + 陶土质感 |
| `framer.json` | 编辑器美学 |
| `webflow.json` | 网页平台设计语言 |
| `warp.json` | 终端工具暗色美学 |
| `resend.json` | 邮件 API 品牌 |
| `raycast.json` | 效率工具暗色 |
| `notion.json` | 笔记平台品牌 |
| `cursor.json` | AI 编辑器品牌 |
| `anthropic.json` | Claude 温暖编辑风格 |
| `openai.json` | 品牌规范 |
| 其他 10 个... | AI/开发者工具品牌 |

---

## 🔧 模型使用方式

给 AI 模型写代码时，这样引用：

```yaml
# OpenCode / Claude Code 项目根目录加 .opencode/SYSTEM.md 或 CLAUDE.md：
skills:
  frontend_design: "./skills/frontend-design.md"
  anti_slop: "./skills/ux-skill-data/anti-patterns.json"
  palettes: "./skills/ux-skill-data/palettes.json"
  type_pairs: "./skills/ux-skill-data/type-pairs.json"
  motion: "./skills/ux-skill-data/motion-presets.json"
  landing_patterns: "./skills/ux-skill-data/landing-patterns.json"
```

**写新页面时：**
1. 先看 `palettes.json` 选色板
2. 再看 `type-pairs.json` 选字体
3. 对照 `anti-patterns.json` 检查反 slop
4. 参考 `landing-patterns.json` 选布局
5. 用 `motion-presets.json` 加动效

---

*最后更新：2026-06-18*
*数据来源：anthropics/skills (152k⭐) + ux-skill (36⭐) + awesome-cursor-rules (81⭐)*
