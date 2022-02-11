# paginator.js
[![CodeQL](https://github.com/Moros0741/paginator.js/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Moros0741/paginator.js/actions/workflows/codeql-analysis.yml)

 Simple JavaScript module for paginating discord embeds and handling corresponding buttons

## NOTICES

This module is **Still Under Development**. It is not recommeded for you to install whether by copying the contents of the src folder or installing with NPM.

## Reporting Issues

Before reporting any issues or suggesting features please visit our [Issue Templates](.github/ISSUE_TEMPLATE) to better understand what we consider great issues.

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

// Extension of MessageEmbed from discord.js has all the same features as MessageEmbed but with
// Array functionality of addComponents from MessageActionRow in discord.js
paginator.addPages(
  new Page()
    .setTitle("Hello World!")
    .setColor("DEFAULT"),
  new Page()
    .setTitle("Hello Space!")
    .setColor("GOLD")
);

// the array of data to be broken up and placed on the different pages.
paginator.setContents(["1", "2", "3", "4", "5", "6"]);

// Starts the Paginator and sends it to discord (buttons handled within module); 
// sendable = interaction, channel, or member object to send pages to.
return paginator.start(sendable);
```

