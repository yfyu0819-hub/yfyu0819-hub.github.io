import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('shows the AI comic drama platform first and removes food delivery', () => {
  const projectOrder = [...html.matchAll(/<h3 data-i18n="work\.(p\d+)\.title"/g)].map((match) => match[1]);
  assert.deepEqual(projectOrder, ['p6', 'p1', 'p2', 'p3', 'p4']);
  assert.doesNotMatch(html, /work\.p5\./);
});

test('removes outdated trainee and creator claims', () => {
  assert.doesNotMatch(html, /product trainee/i);
  assert.doesNotMatch(html, /产品管培生/);
  assert.doesNotMatch(html, /produced several episodes/i);
  assert.doesNotMatch(html, /制作了多集漫剧/);
});

test('publishes the verified project-lead evidence in both languages', () => {
  for (const evidence of ['four-person team', 'about half a month', 'about one and a half months', '4 人团队', '约半个月', '约一个半月']) {
    assert.match(html, new RegExp(evidence));
  }
});

test('gives recruiters direct case-study, resume, and contact actions', async () => {
  assert.match(html, /<a[^>]+class="[^"]*hero-cta[^"]*"[^>]+href="#work"/);
  assert.match(html, /<a[^>]+href="assets\/resume\/杨丰毓_AI产品经理_简历\.pdf"[^>]+download/);
  assert.match(html, /<a[^>]+class="[^"]*hero-cta[^"]*"[^>]+href="#contact"/);
  await access(new URL('../assets/resume/杨丰毓_AI产品经理_简历.pdf', import.meta.url));
});

test('publishes crawlable recruiting and social metadata', () => {
  assert.match(html, /<title>杨丰毓 Fay \| AI 产品经理<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]*AI 产品经理[^"]*"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/yfyu0819-hub\.github\.io\/"/);
  assert.match(html, /<meta property="og:title" content="杨丰毓 Fay \| AI 产品经理"/);
  assert.match(html, /<meta property="og:image" content="https:\/\/yfyu0819-hub\.github\.io\/assets\/projects\/6-3\.png"/);
});

test('serves a local favicon instead of generating a browser 404', async () => {
  assert.match(html, /<link rel="icon" href="assets\/favicon\.svg" type="image\/svg\+xml"/);
  await access(new URL('../assets/favicon.svg', import.meta.url));
});

test('uses semantic project toggles with an explicit expanded state', () => {
  const toggles = [...html.matchAll(/<button class="project-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="([^"]+)"[^>]*>/g)];
  assert.equal(toggles.length, 5);
  for (const [, contentId] of toggles) {
    assert.match(html, new RegExp(`<div class="card-content" id="${contentId}" aria-hidden="true" inert>`));
  }
  assert.doesNotMatch(html, /<div class="project-card"[^>]*onclick=/);
});

test('removes the dead client link and unpublished backup photos', async () => {
  assert.doesNotMatch(html, /39\.103\.204\.41:3000/);
  await assert.rejects(access(new URL('../assets/projects/_backup', import.meta.url)));
});

test('describes project leadership without defensive wording', () => {
  assert.doesNotMatch(html, /actual project lead/i);
  assert.doesNotMatch(html, /项目实际负责人/);
  assert.match(html, /project lead/i);
  assert.match(html, /项目负责人/);
});
