const src = `data:image/png;base64,${_.openTask["part.png"]}`

return serialize({
 name: _.openTask.title ?? "Untitled App",
 short_name: _.openTask.title ?? "untitled",
 start_url: `/${_.version}/${_.landingHash}/`,
 scope: `/${_.version}/`,
 display: "standalone",
 theme_color: Color.bg,
 background_color: Color.bg,
 icons: [
  {
   src,
   sizes: "192x192",
   type: "image/png",
   purpose: "any maskable"
  },
  {
   src,
   sizes: "512x512",
   type: "image/png",
   purpose: "any maskable"
  }
 ],
 description: _.openTask.description ?? "This is a part of something bigger.",
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)