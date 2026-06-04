return /* css */`

#kireji_app button {
 font-size: var(--default-font-size);
}

#kireji_app editor- {
 position: absolute;
 top: 0;
 left: var(--sidebar-width);
 right: 0;
 bottom: 0;
}

#kireji_app editor-view {
 container-type: inline-size;
 container-name: editor-view;
 position: absolute;
 top: calc(var(--tab-group-height) + var(--crumbs-height));
 left: 0;
 right: 0;
 bottom: 0;
 overflow: clip;
}

#kireji_app editor-[data-drop-target] :is(editor-view, crumbs-)::after {
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 background: var(--bg-light-er);
 opacity: 0.35;
}

#kireji_app crumbs- {
 position: absolute;
 top: var(--tab-group-height);
 left: 0;
 right: 0;
 height: var(--crumbs-height);
 line-height: var(--crumbs-height);
 display: flex;
 padding: 0 calc(var(--spacing) / 2);
}

#kireji_app crumbs->span {
 display: block;
 transform: translateX(calc(100% / -6)) rotateZ(-45deg) scale(calc(1 / 3));
 box-shadow: 3px 3px 0 0 var(--fg);
 width: var(--crumbs-height);
}

#kireji_app crumbs->a:last-of-type {
 pointer-events: none;
 text-decoration: none;
 color: inherit;
}

#kireji_app crumbs->a:not(:hover) {
 text-decoration: none;
}

#kireji_app button .modifier {
 color: var(--accent-mode);
}

#kireji_app button .readonly {
 color: var(--accent-un-mode-er);
}

#kireji_app button .function {
 color: darkkhaki;
}

#kireji_app button .string {
 color: darksalmon;
}

body.light #kireji_app button .modifier {
 color: var(--accent-mode);
}

body.light #kireji_app button .readonly {
 color: var(--accent-un-mode-er);
}

body.light #kireji_app button .function {
 color: darkgoldenrod;
}

body.light #kireji_app button .string {
 color: sienna;
}

body.light #kireji_app editor-[data-drop-target] :is(editor-view, crumbs-)::after {
 background: var(--accent-light-er);
}

#kireji_app editor-view>scroller->scroll-content {
 padding: 0;
 gap: 0;
 display: flex;
 flex-flow: column;
}

#kireji_app editor-view>scroller->scroll-content:has(#file-viewer) {
 padding: 0;
}

#kireji_app editor-:has(#tab-group:empty) editor-view>scroller->scroll-content {
 display: flex;
 flex-flow: column nowrap;
 align-items: center;
 justify-content: center;
 height: 100%;
 color: var(--bg-un-mode);
}

#kireji_app editor-:has(#tab-group:empty) editor-view>scroller->scroll-content>svg {
 opacity: 50%;
}

#kireji_app:has(#tab-group:empty) :is(editor-view>scroll-bar, crumbs-) {
 display: none;
}

#kireji_app:has(#tab-group:empty) editor-view>scroller- {
 margin-right: 0;
 width: 100%;
 transform: unset !important;
 height: 100%;
}

#file-viewer {
 margin: 0;
 padding: 0;
 counter-reset: ln;
 padding-bottom: calc(100vh - var(--tab-group-height) - var(--crumbs-height) - var(--task-bar-height) - var(--warning-height) - var(--code-line-height) - var(--title-bar-height));
}

#kireji_app editor-view>scroller-:has(#file-viewer) {
 --code-line-height: calc(var(--default-font-size) + 4px);
 line-height: var(--code-line-height);
}

#file-viewer {
 font-family: var(--system-ui-mono);
 display: flex;
 flex-direction: column;
 user-select: text;
 -webkit-user-select: text;
 -ms-user-select: text;
 cursor: text;
}

#file-viewer .code-line {
 display: block;
 position: relative;
 padding-left: 5em;
 margin: 0;
}

#file-viewer code {
 white-space: pre-wrap;
 hyphens: none;
 overflow-wrap: anywhere;
}

#file-viewer .line-number {
 display: block;
 position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 width: 5em;
 padding: 0 1em;
 text-align: right;
 color: var(--bg-un-mode);
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 -ms-user-select: none;
}

#kireji_app editor-view>scroller->scroll-content>section>h1 {
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
}

#kireji_app #description {
 white-space: pre-wrap;
}

#kireji_app #description[disabled] {
 display: none;
}


#kireji_app #part-intro {
 margin: var(--spacing);
}

#kireji_app #part-intro>* {
 vertical-align: middle;
}

#kireji_app #part-intro>div {
 display: inline-block;
}

#kireji_app #part-intro>img {
 width: 64px;
 margin-right: var(--spacing);
}

#kireji_app part-rows {
 width: 100%;
 padding: 0px 1px;
 display: flex;
 flex-flow: column;
}

#kireji_app part-rows>button {
 display: grid;
 grid-template-columns: 1fr;
 grid-template-columns: 1fr auto;
 line-height: var(--tab-line-height);
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
 position: relative;
 text-align: left;
 width: 100%;
}

#kireji_app part-rows>button>img {
 position: absolute;
 width: var(--tab-icon-size);
 height: var(--tab-icon-size);
 left: calc(var(--spacing) / 2.5 + 2px);
 top: calc((100% - var(--tab-icon-size)) / 2);
}

#kireji_app part-rows>button>.icon {
 position: absolute;
 left: 0;
 width: calc(1.5 * var(--spacing));
 text-align: center;
}

body.modern #kireji_app part-rows>button {
 padding-left: calc(2.25 * var(--spacing));
 padding-right: calc(0.5 * var(--spacing));
}

body.vintage #kireji_app part-rows>button {
 padding: calc(0.5 * var(--spacing));
 padding-top: 1px;
 padding-left: calc(2.25 * var(--spacing));
 box-shadow:
  inset 0 1px 0 0 var(--bg-light-er),
  inset 0 -1px 0 0 var(--bg-dark);
}

body.vintage #kireji_app part-rows>button[data-drop-target] {
 padding-left: calc(2.5 * var(--spacing) + 1px);
 padding-right: calc(0.5 * var(--spacing) + 1px);
 padding-top: 2px;
 padding-bottom: calc(0.5 * var(--spacing) - 1px);
 box-shadow:
  inset 0 1px 0 0 var(--bg-dark-est),
  inset 0 -1px 0 0 var(--bg-light-est),
  inset 0 2px 0 0 var(--bg-dark),
  inset 0 -2px 0 0 var(--bg-dark),
  inset -1px 0 0 0 var(--bg-dark),
  inset 1px 0 0 0 var(--bg-dark),
  inset -2px 0 0 0 var(--bg),
  inset 2px 0 0 0 var(--bg);
 width: calc(100% + 2px);
 left: -1px;
}


#kireji_app editor-view>scroller->scroll-content :is(h1, h2, h3, summary) {
 margin: 0;
}

#info-components a:not(:hover) {
 text-decoration: none;
}

#kireji_app .info-section:not(#info-about)>section:not([disabled])> :is(pre, p) {
 overflow: hidden;
}

#kireji_app :is(#info-state, #info-state-space)>section[disabled]>:not(.disabled-message),
#kireji_app :is(#info-state, #info-state-space)>section:not([disabled])>.disabled-message {
 display: none;
}

/* Hide issues for now. */
#kireji_app #info-issues {
 display: none;
}

body.modern #kireji_app editor-view {
 box-shadow:
  inset -2px 0 0 -1px var(--bg-un-mode);
}

body.modern.light #kireji_app :is(editor-view, crumbs-) {
 background-color: var(--bg-light-est);
}

body.modern.dark #kireji_app :is(editor-view, crumbs-) {
 background-color: var(--bg-mode);
}

@container editor-view (width > 350px) {
 body.modern #kireji_app #info-state-space>section:not([disabled])>:is(p, h3) {
  display: inline-block;
 }

 body.modern #kireji_app #info-state-space>section:not([disabled])>:is(p, math) {
  float: right;
  margin: 0;
 }
}

body.modern #kireji_app:has(#tab-group:empty) editor-view {
 top: 0;
}

body.modern #kireji_app .info-section {
 padding: 0;
 border-radius: 3px;
}

body.modern #kireji_app .info-section>summary {
 padding: calc(var(--spacing) / 2);
 margin: 0;
 box-shadow:
  inset 0 -1px 0 0 var(--bg-dark);
}

body.modern #kireji_app .info-section>.info-body {
 margin: 0;
 padding: 0;
}

body.modern #kireji_app .info-section>summary {
 cursor: pointer;
 font-weight: bold;
}

body.modern #kireji_app [disabled] {
 color: var(--fg-mode-er);
}

#kireji_app .info-section:has(>section[disabled]),
#kireji_app .info-section:has(>section:empty) {
 display: none;
}

body.modern #kireji_app .info-section:has(>section[disabled])>summary {
 background-color: var(--bg-light);
}

body.vintage #kireji_app editor- {
 left: calc(6px + var(--sidebar-width));
 top: 12px;
 right: 6px;
 bottom: 6px;
}

body.vintage #kireji_app editor-::before {
 box-shadow: var(--deep-inset);
 position: absolute;
 top: calc(var(--tab-group-height) - 2px + var(--crumbs-height) + 2px);
 right: -2px;
 left: -2px;
 bottom: -2px;
}

body.vintage #kireji_app editor-::after {
 content: "";
 position: absolute;
 box-shadow: var(--outset);
 top: calc(var(--tab-group-height) - 6px);
 height: calc(var(--crumbs-height) + var(--spacing) / 2 + 2px);
 left: 0;
 right: 0;
 pointer-events: none;
}

body.vintage #kireji_app #info-state-space>section>math {
 text-align: right;
 margin: calc(.5 * var(--spacing));
 width: min-content;
 justify-self: end;
}

@container editor-view (width > 350px) {
 body.vintage #kireji_app #info-state-space>section {
  display: grid;
  grid-template-columns: max-content 1fr;
 }

 body.vintage #kireji_app #info-state-space>section>h3 {
  align-self: center;
  margin-right: 1ch;
 }
}

body.vintage #kireji_app editor-view {
 top: calc(var(--tab-group-height) + var(--crumbs-height) + 2px);
}

body.vintage #kireji_app editor-view:not(:has(#file-viewer)) {
 background-color: var(--bg);
}

body.vintage #kireji_app editor-:has(#tab-group:empty) editor-view {
 top: 0;
}

body.vintage #kireji_app editor-:has(#tab-group:empty)::before {
 content: unset;
}

body.vintage #kireji_app editor-:has(#tab-group:empty)::after {
 top: -8px;
}

body.vintage #kireji_app crumbs- {
 top: calc(var(--tab-group-height) - 2px);
 left: -2px;
 right: -2px;
}

body.vintage #kireji_app #file-viewer {
 padding-bottom: calc(100vh - var(--tab-group-height) - var(--crumbs-height) - var(--task-bar-height) - var(--warning-height) - var(--title-bar-height) - var(--code-line-height) - 24px);
}

body.vintage.light #kireji_app editor-view {
 background-color: white;
}

body.vintage.dark #kireji_app editor-view {
 background-color: var(--bg);
}

body.vintage #kireji_app #description {
 margin: 0;
}

body.vintage #kireji_app .info-section {
 position: relative;
 box-shadow: var(--deep-outset);
}

body.vintage #kireji_app .info-section>summary {
 font-weight: 400;
 line-height: var(--tab-line-height);
 margin: 0;
 padding: calc(var(--spacing) / 3);
 font-size: var(--default-font-size);
 pointer-events: all;
}

body.vintage #kireji_app h3 {
 font-size: inherit;
 font-weight: inherit;
}

body.vintage #kireji_app :not(#part-intro>div)>h3::after {
 content: ":";
}

body.vintage #kireji_app .info-section:not(#info-about)>section:not([disabled])> :is(pre, p) {
 box-shadow: var(--deep-inset);
 padding: 5px 4px 9px 4px;
 background: white;
 margin: 4px 0;
 white-space: pre;
 word-wrap: none;
}

body.vintage #kireji_app .info-section:not(#info-about)>section:not([disabled])> :is(pre, p):focus {
 user-select: text;
}

body.dark.vintage #kireji_app .info-section:not(#info-about)>section:not([disabled])> :is(pre, p) {
 background: transparent;
}

` +
 KirejiTabGroup["part.css"]