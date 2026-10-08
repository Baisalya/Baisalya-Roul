import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { initIdentityCard } from '../src/site/interactions/identity-card.js';
import { initNavigation } from '../src/site/core/navigation.js';

// Small event fixture keeps these interaction regressions runnable without a browser dependency.
class Element {
  listeners = new Map();
  attributes = new Map();
  children = [];
  dataset = {};
  hidden = false;
  open = false;
  classes = new Set();
  classList = {
    contains: name => this.classes.has(name),
    add: name => this.classes.add(name),
    remove: name => this.classes.delete(name),
    toggle: (name, force = !this.classes.has(name)) => {
      force ? this.classes.add(name) : this.classes.delete(name);
      return force;
    },
  };
  addEventListener(name, handler) {
    this.listeners.set(name, [...(this.listeners.get(name) || []), handler]);
  }
  fire(name, props = {}) {
    for (const handler of this.listeners.get(name) || []) handler({ target: this, ...props });
  }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  contains(target) { return this === target || this.children.some(child => child.contains(target)); }
  closest(selector) { return this.selector && selector.includes(this.selector) ? this : null; }
  querySelector() { return null; }
  querySelectorAll() { return this.children; }
  getBoundingClientRect() { return { left: 20, right: 370, top: 8, bottom: 836 }; }
  showModal() { this.open = true; }
  close() { this.open = false; this.fire('close'); }
}
function environment(selectors, ids = {}, lists = {}) {
  const doc = new Element();
  doc.body = new Element();
  doc.documentElement = new Element();
  doc.querySelector = selector => selectors[selector] || null;
  doc.querySelectorAll = selector => lists[selector] || [];
  doc.getElementById = id => ids[id] || null;
  const media = new Map();
  const win = new Element();
  win.scrollY = 0;
  win.scrollTo = () => {};
  win.matchMedia = query => {
    if (!media.has(query)) media.set(query, new Element());
    return media.get(query);
  };
  return { doc, win, media };
}

const trigger = new Element();
const aboutTrigger = new Element();
const dialog = new Element();
const close = new Element();
close.selector = '[data-identity-close]';
const cardContent = new Element();
let env = environment({}, { 'identity-card': dialog }, {
  '[data-open-identity], #identity-trigger': [trigger, aboutTrigger],
});
globalThis.document = env.doc;
globalThis.window = env.win;
initIdentityCard();
trigger.fire('pointerup');
assert.equal(dialog.open, false, 'touch release must not open before its native click');
trigger.fire('click');
assert.equal(dialog.open, true, 'logo click opens the card');
assert.equal(env.doc.documentElement.classList.contains('identity-open'), true);
dialog.fire('click', { clientX: 0, clientY: 0 });
assert.equal(dialog.open, true, 'a retargeted opening click must not dismiss the card');
dialog.fire('pointerdown', { target: cardContent, clientX: 100, clientY: 100 });
dialog.fire('click', { clientX: 0, clientY: 0 });
assert.equal(dialog.open, true, 'dragging from the card onto its backdrop must not dismiss');
dialog.fire('pointerdown', { clientX: 0, clientY: 0 });
dialog.fire('click', { clientX: 0, clientY: 0 });
assert.equal(dialog.open, false, 'a deliberate backdrop tap closes');
assert.equal(aboutTrigger.getAttribute('aria-expanded'), 'false');
aboutTrigger.fire('click');
assert.equal(dialog.open, true, 'About button and keyboard-generated click open');
dialog.fire('click', { target: close });
assert.equal(dialog.hidden, true, 'close control hides the dialog');
assert.equal(env.doc.documentElement.classList.contains('identity-open'), false, 'closing releases page scroll');
trigger.fire('click');
dialog.fire('cancel');
assert.equal(dialog.open, false, 'Escape closes and allows reopening');
trigger.fire('click');
assert.equal(dialog.open, true);

const nav = new Element();
const menu = new Element();
const toggle = new Element();
const link = new Element();
nav.children = [menu, toggle];
env = environment({ '.professional-nav': nav }, { 'nav-menu': menu, 'nav-toggle': toggle }, {
  '.professional-nav .nav-link': [link],
});
globalThis.document = env.doc;
globalThis.window = env.win;
initNavigation();
toggle.fire('click');
assert.equal(toggle.getAttribute('aria-expanded'), 'true');
env.media.get('(max-width: 768px)').fire('change');
assert.equal(toggle.getAttribute('aria-expanded'), 'false', 'desktop/mobile transition resets menu');
toggle.fire('click');
env.doc.fire('click', { target: new Element() });
assert.equal(menu.classList.contains('active'), false, 'outside tap closes portfolio navigation');

const eduToggle = new Element();
const eduMenu = new Element();
const eduLink = new Element();
eduMenu.children = [eduLink];
env = environment({ '.menu-btn': eduToggle, '.nav-links': eduMenu });
vm.runInNewContext(await readFile('EduSheet/assets/js/site.js', 'utf8'), {
  document: env.doc, window: env.win, navigator: { userAgent: 'test' },
  localStorage: { getItem: () => null, setItem: () => {} },
});
eduToggle.fire('click');
assert.equal(env.doc.body.classList.contains('menu-open'), true);
assert.equal(eduToggle.getAttribute('aria-label'), 'Close menu');
env.media.get('(max-width:1040px)').fire('change');
assert.equal(env.doc.body.classList.contains('menu-open'), false, 'resizing releases body scroll lock');
eduToggle.fire('click');
eduLink.fire('click');
assert.equal(eduToggle.getAttribute('aria-expanded'), 'false', 'navigation releases lock before leaving');
eduToggle.fire('click');
env.doc.fire('keydown', { key: 'Escape' });
assert.equal(env.doc.body.classList.contains('menu-open'), false);
eduToggle.fire('click');
env.win.fire('pageshow');
assert.equal(eduMenu.classList.contains('mobile-open'), false, 'back/forward restores a closed menu');
console.log('Mobile interaction regressions: passed');
