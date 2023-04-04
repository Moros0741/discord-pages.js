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
-----------------------------------------------------------------------------
-----------------------------------------------------------------------------
*/
import { PaginatorTypes } from "../Enums/PaginatorTypes";
import { ComponentTypes } from "../Enums/ComponentTypes";
import discord, { APIEmbed } from "discord.js";
import Page from "./Page";
import chunker from "../Modules/chunker";

const MessageCreateOptions: Object = {
  content: String = null,
  embeds: Array<[]>,
  components: Array<[]>,
  fetchReply: Boolean,
  ephemeral: Boolean,
};

/**
 * The options for the sending the paginator
 * @typedef {Object} SendOptions
 * @property {discord.User} filterUser The user to filter the paginator to
 * @property {number} expiration The time in milliseconds for the paginator to expire
 * @property {boolean} ephemeral Whether the paginator should be ephemeral or not
 * @property {boolean} filtered Whether the paginator should be filtered or not
 * @property {boolean} deleteOnEnd The end page of the paginator (0 = delete, 1 = disable, 2 = remove components);
 */
const SendOptions = {
  filterUser: discord.User,
  expiration: (300000 as number) || (null as null),
  ephemeral: false as boolean,
  filtered: false as boolean,
  deleteOnEnd: false as boolean,
};

export default class Paginator {
  /**
   * The number of items per page
   * @type number
   * @default 10
   */
  public perPage: number = 10;
  /**
   * The type of contents on each page
   * @type "Fields", "Single", or "Columns"
   * @default PaginatorTypes.Fields | 0
   */
  public contentType: PaginatorTypes = PaginatorTypes.Fields;
  /**
   * The type of component to use
   * @type "Button" or "SelectMenu"
   * @default ComponentTypes.Button | 0
   */
  public componentType: ComponentTypes = ComponentTypes.Button;
  /**
   * The contents of the paginator
   * @type Array<Contents>
   * @default []
   */
  public contents: Array<string | object> = [];
  /**
   * The pages of the paginator
   * @type Array<Page>
   * @default []
   */
  public pages: Array<any> = [];
  /**
   * The built pages of the paginator
   * @type Array<Page>
   * @default []
   * @private
   * @readonly
   */
  readonly builtPages: Array<APIEmbed> = [];
  /**
   * The public emojis of the paginator
   * @type object | Array | undefined
   * @default undefined
   */
  public emojis: undefined | object | Array<any> = undefined;
  /**
   * The readonly components of the paginator
   * @type object | undefined
   * @default undefined
   * @readonly
   */
  public components: Array<any> = [];
  /**
   * whether to delete the message on collector end or not
   * @type boolean
   * @default false
   */
  public deleteOnEnd: boolean = false;
  /**
   * The current page that the paginator is on
   * @type number
   * @default 1
   */
  public currentPage: number = 1;
  /**
   * Create a new Paginator
   * @param Options Options for the paginator
   */
  constructor(
    PaginatorOptions: Pick<
      Paginator,
      "perPage" | "contentType" | "componentType"
    >
  ) {
    Object.assign(this, PaginatorOptions);
  }
  /**
   * Set the content type of the paginator
   * @param type The type of content to paginate
   * @returns The content type
   */
  public setContentType(type: PaginatorTypes | number) {
    this.contentType = type;
    return this.contentType;
  }
  /**
   * Set the amount of contents per page
   * @param perPage The amount of contents per page
   * @returns the perPage value
   */
  public setPerPage(perPage: number) {
    this.perPage = perPage;
    return this.perPage;
  }
  /**
   * Set the component type of the paginator
   * @param type The type of component to use
   * @returns The component type
   * @default "BUTTONS"
   */
  public setComponentType(type: ComponentTypes | number) {
    this.componentType = type;
    return this.componentType;
  }
  /**
   * Add contents to the paginator
   * @param contents The array of contents to set
   * @returns The contents
   * @default []
   */
  public setContents(contents: Array<string | object>) {
    let type = typeof contents[0];
    for (const content of contents) {
      if (typeof content !== type) {
        throw new TypeError(
          `Expected all contents to be of the same type, got ${typeof content} and ${type}`
        );
      }
    }
    this.contents.push(...contents);
    return this.contents;
  }
  /**
   * Set the emojis of the paginator buttons. Can be both default emojis or custom emojis
   * @param emojis The emojis to set
   * @returns The emojis
   * @default undefined
   * @example
   * // Named buttons with Emojis
   * Paginator.setEmojis({
   * 	first: "⏮️",
   * 	back: "◀️",
   * 	forward: "▶️",
   * 	last: "⏭️",
   * 	stop: "⏹️"
   * });
   * @example
   * // Non-named buttons with Emojis
   * Paginator.setEmojis([
   * 	"⏮️",
   * 	"◀️",
   * 	"▶️",
   * 	"⏭️",
   * 	"⏹️"
   * ]);
   */
  public setEmojis(emojis: object | Array<any>) {
    if (Array.isArray(emojis)) {
      if (emojis.length < 3 || emojis.length > 5 || emojis.length === 4) {
        throw new RangeError(
          `Expected the array to have 3 or 5 elements, got ${emojis.length}`
        );
      } else {
        this.emojis = emojis;
      }
    } else if (typeof emojis !== "object") {
      throw new TypeError(`Expected an object or array, got ${typeof emojis}`);
    } else if (
      Object.values(emojis).length < 3 ||
      Object.values(emojis).length > 5 ||
      Object.values(emojis).length === 4
    ) {
      throw new RangeError(
        `Expected the object to have 3 or 5 elements, got ${
          Object.values(emojis).length
        }`
      );
    } else {
      this.emojis = emojis;
    }
    return this.emojis;
  }
  /**
   * Add pages to the paginator
   * @param pages The array of pages to set
   * @returns The pages
   * @default []
   * @example
   * Paginator.addPages(
   * 	new Page()
   * 		.setTitle("Page 1")
   * 		.setDescription("This is page 1")
   * 		.setColor("RANDOM"),
   * 	new Page()
   * 		.setTitle("Page 2")
   * 		.setDescription("This is page 2")
   * 		.setColor("RANDOM")
   * );
   * @example
   * Paginator.addPages({
   *    title: "Page 1",
   *    description: "This is page 1",
   *    color: "RANDOM"
   *  },
   *  {
   *    title: "Page 2",
   *    description: "This is page 2",
   *    color: "RANDOM"
   *  });
   */
  public addPages(...pages: Array<object | Page>) {
    for (const page of pages) {
      if (!(page instanceof Page)) {
        if (typeof page !== "object") {
          throw new TypeError(
            `Expected an object or instance of Page, got ${typeof page}`
          );
        } else {
          pages.push(page);
        }
      } else {
        pages.push(page.toJSON());
      }
    }
    return this.pages;
  }
  /**
   * Generate the pages of the paginator
   * @returns The pages
   * @default []
   */
  private generatePages() {
    let chunks = chunker(this.contents, this.perPage);

    let i = 0;
    for (const chunk of chunks) {
      switch (this.contentType) {
        case PaginatorTypes.Fields:
          this.builtPages.push(this.pages[i].fields.push(...chunk));
          break;
        case PaginatorTypes.Single:
          this.builtPages.push((this.pages[i].description = chunk.join("\n")));
          break;
        case PaginatorTypes.Columns:
          let columns = chunk.length / 2;
          this.builtPages.push(
            this.pages[i].fields.push(
              {
                name: "\u200b.",
                value: chunk.slice(0, columns).join("\n"),
                inline: true,
              },
              {
                name: "\u200b.",
                value: chunk.slice(columns).join("\n"),
                inline: true,
              }
            )
          );
          break;
      }
    }
    return this.builtPages;
  }
  /**
   * Build the paginator components
   * @returns The components
   * @default []
   * @private
   */
  private buildComponents() {
    const component = {
      type: 1,
      components: <any>[],
    };

    if (this.componentType === ComponentTypes.Button) {
      let names = ["First", "Back", "Forward", "Last", "Stop"];
      if (this.emojis !== undefined) {
        if (this.emojis instanceof Array) {
          if (this.emojis.length === 3) {
            names.slice(names.indexOf("First"), 1);
            names.slice(names.indexOf("Last"), 1);
          }
          let i = 0;
          for (const emoji of this.emojis) {
            if (i === this.emojis.length - 1) {
              component.components.push({
                type: 2,
                style: 4,
                custom_id: names[i].toLowerCase(),
                emoji: emoji,
              });
            } else {
              component.components.push({
                type: 2,
                style: 2,
                custom_id: names[i].toLowerCase(),
                emoji: emoji,
              });
            }
            i++;
          }
        } else if (typeof this.emojis === "object") {
          for (const [key, value] of Object(this.emojis)) {
            if (
              !["stop", "close", "end", "delete"].includes(key.toLowerCase())
            ) {
              component.components.push({
                type: 2,
                style: 2,
                custom_id: key.toLowerCase(),
                label: key,
                emoji: value,
              });
            } else {
              component.components.push({
                type: 2,
                style: 5,
                custom_id: key.toLowerCase(),
                label: key,
                emoji: value,
              });
            }
          }
        }
      } else {
        let i = 0;
        for (const name of names) {
          if (i === names.length - 1) {
            component.components.push({
              type: 2,
              style: 4,
              custom_id: name.toLowerCase(),
              label: name,
            });
          } else {
            component.components.push({
              type: 2,
              style: 2,
              custom_id: name.toLowerCase(),
              label: name,
            });
          }
          i++;
        }
      }
      this.components.push(component);
    } else if (this.componentType === ComponentTypes.SelectMenu) {
      if (chunker(this.contents, this.perPage).length > 25) {
        component.components.push({
          type: 3,
          custom_id: "pages",
          options: [
            {
              label: "First",
              value: "first",
              description: "Go to the first page",
            },
            {
              label: "Back",
              value: "back",
              description: "Go back a page",
            },
            {
              label: "Forward",
              value: "forward",
              description: "Go forward a page",
            },
            {
              label: "Last",
              value: "last",
              description: "Go to the last page",
            },
            {
              label: "Close",
              value: "stop",
              description: "Delete the message",
            },
          ],
          placeholder: "Select An Action",
        });
      } else {
        let options = [];

        for (let i = 0; i < chunker(this.contents, this.perPage).length; i++) {
          options.push({
            label: `Page ${i + 1}`,
            value: i + 1,
            description: `Go to page ${i + 1}`,
          });
        }

        component.components.push({
          type: 3,
          custom_id: "pages",
          options: options,
          placeholder: "Select A Page",
        });
      }
      this.components.push(component);
    }
    return this.components;
  }
  /**
   * Send the paginator
   * @param channel The channel to send the paginator in
   * @param options The options to send the paginator with
   * @returns The Paginator
   */
  public async send(
    sendable: discord.User | discord.CommandInteraction | discord.TextChannel,
    options = SendOptions
  ) {
    this.deleteOnEnd = options?.deleteOnEnd ?? false;
    this.components = this.buildComponents();
    if (sendable instanceof discord.User) {
      return this.sendUserPages(sendable, options);
    }

    if (sendable instanceof discord.CommandInteraction) {
      return this.sendInteractionPages(sendable, options);
    }

    if (sendable instanceof discord.TextChannel) {
      return this.sendChannelPages(sendable, options);
    }
  }
  /**
   * Send the paginator to a user
   * @param user The user to send the paginator to
   * @param options The options to send the paginator with
   * @returns The Paginator
   * @private
   */
  private async sendUserPages(user: discord.User, options = SendOptions) {
    let pages = this.generatePages();

    let CreateOptions: typeof MessageCreateOptions = {
      embeds: [pages[0]],
      components: this.components,
    };

    let message = await user.send(CreateOptions);

    const collectorOptions: any = {};

    if (options?.expiration !== null) {
      collectorOptions.expiration = options.expiration;
    }

    const collector = message.createMessageComponentCollector(collectorOptions);

    collector.on("collect", async (i: discord.MessageComponentInteraction) => {
      if (i instanceof discord.SelectMenuInteraction) {
        await this.handleSelect(i, message, pages);
      } else if (i instanceof discord.ButtonInteraction) {
        await this.handleButtons(i, message, pages);
      }
    });

    collector.on("end", async () => {
      if (options?.deleteOnEnd === true) {
        try {
          await message.delete();
        } catch (e) {
          // Chore: Figure out how to gracefully handle this
          // So its not logging on every paginator end
        }
      } else {
        try {
          await message.edit(
            (CreateOptions = {
              embeds: [pages[0]],
              components: [],
            })
          );
        } catch (e) {
          // Chore: Figure out how to gracefully handle this
          // So its not logging on every paginator end
        }
      }
    });
  }
  /**
   * Send the paginator to a channel
   * @param channel The channel to send the paginator in
   * @param options The options to send the paginator with
   * @returns The Paginator
   * @private
   */
  private async sendChannelPages(
    channel: discord.TextChannel,
    options = SendOptions
  ) {
    let pages = this.generatePages();

    let CreateOptions: typeof MessageCreateOptions = {
      embed: pages[0],
      components: this.components,
    };

    let message = await channel.send(CreateOptions);

    const collectorOptions: any = {};

    if (options?.expiration !== null) {
      collectorOptions.time = options.expiration;
    }

    const collector = message.createMessageComponentCollector(collectorOptions);

    collector.on("collect", async (i: discord.MessageComponentInteraction) => {
      if (i instanceof discord.SelectMenuInteraction) {
        await this.handleSelect(i, message, pages);
      } else if (i instanceof discord.ButtonInteraction) {
        await this.handleButtons(i, message, pages);
      }
    });

    collector.on("end", async () => {
      if (options?.deleteOnEnd === true) {
        try {
          await message.delete();
        } catch (e) {
          // Chore: Figure out how to gracefully handle this
          // So its not logging on every paginator end
        }
      } else {
        try {
          await message.edit(
            (CreateOptions = {
              embeds: [pages[0]],
              components: [],
            })
          );
        } catch (e) {
          // Chore: Figure out how to gracefully handle this
          // So its not logging on every paginator end
        }
      }
    });
  }
  /**
   * Send the paginator to an interaction
   * @param interaction The interaction to send the paginator with
   * @param options The options to send the paginator with
   * @returns The Paginator
   * @private
   */
  private async sendInteractionPages(
    interaction: discord.CommandInteraction,
    options = SendOptions
  ) {
    let pages = this.generatePages();

    let messageCreateOptions: object = {
      embed: pages[0],
      components: this.components,
      fetchReply: true,
      ephemeral: options?.ephemeral,
    };

    let message: any;
    if (interaction.replied) {
      message = await interaction.editReply(messageCreateOptions);
    } else {
      message = await interaction.reply(messageCreateOptions);
    }

    const collectorOptions: any = {};

    if (options?.expiration !== null) {
      collectorOptions.time = options.expiration;
    }

    if (options?.filtered === true) {
      collectorOptions.filter = (i: discord.MessageComponentInteraction) =>
        i.user.id === interaction.user.id;
    }

    const collector = message.createMessageComponentCollector(collectorOptions);

    collector.on("collect", async (i: discord.MessageComponentInteraction) => {
      if (i instanceof discord.SelectMenuInteraction) {
        await this.handleSelect(i, message, pages);
      } else if (i instanceof discord.ButtonInteraction) {
        await this.handleButtons(i, message, pages);
      }
    });

    collector.on("end", async () => {
      if (options?.deleteOnEnd === true) {
        try {
          await message.delete();
        } catch (e) {
          // Chore: Figure out how to gracefully handle this
          // So its not logging on every paginator end
        }
      } else {
        try {
          await message.edit(
            (messageCreateOptions = {
              embed: pages[0],
              components: [],
            })
          );
        } catch (e) {
          // Chore: Figure out how to gracefully handle this
          // So its not logging on every paginator end
        }
      }
    });
  }
  /**
   * Handle the buttons
   * @param collector The collector
   * @param interaction The interaction
   * @param message The message
   * @param pages The pages
   * @private
   */
  private async handleButtons(
    interaction: discord.ButtonInteraction,
    message: discord.Message,
    pages: any[]
  ) {
    let messageEditOptions: object = {
      embeds: [pages[0]],
    };

    if (interaction.customId === "first") {
      this.currentPage = 1;
      return message.edit(messageEditOptions);
    }

    if (interaction.customId === "previous") {
      if (this.currentPage === 1) return;
      this.currentPage--;
      return message.edit(
        (messageEditOptions = {
          embeds: [pages[this.currentPage - 1]],
        })
      );
    }

    if (interaction.customId === "next") {
      if (this.currentPage === pages.length) return;
      this.currentPage++;
      return message.edit(
        (messageEditOptions = {
          embeds: [pages[this.currentPage - 1]],
        })
      );
    }

    if (interaction.customId === "last") {
      if (this.currentPage === pages.length) return;
      this.currentPage = pages.length;
      return message.edit(
        (messageEditOptions = {
          embeds: [pages[this.currentPage - 1]],
        })
      );
    }

    if (
      ["stop", "delete", "cancel", "close"].includes(
        interaction.customId.toLowerCase()
      )
    ) {
      if (this.deleteOnEnd === true) {
        return message.delete();
      } else {
        return message.edit(
          (messageEditOptions = {
            embeds: [pages[0]],
            components: [],
          })
        );
      }
    }
  }
  /**
   * Handle the select menu
   * @param collector The collector
   * @param interaction The interaction
   * @param message The message
   * @param pages The pages
   * @private
   */
  private async handleSelect(
    interaction: discord.SelectMenuInteraction,
    message: discord.Message,
    pages: any[]
  ) {
    //let CreateOptions: typeof MessageCreateOptions;

    if (this.components[0].components[0].options.length <= 5) {
      if (interaction.values[0] === "first") {
        this.currentPage = 1;
        return message.edit(
          {
            embeds: [pages[0]],
          }
        );
      } else if (interaction.values[0] === "previous") {
        if (this.currentPage === 1) return;
        this.currentPage--;
        return message.edit(
          {
            embeds: [pages[this.currentPage - 1]],
          }
        );
      } else if (interaction.values[0] === "next") {
        if (this.currentPage === pages.length) return;
        this.currentPage++;
        return message.edit(
          {
            embeds: [pages[this.currentPage - 1]],
          }
        );
      } else if (interaction.values[0] === "last") {
        if (this.currentPage === pages.length) return;
        this.currentPage = pages.length;
        return message.edit(
          {
            embeds: [pages[this.currentPage - 1]],
          }
        );
      } else if (
        ["stop", "delete", "cancel", "close"].includes(
          interaction.values[0].toLowerCase()
        )
      ) {
        if (this.deleteOnEnd === true) {
          return message.delete();
        } else {
          return message.edit(
            {
              embeds: [pages[0]],
              components: [],
            }
          );
        }
      }
    } else {
      if (parseInt(interaction.values[0]) === 1) {
        if (this.currentPage === 1) return;
        this.currentPage = 1;
        return message.edit(
          {
            embeds: [pages[0]],
          }
        );
      } else if (parseInt(interaction.values[0]) === pages.length) {
        if (this.currentPage === pages.length) return;
        this.currentPage = pages.length;
        return message.edit(
          {
            embeds: [pages[this.currentPage - 1]],
          }
        );
      } else {
        if (this.currentPage === parseInt(interaction.values[0])) return;
        this.currentPage = parseInt(interaction.values[0]);
        return message.edit(
          {
            embeds: [pages[this.currentPage - 1]],
          }
        );
      }
    }
  }
}
