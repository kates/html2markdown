/**
 * HTML2Markdown - An HTML to Markdown converter.
 * @author Kates Gasis
 *
 */

if (typeof require != "undefined") {
	var htmlparser = require("./htmlparser");
	var HTMLParser = htmlparser.HTMLParser;
}

/**
 * HTML2Markdown
 * @param html - html string to convert
 * @return converted markdown text
 */
function HTML2Markdown(html) {
	var markdownTags = {
		"hr": "- - -",
		"h1": "# ",
		"h2": "## ",
		"h3": "### ",
		"h4": "#### ",
		"h5": "##### ",
		"h6": "###### ",
		"b": "**",
		"strong": "**",
		"i": "_",
		"em": "_",
		"ul": "* ",
		"ol": "1. ",
		"blockquote": "> "
	};

	function convertAttrs(attrs) {
		var attributes = {};
		for(var k in attrs) {
			var attr = attrs[k];
			attributes[attr.name] = attr;
		}
		return attributes;
	}

	// http://james.padolsey.com/javascript/wordwrap-for-javascript
	// opts = {break:"\n", width: 75, cut: false}
	function wordwrap(str, opts) {
		opts = opts || {};
		var brk = opts['break'] || '\n';
		var width = opts['width'] || 75;
		var cut = opts['cut'] || false;
 
		if (!str) {
			return str;
		}
		var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');
		var match = str.match(RegExp(regex, 'g'));
		return match ? match.join(brk) : str;
		//return str.match( RegExp(regex, 'g') ).join( brk );
	}

	function trim(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	var nodeStack = [];
	var nodeList = [];
	var listTagStack = [];
	var linkAttrStack = [];
	var blockquoteStack = [];

	function startBlock() {
		var lastItem = nodeList.pop();
		if (!lastItem) {
			return;
		}
		lastItem = lastItem.replace(/\n+$/, "\n\n");
		nodeList.push(lastItem);
	}

	try {
		HTMLParser(html,{
			start: function(tag, attrs, unary) {
				var tag = tag.toLowerCase();
				if (!unary) {
					nodeStack.unshift(tag);
				}
				switch (tag) {
				case "del":
				case "cite":
				case "span":
					//preserve tags for these elements
					var attribs = [];
					for (var k in attrs) {
						var attr = attrs[k];
						attribs.push(attr.name + "=\"" + attr.value + "\"");
					}
					nodeList.push("<" + tag + " " + attribs.join(" ") + ">");
					break;
				case "br":
					nodeList.push(" \n");
					break;
				case "hr":
					startBlock();
					nodeList.push(markdownTags[tag] + "\n\n");
					break;
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6":
					startBlock();
					nodeList.push(markdownTags[tag]);
					break;
				case "b":
				case "strong":
				case "i":
				case "em":
					if (/[\s\>]$/.test(nodeList.slice(-1))){
						nodeList.push(markdownTags[tag]);
					} else {
						nodeList.push(" " + markdownTags[tag]);
					}
					break;
				case "ul":
				case "ol":
					// lists are block elements
					startBlock();
					listTagStack.unshift(markdownTags[tag]);
					break;
				case "li":
					nodeList.push(listTagStack[0]);
					break;
				case "a":
					var attribs = convertAttrs(attrs);
					linkAttrStack.push(attribs);
					nodeList.push("[");
					break;
				case "img":
					var attribs = convertAttrs(attrs);
					var alt = attribs['alt'];
					var src = attribs['src'];
					var title = attribs['title'];
					if (alt) {
						nodeList.push("![" + alt.value + "](" + src.value + (title ? " \"" + title.value + "\"" : "") + ")");
					}
					break;
				case "blockquote":
					if (blockquoteStack.length < 1) {
						startBlock();
					}
					blockquoteStack.push(markdownTags[tag]);
					nodeList.push(blockquoteStack.join(""));
					break;
				}
			},

			chars: function(text) {
				if (trim(text) === "") {
					//text = "";
				}
				text = text.replace(/\n+?/g, "");
				text = wordwrap(text);
				nodeList.push(text);
			},

			end: function(tag) {
				var tag = tag.toLowerCase();
				nodeStack.pop();
				switch (tag) {
				case "del":
				case "cite":
				case "span":
					nodeList.push("</" + tag + ">");
					break;
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6":
				case "p":
					if (listTagStack.length < 1) {
						nodeList.push("\n\n");
					}
					break;
				case "b":
				case "strong":
				case "i":
				case "em":
					nodeList.push(markdownTags[tag]);
					break;
				case "ul":
				case "ol":
					nodeList.push("\n");
					listTagStack.shift();
					break;
				case "li":
					nodeList.push("\n");
					break;
				case "a":
					var attrs = linkAttrStack.pop();
					var url = attrs["href"];
					var title = attrs["title"];
					nodeList.push("](" + url.value + (title ? " \"" + title.value + "\"" : "") + ")");
					break;
				case "blockquote":
					blockquoteStack.pop();
					break;
				}
			}
		});
	} catch(e) {
		return html.replace(/\</g, " &lt; ").replace(/\>/g, " &gt; ");
	}
	return nodeList.join("");
}

if (typeof exports != "undefined") {
	exports.HTML2Markdown = HTML2Markdown;
}
