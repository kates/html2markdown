var parsers = {
	'dom' : function(value, opts) {
		opts = opts || {};
		// should default to this
		// opts.parser = markdownDOMParser;
		return html2markdown(value, opts);
	},

	'html' : function(value, opts) {
		opts = opts || {};
		opts.parser = markdownHTMLParser;
		return html2markdown(value, opts);
	}
};

for(var key in parsers) {
	var markdown = parsers[key];

	describe("With " + key + " parser", function() {
		it("should be able to convert '<h1>H1</h1>' to '# H1\\n\\n'", function() {
			var md = markdown("<h1>H1</h1>");
			expect(md).toMatch(/\# H1\n\n/);
		});

		it("should be able to convert '<h2>H2</h2>' to '## H2\\n\\n'", function() {
			var md = markdown("<h2>H2</h2>");
			expect(md).toMatch(/\#{2} H2\n\n/);
		});

		it("should be able to convert '<h3>H3</h3>' to '### H3\\n\\n'", function() {
			var md = markdown("<h3>H3</h3>");
			expect(md).toMatch(/\#{3} H3\n\n/);
		});

		it("should be able to convert '<h4>H4</h4>' to '#### H4\\n\\n'", function() {
			var md = markdown("<h4>H4</h4>");
			expect(md).toMatch(/\#{4} H4\n\n/);
		});

		it("should be able to convert '<h5>H5</h5>' to '##### H5\\n\\n'", function() {
			var md = markdown("<h5>H5</h5>");
			expect(md).toMatch(/\#{5} H5\n\n/);
		});

		it("should be able to convert '<h6>H6</h6>' to '###### H6\\n\\n'", function() {
			var md = markdown("<h6>H6</h6>");
			expect(md).toMatch(/\#{6} H6\n\n/);
		});

		it("should be able to convert '<strong>Bold</strong>' to '**Bold**'", function() {
			var md = markdown("<strong>Bold</strong>");
			expect(md).toMatch(/\*{2}Bold\*{2}/);
		});

		it("should be able to convert '<b>Bold</b>' to '**Bold**'", function() {
			var md = markdown("<b>Bold</b>");
			expect(md).toMatch(/\*{2}Bold\*{2}/);
		});

		it("should be able to convert '<em>Italic</em>' to '_Italic_'", function() {
			var md = markdown("<em>Italic</em>");
			expect(md).toMatch(/\_Italic\_/);
		});

		it("should be able to convert '<i>Italic</i>' to '_Italic_'", function() {
			var md = markdown("<i>Italic</i>");
			expect(md).toMatch(/\_Italic\_/);
		});

		it("should be able to convert '<title>This is document Title</title>' to '# This is document Title\\n\\n'", function() {
			var md = markdown("<title>This is document Title</title>");
			expect(md).toMatch(/\# This is document Title\n\n/);
		});

		it("should be able trim text inside inline elements", function() {
			var md = markdown("<strong> String </strong>");
			expect(md).toMatch(/\*{2}String\*{2}/);
		});

		it("should be able to convert 'This has a <strong>block</strong> word' to 'This has a **block** word'", function() {
			var md = markdown("This has a <strong>block</strong> word");
			expect(md).toMatch(/This has a \*{2}block\*{2} word/);
		});

		it("should be able to convert '<hr />' to '- - -\\n\\n'", function() {
			var md = markdown("<hr />");
			expect(md).toEqual("- - -\n\n");
		});

		it("should be able to convert '<br/>' to '  \\n'", function() {
			var md = markdown("this is text before break<br/>this is text after break");
			expect(md).toMatch("  \n");
		});

		it("should be able to convert 'This has <strong>blocked and <em>italicized</em></strong> texts.' to 'This has **blocked and _italicized_** texts.'", function() {
			var md = markdown("This has <strong>blocked and <em>italicized</em></strong> texts.");
			expect(md).toMatch(/This has \*{2}blocked and \_italicized\_\*{2} texts\./);
		});

		it("should be able to convert 'this is text before hr<hr/>this is text after hr' to 'this is text before hr  \\nthis is text after hr'", function() {
			var md = markdown("this is text before hr<hr/>this is text after hr");
			expect(md).toMatch("this is text before hr\n\n- - -\n\nthis is text after hr");
		});

		it("should be able to convert 'this is text before break<br/>this is text after break' to 'this is text before break  \\nthis is text after break'", function() {
			var md = markdown("this is text before break<br/>this is text after break");
			expect(md).toMatch("this is text before break  \nthis is text after break");
		});

		it("should be able to convert '<p>This is a paragraph. This is the second sentence.</p>' to 'This is a paragraph. This is the second sentence.\\n\\n'", function() {
			var md = markdown("<p>This is a paragraph. This is the second sentence.</p>");
			expect(md).toEqual("This is a paragraph. This is the second sentence.\n\n");
		});

		it("should be able to convert 'this is text before paragraph<p>This is a paragraph</p>this is text after paragraph' to 'this is text before paragraph\nThis is a paragraph\n\nthis is text after paragraph'", function() {
			var md = markdown("this is text before paragraph<p>This is a paragraph</p>this is text after paragraph");
			expect(md).toEqual("this is text before paragraph\n\nThis is a paragraph\n\nthis is text after paragraph");
		});

		it("should be able to convert span element", function() {
			var md = markdown("<span>this is span element</span>");
			expect(md).toEqual(" this is span element ");

			md = markdown("before<span>this is span element</span>after");
			expect(md).toEqual("before this is span element after");

			md = markdown("before <span>this is span element</span> after");
			expect(md).toEqual("before this is span element after");
		});

		it("should be able to convert '<blockquote>This is blockquoted</blockquote>' to '> This is blockquoted'", function() {
			var md = markdown("<blockquote>This is blockquoted</blockquote>");
			expect(md).toMatch("> This is blockquoted");
		});

		it("should be able to convert nested blockquotes", function() {
			var md = markdown("<blockquote>This is blockquoted<blockquote>This is nested blockquoted</blockquote></blockquote>");
			expect(md).toMatch("> This is blockquoted\n\n> > This is nested blockquoted");
		});

		//enable when wordwrap ie enabled
	//	var html = "<p>This is a paragraph. Followed by a blockquote.</p><blockquote><p>This is a blockquote which will be truncated at 75 characters width. It will be somewhere around here.</p></blockquote>";
	//	html += "<p>Some list for you:</p><ul><li>item a</li><li>item b</li></ul><p>So which one do you choose?</p>";
	//	it("should be able to convert a block of html", function() {
	//		var md = markdown(html);
	//		var md_str = "This is a paragraph\. Followed by a blockquote\.\n\n\> \nThis is a blockquote which will be truncated at 75 characters width\. It \nwill be somewhere around here\.\n\nSome list for you:\n\n\* item a\n\* item b\n\nSo which one do you choose\?\n\n";
	//		expect(md).toEqual(md_str);
	//	});

		it("should be able to convert unordered list", function() {
			var md = markdown("<ul><li>item a</li><li>item b</li></ul>");
			expect(md).toMatch(/\* item a\n\* item b\n/);
		});

		it("should be able to convert ordered list", function() {
			var md = markdown("<ol><li>item 1</li><li>item 2</li></ol>");
			expect(md).toMatch(/1\. item 1\n1\. item 2\n/);
		});

		it("should be able to convert nested lists", function() {
			var md = markdown("<ul><li>item a<ul><li>item aa</li><li>item bb</li></ul></li><li>item b</li></ul>");
			expect(md).toMatch(/\* item a\n  \* item aa\n  \* item bb\n\* item b\n/);
		});

		it("should not convert empty list items", function() {
			var md = markdown("<ol><li>item 1</li><li/></ol>");
			expect(md).toMatch(/1\. item 1\n/);

			md = markdown("<ul><li>item 1</li><li></li></ol>");
			expect(md).toMatch(/\* item 1\n/);
		});


		it("should be able to convert images inline style", function() {
			var md = markdown("<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>", {"inlineStyle": true});
			var expected = "![Example Image](/img/62838.jpg \"Free example image\")\n\n";
			expect(md).toEqual(expected);
		});

		it("should be able to convert images reference style", function() {
			var md = markdown("<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>");
			var expected = "![Example Image][0]\n\n[0]: /img/62838.jpg";
			expect(md).toEqual(expected);

			//if alt is empty then title should be used
			md = markdown("<img title=\"Free example image title\" src=\"/img/62838.jpg\">");
			var expected = "![Free example image title][0]\n\n[0]: /img/62838.jpg";
			expect(md).toEqual(expected);

		});

		it("should be able to convert images as block elements", function() {
			var md = markdown("before<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>after");
			var expected = "before\n\n![Example Image][0]\n\nafter\n\n[0]: /img/62838.jpg";
			expect(md).toEqual(expected);

			var md = markdown("before<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>after", {"inlineStyle": true});
			var expected = "before\n\n![Example Image](/img/62838.jpg \"Free example image\")\n\nafter";
			expect(md).toEqual(expected);
		});

		it("should not convert images if url is empty", function() {
			var md = markdown("<img alt=\"Example Image\" title=\"Free example image\">");
			expect(md).toEqual("");
		});

		it("should be able to properly convert links reference style", function() {
			var html = "<a href=\"http://www.example.com\" title=\"Example\">Visit Example</a>";
			html += "text1";
			html += "<a href=\"http://www.example1.com\" title=\"Example\">Visit Example1</a>";
			html += "text2";
			html += "<a href=\"http://www.example.com\" title=\"Example\">Visit Example</a>";

			//urls should not be duplicated in reference style
			var expected = "[Visit Example][0]text1[Visit Example1][1]text2[Visit Example][0]";
			expected += "\n\n";
			expected += "[0]: http://www.example.com\n";
			expected += "[1]: http://www.example1.com";

			var md = markdown(html);
			expect(md).toEqual(expected);
		});

		it("should be able to convert links inline style", function() {
			var md = markdown("<a href=\"http://www.example.com\" title=\"Example\">Visit Example</a>", {"inlineStyle": true});
			expect(md).toEqual("[Visit Example](http://www.example.com \"Example\")");
		});

		it("should not convert if link has no text to display", function() {
			var html = "<a href='/'/>";
			md = markdown(html);
			expect(md).toEqual("");

			html = "<div class='logo'>\n";
			html += "	<a href='/'/>\n";
			html += "</div>";

			md = markdown(html);
			expect(md).toEqual("");
		});

		it("should convert elements with child elements surrounded by whitespace", function() {
			var html = "<div>\n\t<h2>\n\t\t<a href='http://finance.yahoo.com'>Yahoo! Finance</a>\n\t</h2>\n</div>";
			md = markdown(html);
			expect(md).toEqual("## [Yahoo! Finance][0]\n\n[0]: http://finance.yahoo.com");

			html = "<span>\n\t<b>Hello</b>\n\t</span>";
			md = markdown(html);
			expect(md).toEqual(" **Hello** ");
		});


		it("should convert image wrapped in anchor to markdown that can be rendered using showdown - inline style parsing", function() {
			var md = markdown("<a href=\"/exec/j/4/?pid=62838&lno=1&afsrc=1\"><img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"></a>", {"inlineStyle": true});
			var expected = "[![Example Image](/img/62838.jpg \"Free example image\")](/exec/j/4/?pid=62838&lno=1&afsrc=1)";
			expect(md).toEqual(expected);
		});

		it("should convert image wrapped in anchor to markdown that can be rendered using showdown - reference style parsing", function() {
			var md = markdown("<a href='/exec/j/4/?pid=62838&lno=1&afsrc=1'><img alt='Example Image' title='Free example image' src='/img/62838.jpg'></a>", {"inlineStyle": false});
			var expected = "[![Example Image](/img/62838.jpg \"Free example image\")](/exec/j/4/?pid=62838&lno=1&afsrc=1)";

			var html = "<a href='/exec/j/4/?pid=62838&lno=1&afsrc=1'>\n\t<img alt='Example Image' title='Free example image' src='/img/62838.jpg'>\n\t</a>";
			md = markdown(html, {"inlineStyle": false});
			expect(md).toEqual(expected);

		});

		it("should output only text of empty links", function() {
			var md = markdown("<a href=''>Empty Link Text</a>", {"inlineStyle": true});
			var expected = "Empty Link Text";
			expect(md).toEqual(expected);
		});

		//tags that have no parsing rules e.g. form elements 'head', 'style', script', 'link' 'option', 'noscript', 'noframes', 'input', 'button', 'select', 'textarea', and 'label'
		it("should not convert any elements that have no parsing rules. ", function() {
			var html = "<head><link rel='openid.delegate' href='http://jeresig.livejournal.com/'/>";
			html +=	"<script src='http://ejohn.org/files/retweet.js'></script></head>";

			var md = markdown(html);
			expect(md).toEqual("");
		});

		//tables
		it("should be able to convert tables", function() {
			var html = "<table border=\"1\">";
			html += "<tr><td>Row 1 Cell 1</td><td>Row 1 Cell 2</td></tr>";
			html += "<tr><td>Row 2 Cell 1</td><td>Row 2 Cell 2</td></tr>";
			html += "</table>";

			var md = markdown(html);

			var expected = "Row 1 Cell 1\n\n";
			expected += "Row 1 Cell 2\n\n";
			expected += "Row 2 Cell 1\n\n";
			expected += "Row 2 Cell 2\n\n";

			expect(md).toEqual(expected);
		});

		it("should be able to convert tables with lists", function() {
			var html = "<table border=\"1\">";
			html += "<tr><td width=\"50%\"><ul><li>List Item 1</li><li>List Item 2</li></ul></td>";
			html += "<td><ul><li>List Item 3</li><li>List Item 4</li></ul></td></tr>";
			html += "</table>";

			var md = markdown(html);
			var expected = "* List Item 1\n* List Item 2\n\n* List Item 3\n* List Item 4\n\n";

			expect(md).toEqual(expected);
		});

		//test empty block element
		it("should not convert emptyt tags", function() {
			var md = markdown("<div>        </div>");
			expect(md).toEqual("");

			md = markdown("<h1>        </h1>");
			expect(md).toEqual("");

			md = markdown("<b>        </b>");
			expect(md).toEqual("");
		});

		it("should collape whitespace to single space for text nodes", function() {
			var md = markdown("<div>     a     b     c\n     d    </div>");
			expect(md).toEqual(" a b c d \n\n");

			md = markdown("<div></div><div>     a     b     c\n     d    </div>");
			expect(md).toEqual(" a b c d \n\n");

			md = markdown("<div>1</div><div>     a     b     c\n     d    </div>");
			expect(md).toEqual("1\n\na b c d \n\n");

			md = markdown("<h1>     a     b     c\n     d </h1>");
			expect(md).toEqual("# a b c d \n\n");
		});

		it("should trim anchor title and text", function() {
			var md = markdown("<a href=\"http://www.example.com\" title=\"   Example   \">   Visit Example    </a>", {"inlineStyle": true});
			expect(md).toEqual("[Visit Example](http://www.example.com \"Example\")");

			md = markdown("<a href=\"http://www.example.com\" title=\"   Example   \">   Visit Example    </a>", {"inlineStyle": false});
			expect(md).toEqual("[Visit Example][0]\n\n[0]: http://www.example.com");

			var html ="<a href='/blog/line-length-readability#comments'>\n";
			html += "<span itemprop='interactionCount'>32</span>\n";
			html += "comments\n</a>";

			md = markdown(html);
			expect(md).toEqual("[32 comments][0]\n\n[0]: /blog/line-length-readability#comments");
		});

		it("should trim image alt and title", function() {
			var html = "<img alt=\"  Example Image   \" title=\"   Free example image   \" src=\"/img/62838.jpg\">";

			var md = markdown(html, {"inlineStyle": true});
			var expected = "![Example Image](/img/62838.jpg \"Free example image\")\n\n";
			expect(md).toEqual(expected);

			md = markdown(html);
			expected = "![Example Image][0]\n\n[0]: /img/62838.jpg";
			expect(md).toEqual(expected);
		});

		it("should be able to convert image followed by link to markdown that can be renderd using showdown", function() {
			var html = "<p>\n";
			html += "	<img alt='Feed' class='icon' src='http://mementodb.com/images/logo.png'/>\n";
			html += "	<a href='http://mementodb.com'>Memento</a>\n";
			html += "</p>";

			var md = markdown(html);
			var expected = "![Feed][0]\n\n[Memento][1]\n\n";
			expected += "[0]: http://mementodb.com/images/logo.png\n";
			expected += "[1]: http://mementodb.com";

			expect(md).toEqual(expected);
		});

		it("should be able to convert list items with linked images as only linked images", function() {
			var html = "before list";
				html += "<ul>\n";
				html += "	<li><div class='curve-down'><a href='/ipad/#video'><img src='http://images.apple.com/home/images/promo_video_ipad_launch.png' alt='Watch the new iPad video' width='237' height='155' /><span class='play'></span></a></div></li>";
				html += "	<li><div class='curve-down'><a href='/iphone/videos/#tv-ads-datenight'><img src='http://images.apple.com/home/images/promo_video_iphone4s_ad.png' alt='Watch the new iPhone TV Ad' width='237' height='155' /><span class='play'></span></a></div></li>";
				html += "</ul>\n";
			var md = markdown(html);
			var expected = "before list\n\n";
			expected += "[![Watch the new iPad video](http://images.apple.com/home/images/promo_video_ipad_launch.png)](/ipad/#video)\n\n";
			expected += "[![Watch the new iPhone TV Ad](http://images.apple.com/home/images/promo_video_iphone4s_ad.png)](/iphone/videos/#tv-ads-datenight)\n\n";
			expect(md).toEqual(expected);
		});

		it("should be able to convert title", function() {
			var html = "<hgroup>\n";
			html += "\t<h1><a href='http://www.google.com'>Nathen Harvey</a></h1>\n";
			html += "\t<h2>a blog</h2>\n";
			html += "</hgroup>";
			var md = markdown(html);

			var expected = "# [Nathen Harvey][0]\n\n## a blog\n\n\n\n[0]: http://www.google.com";
			expect(md).toEqual(expected);
		});

		it("should be able to convert paragrphs in blocquotes", function() {
			var html="<blockquote>\n";
	    	html+="\t<p>Lorem ipsum</p>\n";
	  		html+="\t<p>Lorem ipsum</p>\n";
			html+="</blockquote>";

			var md = markdown(html);
			var expected = "> Lorem ipsum\n\n> Lorem ipsum\n\n";
			expect(md).toEqual(expected);

			html = "<blockquote>\n";
	    	html+="\t<p>Lorem ipsum</p>\n";
			html+="</blockquote>\n";
			html+="<blockquote>\n";
	    	html+="\t<p>Lorem ipsum</p>\n";
			html+="</blockquote>"

			md = markdown(html);
			expect(md).toEqual(expected);
		});

		it("should be able to convert pre block", function() {
			var html = "<pre>";
			html += "	void main(String[] args) {\n";
			html += "		System.out.println(\"Hello Markdown\");\n";
			html += "	}";
			html += "</pre>";

			var expected = "    " + "	void main(String[] args) {\n";
			expected += "    " + "		System.out.println(\"Hello Markdown\");\n";
			expected += "    " + "	}";
			expected += "\n\n";

			var md = markdown(html);
			expect(md).toEqual(expected);
		});

		it("should be able to convert pre block with html tags", function() {
			var html = "<pre>\n";
			html += "<div a=\"b\">\n";
			html += "	<span>this is span inside pre block</span>\n";
			html += "	this is paragraph inside pre block\n";
			html += "</div>";
			html += "</pre>";

			var expected = "    " + "\n\n\n";
			expected += "    " + "	this is span inside pre block\n";
			expected += "    " + "	this is paragraph inside pre block\n";
			expected += "    " + "\n";
			expected += "\n";

			var md = markdown(html);
			expect(md).toEqual(expected);
		});

		it("should be able to convert <pre><code>...</code></pre> blocks", function() {
			var html= "<pre><code>{% blockquote [author[, source]] [link] [source_link_title] %}";
			html+= "\nQuote string";
			html+= "\n{% endblockquote %}";
			html+= "\n</code></pre>";

			var md = markdown(html);
			expected="    {% blockquote [author[, source]] [link] [source_link_title] %}";
	        expected+="\n    Quote string";
	        expected+="\n    {% endblockquote %}";
	        expected+="\n    ";
	        expected+="\n\n";

	        expect(md).toEqual(expected);
		});
	});
}

describe("markdownDOMParser", function() {
	it("parser function should be able to echo input html", function() {
		var html = "<div><span id=\"test-id\"> Hmm <br/> Hello markdown converter </span><!-- this is comment --></div>";
		var result ="";

		markdownHTMLParser(html, {
			start: function(tag, attrs, unary) {
				result+="<"+tag.toLowerCase();

				for ( var i = 0; i < attrs.length; i++ ) {
					result += " " + attrs[i].name + '="' + attrs[i].value + '"';
				}

				result += (unary ? "/" : "") + ">";
			},
			chars: function(text) {
				result += text;
			},
			end: function(tag) {
				result+="</"+tag.toLowerCase()+">";
			},
			comment: function(text) {
				result += "<!--" + text + "-->";
			}
		});
		expect(html).toEqual(result);
	});
});

//TODO add test for block function
//TODO test bookmarklet links
//TODO add test for xss protection
//TODO test parsing of iframe/frame element
//TODO add tests to verify hidden nodes are not parsed
//TODO add more unit tests based on official markdown syntax
//TODO improve formatting of pre/code tags