import { default as PaginatorTypes } from "../Enums/PaginatorTypes";
import { default as ComponentTypes } from "../Enums/ComponentTypes";
import discord, { APIEmbed } from "discord.js";
import Page from "./Page";
export default class Paginator {
    /**
     * The number of items per page
     * @type number
     * @default 10
     */
    perPage: number;
    /**
     * The type of contents on each page
     * @type "Fields", "Single", or "Columns"
     * @default PaginatorTypes.Fields | 0
     */
    contentType: PaginatorTypes;
    /**
     * The type of component to use
     * @type "Button" or "SelectMenu"
     * @default ComponentTypes.Button | 0
     */
    componentType: ComponentTypes;
    /**
     * The contents of the paginator
     * @type Array<Contents>
     * @default []
     */
    contents: Array<string | object>;
    /**
     * The pages of the paginator
     * @type Array<Page>
     * @default []
     */
    pages: Array<any>;
    /**
     * The built pages of the paginator
     * @type Array<Page>
     * @default []
     * @private
     * @readonly
     */
    readonly builtPages: Array<APIEmbed>;
    /**
     * The public emojis of the paginator
     * @type object | Array | undefined
     * @default undefined
     */
    emojis: undefined | object | Array<any>;
    /**
     * The readonly components of the paginator
     * @type object | undefined
     * @default undefined
     * @readonly
     */
    components: Array<any>;
    /**
     * whether to delete the message on collector end or not
     * @type boolean
     * @default false
     */
    deleteOnEnd: boolean;
    /**
     * The current page that the paginator is on
     * @type number
     * @default 1
     */
    currentPage: number;
    /**
     * Create a new Paginator
     * @param Options Options for the paginator
     */
    constructor(PaginatorOptions: Pick<Paginator, "perPage" | "contentType" | "componentType">);
    /**
     * Set the content type of the paginator
     * @param type The type of content to paginate
     * @returns The content type
     */
    setContentType(type: PaginatorTypes | number | string): PaginatorTypes;
    /**
     * Set the amount of contents per page
     * @param perPage The amount of contents per page
     * @returns the perPage value
     */
    setPerPage(perPage: number): number;
    /**
     * Set the component type of the paginator
     * @param type The type of component to use
     * @returns The component type
     * @default "BUTTONS"
     */
    setComponentType(type: ComponentTypes | number | string): ComponentTypes;
    /**
     * Add contents to the paginator
     * @param contents The array of contents to set
     * @returns The contents
     * @default []
     */
    setContents(contents: Array<string | object>): (string | object)[];
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
    setEmojis(emojis: object | Array<any>): object | any[];
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
    addPages(...pages: Array<object | Page>): any[];
    /**
     * Generate the pages of the paginator
     * @returns The pages
     * @default []
     */
    private generatePages;
    /**
     * Build the paginator components
     * @returns The components
     * @default []
     * @private
     */
    private buildComponents;
    /**
     * Send the paginator
     * @param channel The channel to send the paginator in
     * @param options The options to send the paginator with
     * @returns The Paginator
     */
    send(sendable: discord.User | discord.CommandInteraction | discord.TextChannel, options?: {
        filterUser: typeof discord.User;
        expiration: number;
        ephemeral: boolean;
        filtered: boolean;
        deleteOnEnd: boolean;
    }): Promise<void>;
    /**
     * Send the paginator to a user
     * @param user The user to send the paginator to
     * @param options The options to send the paginator with
     * @returns The Paginator
     * @private
     */
    private sendUserPages;
    /**
     * Send the paginator to a channel
     * @param channel The channel to send the paginator in
     * @param options The options to send the paginator with
     * @returns The Paginator
     * @private
     */
    private sendChannelPages;
    /**
     * Send the paginator to an interaction
     * @param interaction The interaction to send the paginator with
     * @param options The options to send the paginator with
     * @returns The Paginator
     * @private
     */
    private sendInteractionPages;
    /**
     * Handle the buttons
     * @param collector The collector
     * @param interaction The interaction
     * @param message The message
     * @param pages The pages
     * @private
     */
    private handleButtons;
    /**
     * Handle the select menu
     * @param collector The collector
     * @param interaction The interaction
     * @param message The message
     * @param pages The pages
     * @private
     */
    private handleSelect;
}
//# sourceMappingURL=Paginator.d.ts.map