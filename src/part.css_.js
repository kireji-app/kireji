const
 includeWarning = _.includeWarning === "enabled",
 includeDesktop = _.includeDesktop === "demo" || (_.command === "debug" && (_.includeDesktop === "full" || _.includeDesktop === "local-only"))

return /* css */`

html, body {
 --warning-height: ${includeWarning ? "26px" : "0px"};
 ${includeDesktop ? "" : `--title-bar-height: 0px !important;
 --task-bar-height: 0px !important;`}
 
 --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 --system-ui-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Mono", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Consolas", "Courier New", monospace;
 --menu-tween: 0;
 --h: 100vh;
 --wallpaper-height: calc(var(--h) - var(--task-bar-height) - var(--warning-height) - var(--title-bar-height));
 --wallpaper-width: 100vw;
 --padding: calc(3.5 * var(--spacing));
 --gap: calc(2.5 * var(--spacing));
 --scrollbar-width: 20px;
 --radius: calc(var(--spacing) / 2.5);
 --dppx: 1;
 --css-length-of-device-pixel: calc(1px / var(--dppx));
 overscroll-behavior: none;
 margin: 0;
 height: var(--h);
 font-synthesis: weight style;
 color: var(--fg);
 background: var(--bg);
 user-select: none;
 -webkit-user-select: none;
 -ms-user-select: none;

 /* Nested global modifiers and overrides */
 &:has(body.unhydrated) {
  cursor: wait;
 }

 ${includeWarning ? /* css */`
 @media (width < 390px) {
  --warning-height: 49px;
 }` : ""}

 @media (width < 640px) {
  --padding: var(--spacing);
  --gap: calc(1.5 * var(--spacing));
 }

 @supports (height: 100dvh) {
  --h: 100dvh;
 }

 @media (min-resolution: 2dppx) { --dppx: 2; }
 @media (min-resolution: 3dppx) { --dppx: 3; }
 @media (min-resolution: 4dppx) { --dppx: 4; }
}

*,
*::before,
*::after {
 box-sizing: border-box;
 -webkit-user-select: inherit;
 -ms-user-select: inherit;
 user-select: inherit;
}

[tabIndex] {
 outline: none;
}

#app-control {
 display: block;
 margin: 0;
 padding: 0;
 flex: 1 1;
 height: auto;
 overflow: hidden;
}

/* --- Pixel Art Engine Styles --- */

@property --ui-width { syntax: "<length>"; initial-value: 0px; inherits: true; }
@property --ui-height { syntax: "<length>"; initial-value: 0px; inherits: true; }
@property --ui-left { syntax: "<length>"; initial-value: 0px; inherits: true; }
@property --ui-top { syntax: "<length>"; initial-value: 0px; inherits: true; }
@property --d1px { syntax: "<length>"; initial-value: 0px; inherits: true; }

wallpaper- {
 --app-height: var(--wallpaper-height);
 --app-width: var(--wallpaper-width);
 position: fixed;
 top: calc(var(--warning-height) + var(--title-bar-height));
 height: var(--wallpaper-height);
 left: 0;
 right: 0;
 overflow: hidden;
 overflow: clip;
 touch-action: manipulation;
 container-type: size;
 container-name: design;

 > * {
  --design-pixels-per-tile: 20;
  --design-pixels-along-app-width: calc(var(--design-tiles-along-app-width) * var(--design-pixels-per-tile));
  --design-pixels-along-app-height: calc(var(--design-tiles-along-app-height) * var(--design-pixels-per-tile));
  --css-length-of-design-pixel-if-using-app-width: calc(var(--app-width) / var(--design-pixels-along-app-width));
  --css-length-of-design-pixel-if-using-app-height: calc(var(--app-height) / var(--design-pixels-along-app-height));
  --css-length-of-design-pixel: min(var(--css-length-of-design-pixel-if-using-app-width), var(--css-length-of-design-pixel-if-using-app-height));
  --design-pixel: max(var(--css-length-of-device-pixel), round(down, var(--css-length-of-design-pixel), var(--css-length-of-device-pixel)));
  --ui-width: calc(var(--d1px) * var(--design-pixels-along-app-width));
  --ui-height: calc(var(--d1px) * var(--design-pixels-along-app-height));
  --ui-left: calc((var(--app-width) - var(--ui-width)) / 2);
  --ui-top: calc((var(--app-height) - var(--ui-height)) / 2);

  /* Shortcuts */
  --d1px: calc(1 * var(--design-pixel));
  --d2px: calc(2 * var(--d1px));
  --d3px: calc(3 * var(--d1px));
  --d4px: calc(4 * var(--d1px));
  --d5px: calc(5 * var(--d1px));
  --d6px: calc(6 * var(--d1px));
  --d7px: calc(7 * var(--d1px));
  --d8px: calc(8 * var(--d1px));
  --d16px: calc(16 * var(--d1px));
  --d-1px: calc(-1 * var(--d1px));
  --d-2px: calc(-2 * var(--d1px));
  --d-3px: calc(-3 * var(--d1px));
  --d-4px: calc(-4 * var(--d1px));
  --d-5px: calc(-5 * var(--d1px));
  --d-6px: calc(-6 * var(--d1px));
  --d-7px: calc(-7 * var(--d1px));
  --d-8px: calc(-8 * var(--d1px));
  --d-16px: calc(-16 * var(--d1px));

  /* Cross-platform Firefox unit division fix */
  --design-scale: calc(10000 * tan(atan2(var(--d1px), 10000px))) !important;

  @container design (aspect-ratio > 1 / 1) {
   --design-tiles-along-app-width: 16;
   --design-tiles-along-app-height: 9;
  }

  @container design (aspect-ratio <= 1 / 1) {
   --design-tiles-along-app-width: 9;
   --design-tiles-along-app-height: 16;
  }
 }
}

/* --- UI Elements --- */

a {
 &, &:visited {
  color: var(--accent-light);
  text-decoration: underline;
  cursor: pointer;
 }

 &:hover {
  color: var(--fg-un-mode-er);
 }

 &.external {
  white-space: nowrap;

  &::after {
   content: '↗';
   color: inherit;
   display: inline-block;
   font-size: inherit;
   font-weight: 900;
   height: 1ch;
   width: 1ch;
   margin: 0 0.5ch;
   text-decoration: none;
  }
 }

 &[x-apple-data-detectors] {
  display: contents !important;
  pointer-events: none !important;
  color: inherit !important;
  text-decoration: none !important;
 }
}

pre {
 font-family: var(--system-ui-mono);
}

button {
 background: transparent;
 padding: 0;
 margin: 0;
 border: none;
 color: inherit;
 font-family: inherit;
 line-height: inherit;

 &:focus {
  outline: none;
 }
}

body.unhydrated :is(a, button) {
 pointer-events: none;
}

flex-spacer {
 flex: 1;
}

/* --- Scrolling Architecture --- */

scroller- {
 display: flow-root;
 transform: translateY(0);
 overflow: hidden;
 scrollbar-width: none;
 overscroll-behavior: none;

 &::-webkit-scrollbar {
  display: none;
 }

 &.locked {
  transform: translateY(var(--scroller-translate-y));
 }

 &:not(.locked) {
  overflow-y: auto;
  height: 100%;
 }
}

scroll-content {
 display: block;
 height: fit-content;
}

scroll-bar {
 position: absolute;
 right: 0;
 top: 0;
 bottom: 0;
 width: var(--scrollbar-width);

 > :is(.scroll-up, thumb-, .scroll-down) {
  position: absolute;
  right: 0;
  width: var(--scrollbar-width);
 }

 > thumb- {
  top: calc(var(--thumb-start) + var(--track-height) * var(--fraction));
  height: calc(var(--track-height) / var(--scroll-thumb-ratio));
 }

 &[disabled] > thumb- {
  display: none;
 }
}

/* --- Desktop Environment Shell Components --- */

warning- {
 height: var(--warning-height);
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 background-color: #f0bf64;
 font-weight: 500;
 font-size: 11px;
 line-height: 14px;
 padding: 7px;
 text-align: center;

 body.dark & {
  background-color: #644c08;
 }
}

title-bar {
 display: flex;
 flex-flow: row nowrap;
 margin: 0;
 padding: 0;
 height: var(--title-bar-height);
 line-height: var(--title-bar-height);
 position: fixed;
 top: var(--warning-height);
 left: 0;
 right: 0;

 > button {
  width: var(--icon-size);
 }

 > .hide:before { content: "_"; }
 > .restore:before { content: "☐"; }
 > .restore { display: none; } /* Temp */
 > .maximize:before { content: "⛶"; }
 > .close:before { content: "✕"; }
}

task-bar {
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;
 height: var(--task-bar-height);
 margin: 0;
 line-height: var(--task-bar-height);
 display: flex;

 > button {
  width: var(--icon-size);
  position: relative;
  margin-left: var(--spacing);
  margin-bottom: var(--spacing);
 }
}

task-menu {
 margin: 0;
 position: fixed;
 overflow: hidden;
 display: flex;
 flex-flow: column;
}

#settings>span,
#settings>a,
.toggle-control {
 display: flex;
 justify-content: space-between;
 padding: 5px;
 gap: 5px;
}

#settings {
 display: flex;
 flex-flow: column;

 > a {
  text-decoration: none;

  &:not([disabled]) {
   color: inherit;
  }
 }
}

.task-link {
 display: contents;

 > a {
  &, &:visited {
   text-decoration: none;
   color: inherit;
   display: flex;
   flex: 0;
   font-weight: 500;
   margin: 0;
   position: relative;
   align-items: center;
  }

  > .label {
   flex: 1 1;
  }
 }
}

.part-icon {
 height: var(--icon-size);
 width: var(--icon-size);
 border-radius: calc(var(--icon-size) * 0.2);
}

#logo {
 font-weight: 700;
}

#fullscreen-tray-item,
#share-tray-item {
 display: none !important;
}

#stats-tray-item,
#clock-tray-item {
 font-size: var(--default-font-size);
}

/* --- Media Elements --- */

img[src^="data:image/svg+xml;inert;"] {
 overflow: hidden;
 animation: loading-gradient 1.7s infinite linear;
 background: linear-gradient(to right, var(--bg-dark) 0%, var(--bg-light) 50%, var(--bg-dark) 100%), var(--bg-dark);
 background-size: 100% 100%;
 background-repeat: no-repeat;
 background-attachment: fixed;
}

@keyframes loading-gradient {
 0% { background-position: -100vw 0; }
 100% { background-position: 100vw 0; }
}
`