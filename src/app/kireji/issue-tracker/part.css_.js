return (
 KirejiIssueFilters["part.css"] +
 KirejiIssuesActiveOverlay["part.css"] +
 /* css */`

#issue-tracker_kireji_app {
 display: flex;
 flex-flow: column nowrap;

 body.modern & {
  --border-color: var(--bg-un-mode);
  background-color: var(--bg-mode-er);
 }

 body.vintage & {
  padding: 2px;
  box-shadow: var(--deep-inset);


  :is(.issue-table, .issue-links) {
   background: var(--bg-page);
  }
 }

 &:has(#kireji-issue-modal:not(:empty), #command-palette.open) {
  pointer-events: none;
 }

 :is(.issue-status, .issue-priority, .issue-date) {
  width: var(--column-width);
  display: inline-block;

  body.modern :not(.header)>& {
   border-radius: calc(var(--spacing) / 4);
   font-weight: 600;
   font-size: calc(var(--spacing) * .7);
   text-align: center;
   line-height: inherit;
  }
 }

 :is(.issue-status, .issue-date) {
  white-space: nowrap;
 }

 .issue-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  
  body.modern & {
   font-weight: 500;
   padding-left: var(--spacing);
  }
 }

 :is(.issue-table>scroller->scroll-content, .issue-links) {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
 }

 .issue-row {
  position: relative;
  display: flex;
  text-decoration: none;
  color: inherit;

  >* {
   line-height: var(--spacing);

   body.vintage & {
    padding: 4px;
   }
  }

  >span {
   position: relative;
  }

  body.modern & {
   padding: calc(var(--spacing) / 2) 0;

   &:not(.header) {
    border-radius: calc(var(--spacing) / 4);
    cursor: pointer;

    &:hover {
     background: var(--bg-un-mode);
    }
   }
  }

  body.vintage & {
   
   &:not(.header):hover {
    background-color: var(--accent);
    color: var(--bg-page);
   }
  }
 }

 .issue-date {

  body.vintage & {
   --column-width: calc(7 * var(--spacing));
  }

  body.modern & {
   --column-width: calc(7 * var(--spacing));
  }
 }

 .issue-status {

  body.vintage & {
   --column-width: 76px;
  }

  body.modern & {
   --column-width: calc(6 * var(--spacing));

   :not(.header)>& {

    [data-status="to-do"]>& {
     color: steelblue;
     background-color: powderblue;

     body.dark & {
      color: powderblue;
      background-color: steelblue;
     }
    }

    [data-status="doing"]>& {
     color: brown;
     background-color: wheat;

     body.dark & {
      color: wheat;
      background-color: peru;
     }
    }

    [data-status="done"]>& {
     color: seagreen;
     background-color: palegreen;

     body.dark & {
      color: palegreen;
      background-color: seagreen;
     }
    }
   }
  }
 }

 .issue-priority {

  body.vintage & {
   --column-width: 42px;
  }

  body.modern & {
   --column-width: calc(4 * var(--spacing));


   [data-priority="A"]>& {
    color: red;
   }

   [data-priority="B"]>& {
    color: orange;
   }

   [data-priority="C"]>& {
    color: green;
   }
  }
 }

 .issue-table {
  min-height: 0;
  position: relative;
  overflow: hidden;
  flex: 1;

  body.modern & {
   background: var(--bg-light-est);

   body.dark & {
    background: var(--bg-mode);
   }
  }
 }

 body.vintage & .issue-links {
  padding: 2px;
  box-shadow: var(--deep-inset);
 }
}

`)