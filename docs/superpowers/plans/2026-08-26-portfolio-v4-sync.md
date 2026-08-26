# Portfolio v4 Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the bilingual portfolio so its public positioning and project evidence match the approved AI Product Manager resume, then publish the verified page to GitHub Pages.

**Architecture:** Keep the existing single-file HTML/CSS/JavaScript architecture. Make only content and project-order changes in `index.html`; add one dependency-free Node test that validates the user-visible project order, removal of obsolete positioning, and presence of the approved achievement evidence.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js built-in `node:test`, GitHub Pages.

**Spec:** `status.md`

## Global Constraints

- Preserve the current bilingual visual design, animations, lightbox, galleries, and responsive behavior.
- Do not publish the current employer's legal name.
- Do not claim numbers of comic dramas produced.
- Keep only the AI comic drama platform, server/database pricing tool, tree inventory/QR system, green carbon sink system, and Mexico ERP project cards.
- Publish only after automated checks and desktop/mobile bilingual browser checks pass.

---

### Task 1: Portfolio content contract

**Files:**
- Create: `tests/portfolio-content.test.mjs`

**Interfaces:**
- Consumes: `index.html` as UTF-8 text.
- Produces: a zero-dependency test command, `node tests/portfolio-content.test.mjs`, that exits non-zero when public content regresses.

- [ ] **Step 1: Write the failing tests**

```javascript
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
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `node tests/portfolio-content.test.mjs`

Expected: failures showing `p6` is not first, `p5` still exists, old trainee/creator claims remain, and approved project-lead evidence is absent.

- [ ] **Step 3: Commit the test contract together with the implementation in Task 2**

The test must remain failing until Task 2 changes the public page.

### Task 2: Bilingual resume-aligned page content

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: the existing `data-i18n` keys and project media paths.
- Produces: five project cards in the order `p6`, `p1`, `p2`, `p3`, `p4`; updated English and Chinese dictionaries; unchanged visual and interaction code.

- [ ] **Step 1: Move and rewrite the AI project card**

Move the existing `work.p6.*` card before `work.p1.*`. Keep the existing `assets/projects/6-*` media, and replace the default English card copy with the approved project-lead scope, end-to-end multimodal flow, launch timing, and reliability/versioning outcomes.

- [ ] **Step 2: Remove the food-delivery card and dictionary entries**

Delete the full `work.p5.*` card from the markup and delete all `work.p5.*` keys from both `en` and `zh` dictionaries. Leave the unused media files untouched because asset cleanup is outside the approved scope.

- [ ] **Step 3: Update positioning in both languages**

Change hero, About, and Contact copy to position Fay as an AI Product Manager focused on multimodal AI products and 0-1 delivery. Replace trainee wording in the tree and carbon-system roles with accurate project-ownership wording. Keep all verified metrics unchanged.

- [ ] **Step 4: Run the tests and verify GREEN**

Run: `node tests/portfolio-content.test.mjs`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 5: Confirm the diff is surgical**

Run: `git diff --check` and `git diff --stat`.

Expected: no whitespace errors; only `index.html`, the test, plan, and status files are changed.

### Task 3: Browser acceptance and publication

**Files:**
- Modify: `status.md`

**Interfaces:**
- Consumes: the updated static site served from the worktree.
- Produces: verified desktop/mobile English/Chinese behavior and a fast-forward update of `origin/main`.

- [ ] **Step 1: Start a local static server**

Run a hidden local server from the worktree on an available loopback port and open its URL in the in-app browser.

- [ ] **Step 2: Verify desktop and mobile behavior**

At desktop and mobile widths, confirm: AI project is first; five cards are visible; Chinese and English language switching works; the first card expands; its video/image media open; no horizontal overflow or clipped headings appears.

- [ ] **Step 3: Run final verification**

Run `node tests/portfolio-content.test.mjs`, `git diff --check`, and inspect `git status --short` at the final HEAD.

- [ ] **Step 4: Commit and publish**

Commit the approved files on `codex/portfolio-v4-sync`, fetch `origin`, verify the branch still fast-forwards `origin/main`, then push `HEAD:main`.

- [ ] **Step 5: Verify the public site**

Open `https://yfyu0819-hub.github.io/` with a cache-busting query and confirm the live page shows the new first project and updated AI Product Manager positioning. Record the final commit and checks in `status.md`.
