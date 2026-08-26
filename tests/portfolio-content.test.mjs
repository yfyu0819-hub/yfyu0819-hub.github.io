import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
