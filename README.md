# HTML2Markdown

Javascript implementation for converting HTML to Markdown text. Browser and Node.js support.

## Installation

    npm install html2markdown

## Usage in node.js

    var html2markdown = require('html2markdown');

    console.log(html2markdown('<h1>Hello markdown!</h1>'));

## Usage in browser

    <script type="text/javascript" src="markdown_dom_parser.js"></script>
    <script type="text/javascript" src="html2markdown.js"></script>

    console.log(html2markdown("<h1>Hello markdown!</h1>"))

This call will return convert the html and return the mardown string like ""# H1\n\n"

## Changes in this implementation

* Added new htmldomparser. A simple html parser implementation that assumes parsing is done in browser. Shold be compatible with john Resig's parser.
* Parser implementation provided support for ignoring tags that you do not want to convert.
* Parser also has an option to ignore dom elements with hidden styles.
* Added rules for parsing PRE, CODE, SPAN, DIV, TD,  DL, DT
* Added support for ignoring tags that you do not want to convert.
* Improved "startBlock" method and renamed it to "block"
* Added support for nested lists
* Fixed some showdown rendering issues when a link has a nested image
* Some readability changes like collapse whitespace, treat images as block elements, do not output text if elements are empty.
* Added support for converting relative url's to absolute url's
* Dropped wordwrap function as it does not seem a good idea to introduce new lines in the converter. and wordwrap behaviro was not consistents as elements can be nested.
* Added support for refeence style images and links (option driven to choose between inline markdown formatting and refernce style formatting)
* Added ton's of unit tests.

## Known conversion issues

If HTML tag is of following form. Then, currently showdown fails to render

        <a href="/some_link">
            <h1>
                    <img src="/some_image_lin"/>
            </h1>
        </a>
