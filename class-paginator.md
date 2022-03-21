---
description: The core paginator class used with discord-pages.js
---

# class Paginator

| Attributes                                                      | Methods                                                           |   |
| --------------------------------------------------------------- | ----------------------------------------------------------------- | - |
| [builtPages](class-paginator.md#attribute-paginator.builtpages) | [addPages( )](class-paginator.md#method-paginator.addpages-pages) |   |
| [components](class-paginator.md#attribute-paginator.components) | [buildPages( )](class-paginator.md#method-paginator.buildpages)   |   |
| [content](class-paginator.md#attribute-paginator.contents)      | [getContent( )](class-paginator.md#undefined)                     |   |
| [curpage](class-paginator.md#attribute-paginator.curpage)       | [getContents( )](class-paginator.md#method-paginator.getcontents) |   |
| [pages](class-paginator.md#attribute-paginator.pages)           | getCurrentPage( )                                                 |   |
| [perPage](class-paginator.md#attribute-paginator.perpage)       | getPage( )                                                        |   |
|                                                                 | getPageLimit( )                                                   |   |
|                                                                 | getPages( )                                                       |   |
|                                                                 | start( )                                                          |   |
|                                                                 | send( )                                                           |   |
|                                                                 | setContents( )                                                    |   |
|                                                                 | setEmojis( )                                                      |   |

#### \[ Attribute ] Paginator.pages

Returns the non-built pages that were set using method `.addpages(`...pages`).`

returns: \<Array\[Page] | \[ ]>

#### \[ Attribute ] Paginator.curpage

Returns the current page according to the running paginator.

returns: \<Number>

#### \[ Attribute ] Paginator.components

Exposes the `MessageActionRow` that will be used with the running paginator. Can be used to manipulate look and text of buttons.

{% hint style="danger" %}
Warning: Changing the `customId` for any of the buttons will render the paginator useless.
{% endhint %}

returns: <\[MessageActionRow]>

#### \[ Attribute ] Paginator.perPage

Shows the page limit set when instantiating the Paginator class.

{% hint style="info" %}
Alias of `.getPageLimit()`
{% endhint %}

returns: \<Number>

#### \[ Attribute ] Paginator.contents

Exposes the set contents of this paginator, set using `.setContents()`

returns: \<Array\[contents] | \[ ]>

#### \[ Attribute ] Paginator.builtPages

Exposes a list of pages built using the contents set with `.setContents()` and pages added using `.addPages()`.

returns: \<Array\[Page] | \[ ]>

#### \[ Method ] Paginator.addPages(pages)

Synchronous method of adding pages to paginator

|                       Parameter                       |                    Data                   | Required? |
| :---------------------------------------------------: | :---------------------------------------: | :-------: |
| [pages](class-paginator.md#attribute-paginator.pages) | Array\[ Page \| MessageEmbed \| APIEmbed] |   `true`  |

```javascript
Paginator.addPages(
  new Page()
    .setTitle("Page One")
    .setColor("GREEN"),
  new Page()
    .setTitle("Page Two")
    .setColor("BLUE")
);
```

#### \[ Method ] Paginator.buildPages( )

Internal method used to combine set contents and pages in preparation for use when paginator is started.

{% hint style="warning" %}
You should never call `.buildPages()` . Instead use method `.getPages()` to preview your embed pages.
{% endhint %}

#### \[ Method] Paginator.getContent(indice) <a href="#paginator.getcontent" id="paginator.getcontent"></a>

Method used to get the set content at the provided index.

| Parameter |  Data  | Required? |
| :-------: | :----: | :-------: |
|   indice  | Number |   `true`  |

returns: <[content](class-paginator.md#attribute-paginator.contents) | Object{[content](class-paginator.md#attribute-paginator.contents)}>

#### \[ Method ] Paginator.getContents( )

Method used to get the contents set using `.setContents()`

returns: \<Array\[[contents](class-paginator.md#attribute-paginator.contents)] | \[ ]>

#### \[ Method ] Paginator.getCurrentPage( )

Retrieves the current page number that the running paginator is on.

returns: \<Number>



#### \[ Method ] Paginator.getPage(index)

Retrieves a Page from Paginator.pages at provided index

| Parameter |  Data  | Required? |
| :-------: | :----: | :-------: |
|   index   | Number |   `true`  |

returns: \<Page>



#### \[ Method ] Paginator.getPageLimit( )

Retrieves the perPage limit set when initializing the Paginator class.

returns \<Number>



#### \[ Method ] Paginator.getPages( )

Returns all pages built with supplied contents from [`Paginator.builtPages`](class-paginator.md#attribute-paginator.builtpages) as an Array.

returns \<Array\[Page] | \[ ]>



