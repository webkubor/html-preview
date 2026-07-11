#!/usr/bin/env node
// Post-build:
//  1) 给设计稿页注入返回集锦的信息条
//  2) 生成版本号 version.json，并给「所有」dist 页注入「版本号 + 新版本检测 + 强制刷新」守卫
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// ── 版本号：构建时间戳（可读）──────────────────────────────
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const VERSION = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
fs.writeFileSync(path.join(distDir, 'version.json'), JSON.stringify({ version: VERSION, builtAt: now.toISOString() }, null, 2));
console.log(`🏷  版本号 ${VERSION} → dist/version.json`);

// Cloudflare Pages _headers：version.json 绝不缓存（版本检测靠它拿真值）；
// html 每次重新校验（改了就立刻是新版，不吃边缘缓存）。
fs.writeFileSync(path.join(distDir, '_headers'), [
  '/version.json',
  '  Cache-Control: no-store',
  '/*.html',
  '  Cache-Control: no-cache',
  '/',
  '  Cache-Control: no-cache',
  '',
].join('\n'));
console.log('🧾 dist/_headers 写入（version.json 不缓存 / html 每次校验）');

// ── 版本守卫脚本（注入到每个页面）──────────────────────────
// 角标显示当前版本；每 60s + 页面重新可见时拉 version.json 比对；有新版弹条，点「立即刷新」带 cache-bust 强制刷新。
function versionGuard(version) {
  return `
<script>
(function(){
  var V=${JSON.stringify(version)};
  window.__APP_VERSION__=V;
  // 当前版本角标
  var tag=document.createElement("div");
  tag.textContent="v"+V;
  tag.style.cssText="position:fixed;right:8px;bottom:6px;z-index:2147483646;font:500 10px/1 -apple-system,'PingFang SC',sans-serif;color:rgba(120,120,140,.55);background:rgba(255,255,255,.6);border:1px solid rgba(0,0,0,.06);border-radius:6px;padding:3px 7px;pointer-events:none;backdrop-filter:blur(4px)";
  document.addEventListener("DOMContentLoaded",function(){document.body.appendChild(tag)});
  // 新版本提示条
  function bar(nv){
    if(document.getElementById("__verbar"))return;
    var d=document.createElement("div");d.id="__verbar";
    d.style.cssText="position:fixed;top:0;left:0;right:0;z-index:2147483647;display:flex;gap:10px;align-items:center;justify-content:center;padding:9px 16px;background:linear-gradient(90deg,#4f46e5,#7c3aed);color:#fff;font:600 13px/1.4 -apple-system,'PingFang SC',sans-serif;box-shadow:0 2px 12px rgba(79,70,229,.35)";
    d.innerHTML='🔄 发现新版本 v'+nv+'（当前 v'+V+'）<button id="__verbtn" style="margin-left:6px;background:#fff;color:#4f46e5;border:0;border-radius:6px;padding:4px 14px;font-weight:700;cursor:pointer">立即刷新</button>';
    document.body.appendChild(d);
    document.getElementById("__verbtn").onclick=function(){
      // 强制刷新：本域查询参数会 308，改用 reload（服务端 ETag 变化即拉到新版本）
      location.reload();
    };
  }
  function check(){
    fetch("/version.json",{cache:"no-store"})
      .then(function(r){return r.ok?r.json():null})
      .then(function(j){if(j&&j.version&&j.version!==V)bar(j.version);})
      .catch(function(){});
  }
  check();
  setInterval(check,60000);
  document.addEventListener("visibilitychange",function(){if(!document.hidden)check();});
})();
</script>`;
}

// ── 1) 设计稿信息条（仅这几个 hero 页）────────────────────
const PAGES = [
  { file: 'purple-hero.html', title: 'AI 用量治理', subtitle: '紫色首屏 Hero', accent: '#7c3aed', model: 'Claude Code', date: '2026-06-17', tech: 'Canvas + Animation' },
  { file: 'ai-gateway-hero.html', title: 'AI 网关聚合', subtitle: '主流大模型聚合', accent: '#8b5cf6', model: 'Claude Code', date: '2026-06-17', tech: 'Gradient + Canvas' },
  { file: 'business-reimagined.html', title: '次元共生 · 企业版', subtitle: '企业级 AI 治理', accent: '#b052ef', model: 'Claude Code', date: '2026-06-17', tech: 'Animation + Grid' }
];

fs.writeFileSync(path.join(distDir, 'pages.json'), JSON.stringify(PAGES, null, 2));

PAGES.forEach((p) => {
  const filePath = path.join(distDir, p.file);
  if (!fs.existsSync(filePath)) { console.log(`⚠️  ${p.file} not found in dist`); return; }
  let html = fs.readFileSync(filePath, 'utf-8');
  const barHtml = `
<div id="infoBar" style="position:fixed;bottom:0;left:0;right:0;z-index:99999;display:flex;align-items:center;justify-content:space-between;padding:8px 20px;background:rgba(10,10,15,0.85);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,0.06);font-size:11px;transform:translateY(calc(100% - 28px));transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);cursor:pointer;">
  <div style="display:flex;align-items:center;gap:12px;">
    <div style="width:6px;height:6px;border-radius:50%;background:${p.accent};flex-shrink:0;"></div>
    <span style="color:rgba(255,255,255,0.9);font-weight:500;font-size:12px;">${p.title}</span>
    <span style="color:rgba(255,255,255,0.35);font-size:10px;">${p.subtitle}</span>
  </div>
  <div style="display:flex;align-items:center;gap:10px;">
    <span style="padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);font-size:10px;">${p.model}</span>
    <span style="padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);font-size:10px;">${p.tech}</span>
    <span style="padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);font-size:10px;">${p.date}</span>
    <span style="color:rgba(255,255,255,0.2);font-size:10px;">悬停展开 · 返回集锦</span>
  </div>
</div>
<script>
(function(){var b=document.getElementById("infoBar");b.addEventListener("mouseenter",function(){this.style.transform="translateY(0)"});b.addEventListener("mouseleave",function(){this.style.transform="translateY(calc(100% - 28px))"});b.addEventListener("click",function(){window.location.href="index.html"})})();
</script>`;
  if (html.includes('</body>')) {
    html = html.replace('</body>', barHtml + '</body>');
    fs.writeFileSync(filePath, html);
    console.log(`✅ ${p.file} — bar injected`);
  } else {
    console.log(`⚠️  ${p.file} — no </body> found`);
  }
});

// ── 2) 版本守卫：注入到所有 dist 页面 ─────────────────────
const guard = versionGuard(VERSION);
fs.readdirSync(distDir).filter((f) => f.endsWith('.html')).forEach((f) => {
  const fp = path.join(distDir, f);
  let html = fs.readFileSync(fp, 'utf-8');
  if (html.includes('__APP_VERSION__')) return; // 防重复注入
  if (html.includes('</body>')) {
    html = html.replace('</body>', guard + '</body>');
    fs.writeFileSync(fp, html);
    console.log(`🛡  ${f} — 版本守卫注入`);
  }
});
