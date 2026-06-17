# UI Skills 索引

> 纯 UI/设计 Skills 合集。每个都是标准 SKILL.md 格式，可直接给 AI 模型当上下文。

---

## 📄 Anthropic 官方（152k ⭐ `anthropics/skills`）

| 文件 | 用途 |
|------|------|
| `frontend-design.md` | **反 AI 味核心** — 两阶段设计法、反默认套路、排版/结构/动效/文案原则 |
| `web-artifacts-builder.md` | React + Tailwind + shadcn 构建复杂页面，含"反 slop"指令 |
| `canvas-design.md` | 静态视觉设计（海报/插画）— 先写视觉哲学再表达 |
| `theme-factory.md` | 10 套主题预设（色板 + 字体配对），开箱即用 |
| `algorithmic-art.md` | p5.js 生成艺术 — 先写算法哲学再用代码表达 |

## 📁 anydesign/（110 ⭐ `uxKero/anydesign`）

分析任意图片 / 网站 / Figma → 生成完整 `design.md`（token 系统 + 组件清单 + 重建说明）。

- `SKILL.md` — 主技能
- `references/` — 分析框架、捕获流程、输出模板、token 提取
- `examples/` — Vercel landing、landing page 等真实分析案例

## 📁 swiftui-design-skill/（141 ⭐ `wholiver/swiftui-design-skill`）

虽然是 SwiftUI 技能，但**设计原则完全通用**，核心是反 AI Slop：

- `references/anti-ai-slop.md` — 反 AI 味六条铁律
- `references/design-review.md` — 五维评审体系
- `references/typography-color.md` — 排版与配色原则
- `references/layout-patterns.md` — 布局模式参考

## 📁 rampstack-web-skills/（354 ⭐ `rampstackco/claude-skills`）

网站全生命周期设计 Skills，每个都是独立 SKILL.md + references：

| Skill | 用途 |
|-------|------|
| `brand-archetype-system/` | **11 种品牌原型** × 18 个行业适配方案 |
| `brand-discovery/` | 品牌定位发现 |
| `brand-voice/` | 品牌语调规范 |
| `landing-page-copy/` | 落地页文案撰写 |
| `funnel-flow-architecture/` | 转化漏斗架构 |
| `onboarding-wizard-design/` | 用户引导流程设计 |
| `cro-optimization/` | 转化率优化 |
| `comparison-tool-design/` | 对比工具 UI 设计 |
| `calculator-design/` | 计算器组件设计 |
| `chatbot-flow-design/` | 聊天机器人流程设计 |

## 📁 superpowers/（230k ⭐ `obra/superpowers`）

- `brainstorming/` — 结构化设计头脑风暴（把粗略想法变成完整设计方案）

## 📁 ux-skill-agents/（36 ⭐ `Laith0003/ux-skill`）

4 个专业设计角色（子 Agent）：

| 文件 | 角色 |
|------|------|
| `design-system-architect.md` | 设计系统架构师 — token / 基础文档 / 组件契约 / 暗色模式 |
| `motion-engineer.md` | 动效工程师 — 入场/离场/交互/滚动动画编排 |
| `copy-writer.md` | 文案师 — 界面文案 / 错误信息 / 空状态 / CTA |
| `research-synthesizer.md` | 研究综合师 — 竞品分析 / 用户洞察 / 设计决策支撑 |

---

## 使用方式

给 OpenCode / Mimo / Claude 写新页面时，在系统提示词中引用：

```
参考以下 Skills 目录中的设计规范：
- 设计原则：skills/frontend-design.md
- 反 AI 味：skills/swiftui-design-skill/references/anti-ai-slop.md
- 色板选择：skills/anydesign/references/token-extraction.md
- 品牌定位：skills/rampstack-web-skills/brand-archetype-system/SKILL.md
- 落地页文案：skills/rampstack-web-skills/landing-page-copy/SKILL.md
```

---

*最后更新：2026-06-18*
*来源：anthropics/skills (152k⭐) · obra/superpowers (230k⭐) · rampstackco (354⭐) · wholiver (141⭐) · uxKero (110⭐) · Laith0003 (36⭐)*
