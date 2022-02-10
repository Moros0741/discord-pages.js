# paginator.js
[![CodeQL](https://github.com/Moros0741/paginator.js/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Moros0741/paginator.js/actions/workflows/codeql-analysis.yml)

 Simple JavaScript module for paginating discord embeds

## Example

```
cosnt { Paginator, Page } = require("paginator.js");

const paginator = new Paginator({
  perPage: 5
});

paginator.addPages(
  new Page()
    .setTitle("Hello World!")
    .setColor("DEFAULT"),
  new Page()
    .setTitle("Hello Space!")
    .setColor("GOLD")
);

paginator.setContents(["1", "2", "3", "4", "5", "6"]);

return paginator.start(sendable);
```
