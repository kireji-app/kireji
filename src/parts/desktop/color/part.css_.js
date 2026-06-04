return `html, body {
 /* All six theme colors without shading. */

 --light-fg: ${_.openTask.lightFgTheme};
 --light-bg: ${_.openTask.lightBgTheme};
 --light-accent: ${_.openTask.lightAccentTheme};
 --dark-fg: ${_.openTask.darkFgTheme};
 --dark-bg: ${_.openTask.darkBgTheme};
 --dark-accent: ${_.openTask.darkAccentTheme};

 /* Absolute shades of each color. */

 --accent-light-est: ${Color.lightEstAccent};
 --accent-light-er: ${Color.lightErAccent};
 --accent-light: ${Color.lightAccent};
 --accent: ${Color.accent};
 --accent-dark: ${Color.darkAccent};
 --accent-dark-er: ${Color.darkErAccent};
 --accent-dark-est: ${Color.darkEstAccent};

 --accent-un-light-est: ${Color.unLightEstAccent};
 --accent-un-light-er: ${Color.unLightErAccent};
 --accent-un-light: ${Color.unLightAccent};
 --accent-un: ${Color.unAccent};
 --accent-un-dark: ${Color.unDarkAccent};
 --accent-un-dark-er: ${Color.unDarkErAccent};
 --accent-un-dark-est: ${Color.unDarkEstAccent};

 --fg-light-est: ${Color.lightEstFg};
 --fg-light-er: ${Color.lightErFg};
 --fg-light: ${Color.lightFg};
 --fg: ${Color.fg};
 --fg-dark: ${Color.darkFg};
 --fg-dark-er: ${Color.darkErFg};
 --fg-dark-est: ${Color.darkEstFg};

 --bg-light-est: ${Color.lightEstBg};
 --bg-light-er: ${Color.lightErBg};
 --bg-light: ${Color.lightBg};
 --bg: ${Color.bg};
 --bg-dark: ${Color.darkBg};
 --bg-dark-er: ${Color.darkErBg};
 --bg-dark-est: ${Color.darkEstBg};

 /* Color-mode relative shades of each color. */

 --accent-mode-est: ${Color.modeEstAccent};
 --accent-mode-er: ${Color.modeErAccent};
 --accent-mode: ${Color.modeAccent};
 --accent-un-mode: ${Color.unModeAccent};
 --accent-un-mode-er: ${Color.unModeErAccent};
 --accent-un-mode-est: ${Color.unModeEstAccent};

 --fg-mode-est: ${Color.modeEstFg};
 --fg-mode-er: ${Color.modeErFg};
 --fg-mode: ${Color.modeFg};
 --fg-un-mode: ${Color.unModeFg};
 --fg-un-mode-er: ${Color.unModeErFg};
 --fg-un-mode-est: ${Color.unModeEstFg};

 --bg-mode-est: ${Color.modeEstBg};
 --bg-mode-er: ${Color.modeErBg};
 --bg-mode: ${Color.modeBg};
 --bg-un-mode: ${Color.unModeBg};
 --bg-un-mode-er: ${Color.unModeErBg};
 --bg-un-mode-est: ${Color.unModeEstBg};
}`