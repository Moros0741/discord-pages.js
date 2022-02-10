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

const { 
	MessageEmbed, 
	MessageActionRow, 
	MessageButton 
} = require("discord.js");

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
  perPage = 1;
  curpage = 1;
  pageCount = 1;
  components = new MessageActionRow();
  contents = [];
  constructor(paginatorOptions = { pages, perPage, pageCount }) {
    this.pages = paginatorOptions.pages ? paginatorOptions.pages : [];
    this.perPage = paginatorOptions.perPage ? paginatorOptions.perPage : 1;
    this.pageCount = paginatorOptions.pageCount
      ? paginatorOptions.pageCount
      : 1;
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

  setContents(...contents) {
    this.contents = contents;
  }

  getPage(pageNumber) {
    return this.pages[pageNumber - 1];
  }

  getContent(index) {
    return this.contents[index];
  }

  getPages() {
    return this.pages;
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

  getPageLimit() {
    return this.perPage;
  }
}

class Page extends MessageEmbed {}

// --------------------------------------
//              TESTING
//---------------------------------------

const paginator = new Paginator({
  perPage: 5,
  pageCount: 1,
});
paginator.addPages(
  new Page()
    .setTitle("HELLO KITTY")
    .setDescription("Welcome to Neon Cat")
    .setColor("DEFAULT")
    .setURL("https://lockbot.dev"),
  new Page()
    .setTitle("Welcome again")
    .setDescription("Hello again to Neon Cat")
    .setColor("DEFAULT")
    .setURL("https://lockbot.dev")
);
paginator.setEmojis({
  Back: ":back:",
  Forward: ":forward:",
  Close: ":x:",
});
