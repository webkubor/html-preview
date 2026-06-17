#!/usr/bin/env node
// Post-build: inject info bar into dist HTML files
const fs = require('fs');
const path = require('path');

const PAGES = [
  { file: 'purple-hero.html', title: 'AI 用量治理', subtitle: '紫色首屏 Hero', accent: '#7c3aed', model: 'Claude Code', date: '2026-06-17', tech: 'Canvas + Animation' },
  { file: 'ai-gateway-hero.html', title: 'AI 网关聚合', subtitle: '主流大模型聚合', accent: '#8b5cf6', model: 'Claude Code', date: '2026-06-17', tech: 'Gradient + Canvas' },
  { file: 'modelgo-domestic-hero-motion.html', title: '次元共生', subtitle: '首屏动效', accent: '#a855f7', model: 'Claude Code', date: '2026-06-17', tech: 'Gradient + Canvas' },
  { file: 'modelgo-domestic-blue-purple-bg.html', title: 'ModelGo 国内官网', subtitle: '蓝紫粒子背景', accent: '#6366f1', model: 'Claude Code', date: '2026-06-17', tech: 'WebGL + Canvas' },
  { file: 'business-reimagined.html', title: '次元共生 · 企业版', subtitle: '企业级 AI 治理', accent: '#b052ef', model: 'Claude Code', date: '2026-06-17', tech: 'Animation + Grid' },
  { file: 'modelgo-domestic-reimagined.html', title: 'AI 用量治理体系', subtitle: '企业级落地页', accent: '#3b82f6', model: 'Claude Code', date: '2026-06-17', tech: 'Canvas + Animation' }
];

const distDir = path.join(__dirname, 'dist');

// Write pages.json
fs.writeFileSync(path.join(distDir, 'pages.json'), JSON.stringify(PAGES, null, 2));

PAGES.forEach(p => {
  const filePath = path.join(distDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${p.file} not found in dist`);
    return;
  }
  
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
