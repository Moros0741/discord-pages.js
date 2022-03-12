/*
MIT License
Copyright (c) 2022 Moros0741

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/////////////////////////////////////////////
//            CHORE:
////////////////////////////////////////////
/* 
- Fix while looop in buildPages 
- Add sendables function.
- create message component handler. 
*/

const chunker = require("./modules/chunker");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const { TypeError, SendableError, ContentsError } = require("./errors/Errors");

function buildComponents() {
  return [
    new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Back")
      .setCustomId("page-back"),
    new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Forward")
      .setCustomId("page-forward"),
    new MessageButton()
      .setStyle("DANGER")
      .setLabel("Close")
      .setCustomId("page-close"),
  ];
}

class Paginator {
  pages = [];
  contentType = "SINGLE"; // SINGLE, MULTIPLE, FIELDS
  perPage;
  curpage = 1;
  components = new MessageActionRow();
  contents = [];
  constructor(paginatorOptions = { perPage, contentType }) {
    if (paginatorOptions.contentType) {
      const accepted = ["SINGLE", "MULTIPLE", "FIELD"];
      if (accepted.includes(paginatorOptions.contentType.toUpperCase())) {
        this.type = paginatorOptions.contentType.toUpperCase();
      } else {
        throw new TypeError(
          paginatorOptions.contentType.toUpperCase() +
            "\n" +
            'Valid types are: "SINGLE", "MULTIPLE", or "FIELD"'
        );
      }
    }
    this.perPage = paginatorOptions.perPage > 1 ? paginatorOptions.perPage : 1;
    const components = buildComponents();
    this.components.addComponents(components);
  }
  addPages(...pages) {
    return (this.pages = pages);
  }
  setEmojis(emojis = { Back, Forward, Close }) {
    if (emojis.Back) {
      this.components.components[0]?.setEmoji(emojis.Back);
    }

    if (emojis.Forward) {
      this.components.components[1]?.setEmoji(emojis.Forward);
    }

    if (emojis.Close) {
      this.components.components[2]?.setEmoji(emojis.Close);
    }
  }
  setContents(contents) {
    if (!Array.isArray(contents)) {
      throw new TypeError(
        "setContents() only takes type Array. Not type " +
          String(typeof contents)
      );
    }
    this.contents = contents;
  }
  getPage(pageNumber) {
    return this.pages[pageNumber - 1];
  }
  getContent(index) {
    return this.contents[index];
  }
  getPages() {
    return this.buildPages();
  }
  getContents() {
    return this.contents;
  }
  getCurrentPage() {
    return this.curpage;
  }
  getTotalPages() {
    return this.pageCount;
  }
  getType() {
    return this.type;
  }
  getPageLimit() {
    return this.perPage;
  }
  buildPages() {
    if (this.contents.length === 0) {
      throw new ContentsError(
        "No Contents Found. Use setContents() to add some."
      );
    }
    let chunkedArray;

    let i = this.pages.length;
    let c = Math.floor(this.contents.length / this.perPage);
    if (c > i) {
      while (i < c) {
        let page = this.pages[0];
        this.pages.push(page);
        i++;
      }
    }

    if (this.contents.length > this.perPage) {
      chunkedArray = chunker.execute(this.contents, this.perPage);
    } else if (this.contents.length <= this.perPage) {
      chunkedArray = this.contents;
    }
    let n = 0;
    this.pages.forEach((page) => {
      let string = "";
      //Line 155 to prevent RangeError on chunkedArray[n] on line 156;
      if ((n + 1) < this.pages.length) {
        for (const item of chunkedArray[n]) {
          switch (this.type) {
            case "SINGLE":
              string += String(item);
              string += "\n";
              break;
            case "MULTIPLE":
              page.addField("\u200b", `${item}`, false);
              break;
            case "FIELD":
              page.addField(
                `${item[`name`]}`,
                `${item[`value`]}`,
                item[`inline`]
              );
              break;
          }
        }
        if (this.type === "SINGLE") {
          page.addField("\u200b", string, false);
        }
      };
      n++;
    });
    return this.pages;
  }

  async start(sendable) {
    try {
      await send(this, sendable);
    } catch (err) {
      msg =
        "INVALID TYPE: Sendable is not of Type: TEXT_CHANNEL, DEFAULT MessageType, or APPLICATION_COMMAND";
      console.log(msg, err);
      return msg, err;
    }
  }
}

class Page extends MessageEmbed {}

// --------------------------------------
//              TESTING
//---------------------------------------

const paginator = new Paginator({
  perPage: 3,
  contentType: "MULTIPLE",
});
paginator.addPages(
  new Page()
    .setTitle("Hello World")
    .setDescription("This is Page One")
    .setColor("DEFAULT")
);

paginator.setContents([1, 2, 3, 4, 5, 6]);
console.log("Per Page ", paginator.getPageLimit());
const pages = paginator.buildPages();
for (const page of pages) {
  console.log(page.fields);
}
