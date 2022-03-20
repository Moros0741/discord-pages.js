---
description: A simple JavaScript module for paginating Discord embeds
---

# discord-pages.js

### Installing discord-pages.js

Installing discord-pages.js from npm registry:

```bash
npm i discord-pages.js
```

### Basic Setup

Setting up discord-pages is as simple as importing, instantiating and starting. Here's a basic example...

```javascript
const {Paginator, Page } = require('discord-pages.js');

 const paginator = new Paginator({
   perPage: 5,
   contentType: "SINGLE"
 });
 
paginator.setContents([1,2,3,4,5])
paginator.addPages(
  new Page()
    .setTitle('Page One')
    .setColor("BLUE"),
  new Page()
    .setTitle("Page Two")
    .setColor("GOLD")
);

 await paginator.start(sendable, user); 
```
