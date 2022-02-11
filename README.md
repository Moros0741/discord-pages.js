# paginator.js
[![CodeQL](https://github.com/Moros0741/paginator.js/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Moros0741/paginator.js/actions/workflows/codeql-analysis.yml)

 Simple JavaScript module for paginating discord embeds

## NOTICES

This module is **Still Under Development**. It is not recommeded for you to install whether by copying the contents of the src folder or installing with NPM.

## Reporting Issues

Before reporting any issues or suggesting features please visit our [Issue Templates](.github/ISSUE_TEMPLATES) to better understand what we consider great issues.

## Contributing

We are always interested in contributions! You can see how to contribute [here](CONTRIBUTING.md)

## Example

```js
const { Paginator, Page } = require("paginator.js");

// Create paginator instance, tell it how many contents per page we want and how many pages 
const paginator = new Paginator({
  perPage: 5,
  pageCount: 2
});

// Add pages to the paginator, Adding one page with more contents than you
// permitting per page will tell the module you want to use the same page multiple times.
paginator.addPages(
  new Page()
    .setTitle("Hello World!")
    .setColor("DEFAULT"),
  new Page()
    .setTitle("Hello Space!")
    .setColor("GOLD")
);

// Set the contents you want to break up between pages.
// An array of strings, numbers, or even EmbedField Objects will allow
// paginator.js to tailor contents to your specific needs
paginator.setContents(["1", "2", "3", "4", "5", "6"]);

// Can't waste all this "Hard Work" Initiate your created pages
// and send to Discord. 
// sendable = interaction, channel, member objects
return paginator.start(sendable);
```

