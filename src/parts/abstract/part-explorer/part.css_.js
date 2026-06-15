return /* css */`
#${thisPartExplorer.host.replace(".", "_")} {
 display: flex;
 flex-flow: column nowrap;
 overflow: hidden;

 .about {
  padding: var(--spacing);

  body.modern & {
   box-shadow: 0 1px 0 0 var(--border-color);
  }
 }

 .parts {
  position: relative;
  overflow: hidden;
  flex-grow: 1;

  scroll-bar {
   right: 2px;
   top: 2px;
   bottom: 2px;
  }

  body.vintage & {
   padding: 2px;

   &::after {
    pointer-events: none;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow: var(--deep-inset);
   }
  }
 }

 .parts>scroller->scroll-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--tile-width), 1fr));
  justify-items: center;
  overflow: none;

  body.modern & {
   padding: var(--spacing);
   gap: var(--spacing);
   --tile-width: 128px;
  }

  body.vintage & {
   --tile-width: 96px;
  }

  >.part-tile {
   align-items: center;
   position: relative;
   display: flex;
   flex-flow: column nowrap;
   width: 100%;

   img {
    width: 64px;

    body.modern & {
     margin: 32px;
    }

    body.vintage & {
     margin: 11px;
    }
   }

   body.vintage & {
    box-shadow: var(--deep-outset);
   }

   body.modern & {
    height: 160px;
    cursor: pointer;
    background: var(--bg);
    border-radius: calc(var(--spacing) / 2);
    box-shadow: var(--border-color);
   }

   h2 {
    padding: calc(var(--spacing) / 3);
    margin: 0;
    font: inherit;
   }
  }
 }
}
`