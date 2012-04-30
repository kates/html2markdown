describe("HTML2Markdown", function() {
	it("should be able to convert '<h1>H1</h1>' to '# H1\\n\\n'", function() {
		var md = HTML2Markdown("<h1>H1</h1>");
		expect(md).toMatch(/\# H1\n\n/);
	});

	it("should be able to convert '<h2>H2</h2>' to '## H2\\n\\n'", function() {
		var md = HTML2Markdown("<h2>H2</h2>");
		expect(md).toMatch(/\#{2} H2\n\n/);
	});

	it("should be able to convert '<h3>H3</h3>' to '### H3\\n\\n'", function() {
		var md = HTML2Markdown("<h3>H3</h3>");
		expect(md).toMatch(/\#{3} H3\n\n/);
	});

	it("should be able to convert '<h4>H4</h4>' to '#### H4\\n\\n'", function() {
		var md = HTML2Markdown("<h4>H4</h4>");
		expect(md).toMatch(/\#{4} H4\n\n/);
	});

	it("should be able to convert '<h5>H5</h5>' to '##### H5\\n\\n'", function() {
		var md = HTML2Markdown("<h5>H5</h5>");
		expect(md).toMatch(/\#{5} H5\n\n/);
	});

	it("should be able to convert '<h6>H6</h6>' to '###### H6\\n\\n'", function() {
		var md = HTML2Markdown("<h6>H6</h6>");
		expect(md).toMatch(/\#{6} H6\n\n/);
	});
	
	it("should be able to convert '<strong>Bold</strong>' to '**Bold**'", function() {
		var md = HTML2Markdown("<strong>Bold</strong>");
		expect(md).toMatch(/\*{2}Bold\*{2}/);
	});

	it("should be able to convert '<b>Bold</b>' to '**Bold**'", function() {
		var md = HTML2Markdown("<b>Bold</b>");
		expect(md).toMatch(/\*{2}Bold\*{2}/);
	});

	it("should be able to convert '<em>Italic</em>' to '_Italic_'", function() {
		var md = HTML2Markdown("<em>Italic</em>");
		expect(md).toMatch(/\_Italic\_/);
	});

	it("should be able to convert '<i>Italic</i>' to '_Italic_'", function() {
		var md = HTML2Markdown("<i>Italic</i>");
		expect(md).toMatch(/\_Italic\_/);
	});

	it("should be able to convert '<title>This is document Title</title>' to '# This is document Title\\n\\n'", function() {
		var md = HTML2Markdown("<title>This is document Title</title>");
		expect(md).toMatch(/\# This is document Title\n\n/);
	}); 
	
	//test to verify that inline element render correctly when they start/finish with space
	it("should be able to convert '<strong> String </strong>' to '**String**'", function() {
		var md = HTML2Markdown("<strong> String </strong>");
		expect(md).toMatch(/\*{2}String\*{2}/);
	});

	it("should be able to convert 'This has a <strong>block</strong> word' to 'This has a **block** word'", function() {
		var md = HTML2Markdown("This has a <strong>block</strong> word");
		expect(md).toMatch(/This has a \*{2}block\*{2} word/);
	});

	it("should be able to convert '<hr />' to '- - -\\n\\n'", function() {
		var md = HTML2Markdown("<hr />");
		expect(md).toEqual("- - -\n\n");
	});

	it("should be able to convert '<br/>' to '  \\n'", function() {
		var md = HTML2Markdown("this is text before break<br/>this is text after break");
		expect(md).toMatch("  \n");
	});
	
	it("should be able to convert 'This has <strong>blocked and <em>italicized</em></strong> texts.' to 'This has **blocked and _italicized_** texts.'", function() {
		var md = HTML2Markdown("This has <strong>blocked and <em>italicized</em></strong> texts.");
		expect(md).toMatch(/This has \*{2}blocked and \_italicized\_\*{2} texts\./);
	});

	
	//test for block 
	//TODO (verify this test how is this testing block function)
//	it("should be able to convert '<h1>H1</h1>this is text' to '# H1\\n\\nthis is text'", function() {
//		var md = HTML2Markdown("<h1>H1</h1>this is text");
//		expect(md).toMatch(/\# H1\n\nthis is text/);
//	});
//	
//	it("should be able to convert 'this is text<h1>H1</h1>' to 'this is text# H1\\n\\n'", function() {
//		var md = HTML2Markdown("this is text<h1>H1</h1>");
//		console.log(md);
//		expect(md).toMatch(/this is text\n\n\# H1\n\n/);
//	});
	
	it("should be able to convert 'this is text before hr<hr/>this is text after hr' to 'this is text before hr  \\nthis is text after hr'", function() {
		var md = HTML2Markdown("this is text before hr<hr/>this is text after hr");
		expect(md).toMatch("this is text before hr\n\n- - -\n\nthis is text after hr");
	});

	it("should be able to convert 'this is text before break<br/>this is text after break' to 'this is text before break  \\nthis is text after break'", function() {
		var md = HTML2Markdown("this is text before break<br/>this is text after break");
		expect(md).toMatch("this is text before break  \nthis is text after break");
	});
	
	it("should be able to convert '<p>This is a paragraph. This is the second sentence.</p>' to 'This is a paragraph. This is the second sentence.\\n\\n'", function() {
		var md = HTML2Markdown("<p>This is a paragraph. This is the second sentence.</p>");
		expect(md).toEqual("This is a paragraph. This is the second sentence.\n\n");
	});

	it("should be able to convert 'this is text before paragraph<p>This is a paragraph</p>this is text after paragraph' to 'this is text before paragraph\nThis is a paragraph\n\nthis is text after paragraph'", function() {
		var md = HTML2Markdown("this is text before paragraph<p>This is a paragraph</p>this is text after paragraph");
		console.log(md);
		expect(md).toEqual("this is text before paragraph\n\nThis is a paragraph\n\nthis is text after paragraph");
	});

	it("should be able to convert span element", function() {
		var md = HTML2Markdown("<span>this is span element</span>");
		expect(md).toEqual(" this is span element ");
		
		md = HTML2Markdown("before<span>this is span element</span>after");
		expect(md).toEqual("before this is span element after");
		
		md = HTML2Markdown("before <span>this is span element</span> after");
		expect(md).toEqual("before this is span element after");
	});

	it("should be able to convert '<blockquote>This is blockquoted</blockquote>' to '> This is blockquoted'", function() {
		var md = HTML2Markdown("<blockquote>This is blockquoted</blockquote>");
		expect(md).toMatch("> This is blockquoted");
	});
	
	//nested blockquote
	it("should be able to convert '<blockquote>This is blockquoted<blockquote>This is nested blockquoted</blockquote></blockquote>' to '> This is blockquoted'", function() {
		var md = HTML2Markdown("<blockquote>This is blockquoted<blockquote>This is nested blockquoted</blockquote></blockquote>");
		console.log(md);
		expect(md).toMatch("> This is blockquoted\n\n> > This is nested blockquoted");
	});
	
	//enable when wordwrap ie enabled
//	var html = "<p>This is a paragraph. Followed by a blockquote.</p><blockquote><p>This is a blockquote which will be truncated at 75 characters width. It will be somewhere around here.</p></blockquote>";
//	html += "<p>Some list for you:</p><ul><li>item a</li><li>item b</li></ul><p>So which one do you choose?</p>";
//	it("should be able to convert a block of html", function() {
//		var md = HTML2Markdown(html);
//		var md_str = "This is a paragraph\. Followed by a blockquote\.\n\n\> \nThis is a blockquote which will be truncated at 75 characters width\. It \nwill be somewhere around here\.\n\nSome list for you:\n\n\* item a\n\* item b\n\nSo which one do you choose\?\n\n";
//		expect(md).toEqual(md_str);
//	});

	it("should be able to convert unordered list", function() {
		var md = HTML2Markdown("<ul><li>item a</li><li>item b</li></ul>");
		expect(md).toMatch(/\* item a\n\* item b\n/);
	});

	it("should be able to convert ordered list", function() {
		var md = HTML2Markdown("<ol><li>item 1</li><li>item 2</li></ol>");
		expect(md).toMatch(/1\. item 1\n1\. item 2\n/);
	});
	
	it("should be able to convert nested lists", function() {
		var md = HTML2Markdown("<ul><li>item a<ul><li>item aa</li><li>item bb</li></ul></li><li>item b</li></ul>");		
		console.log(md);
		expect(md).toMatch(/\* item a\n  \* item aa\n  \* item bb\n\* item b\n/);		
	});

	it("should not convert empty list items", function() {
		var md = HTML2Markdown("<ol><li>item 1</li><li/></ol>");
		expect(md).toMatch(/1\. item 1\n/);
		
		md = HTML2Markdown("<ul><li>item 1</li><li></li></ol>");
		expect(md).toMatch(/\* item 1\n/);
	});
	
	
	var base = location.protocol+"//"+location.hostname;
	location.port != 80 ? base += ":" + location.port : true;
	
	it("should be able to convert images inline style", function() {
		var md = HTML2Markdown("<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>", {"inlineStyle": true});		
		var expected = "![Example Image]("+base+"/img/62838.jpg \"Free example image\")\n\n";
		expect(md).toEqual(expected);
	});

	it("should be able to convert images reference style", function() {
		var md = HTML2Markdown("<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>");		
		var expected = "![Example Image][0]\n\n[0]: http://localhost:5984/img/62838.jpg";
		expect(md).toEqual(expected);
		
		//if alt is empty then title should be used
		md = HTML2Markdown("<img title=\"Free example image title\" src=\"/img/62838.jpg\">");		
		var expected = "![Free example image title][0]\n\n[0]: http://localhost:5984/img/62838.jpg";
		expect(md).toEqual(expected);
		
	});
	
	it("should be able to convert images as block elements", function() {
		var md = HTML2Markdown("before<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>after");		
		var expected = "before\n\n![Example Image][0]\n\nafter\n\n[0]: http://localhost:5984/img/62838.jpg";
		expect(md).toEqual(expected);
		
		var md = HTML2Markdown("before<img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"/>after", {"inlineStyle": true});		
		var expected = "before\n\n![Example Image]("+base+"/img/62838.jpg \"Free example image\")\n\nafter";
		expect(md).toEqual(expected);
	});

	it("should not convert images if url is empty", function() {
		var md = HTML2Markdown("<img alt=\"Example Image\" title=\"Free example image\">");		
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
		
		var md = HTML2Markdown(html);
		console.log(md);
		expect(md).toEqual(expected);
	});
	
	it("should be able to convert links inline style", function() {
		var md = HTML2Markdown("<a href=\"http://www.example.com\" title=\"Example\">Visit Example</a>", {"inlineStyle": true});
		expect(md).toEqual("[Visit Example](http://www.example.com \"Example\")");
	});
	
	it("should not convert if link has no text to display", function() {
		var html = "<a href='/'/>";
		md = HTML2Markdown(html);
		console.log(md);		
		expect(md).toEqual("");
		
		html = "<div class='logo'>\n";
		html += "	<a href='/'/>\n";
		html += "</div>";
		
		md = HTML2Markdown(html);
		expect(md).toEqual("");
	});
	
	it("should convert elements with child elements surrounded by whitespace", function() {
		var html = "<div>\n\t<h2>\n\t\t<a href='http://finance.yahoo.com'>Yahoo! Finance</a>\n\t</h2>\n</div>";
		md = HTML2Markdown(html);
		console.log(md);		
		expect(md).toEqual("## [Yahoo! Finance][0]\n\n[0]: http://finance.yahoo.com");
		
		html = "<span>\n\t<b>Hello</b>\n\t</span>";
		md = HTML2Markdown(html);
		console.log(md);		
		expect(md).toEqual(" **Hello** ");		
	});
	
	
	it("should convert image wrapped in anchor to markdown that can be rendered using showdown - inline style parsing", function() {
		var md = HTML2Markdown("<a href=\"/exec/j/4/?pid=62838&lno=1&afsrc=1\"><img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"></a>", {"inlineStyle": true});		
		var expected = "[![Example Image]("+ base +"/img/62838.jpg \"Free example image\")]("+base+"/exec/j/4/?pid=62838&lno=1&afsrc=1)";
		console.log(md);
		console.log(expected);
		expect(md).toEqual(expected);
	});

	it("should convert image wrapped in anchor to markdown that can be rendered using showdown - reference style parsing", function() {
		var md = HTML2Markdown("<a href=\"/exec/j/4/?pid=62838&lno=1&afsrc=1\"><img alt=\"Example Image\" title=\"Free example image\" src=\"/img/62838.jpg\"></a>", {"inlineStyle": false});		
		var expected = "[![Example Image]("+ base +"/img/62838.jpg \"Free example image\")]("+base+"/exec/j/4/?pid=62838&lno=1&afsrc=1)";
		console.log(md);
		console.log(expected);
		expect(md).toEqual(expected);
	});

	it("should output only text of empty links", function() {
		var md = HTML2Markdown("<a href=''>Empty Link Text</a>", {"inlineStyle": true});		
		var expected = "Empty Link Text";
		console.log(md);
		console.log(expected);
		expect(md).toEqual(expected);
	});
	
	//tags that have no parsing rules e.g. form elements 'head', 'style', script', 'link' 'option', 'noscript', 'noframes', 'input', 'button', 'select', 'textarea', and 'label'
	var html1 = "<head><link rel='openid.delegate' href='http://jeresig.livejournal.com/'/>";
	html1 +=	"<script src='http://ejohn.org/files/retweet.js'></script></head>";
	it("should not convert any elements that have no parsing rules. ", function() {
		var md = HTML2Markdown(html1);
		expect(md).toEqual("");
	});	
	
	//tables
	it("should be able to convert tables", function() {
		var html = "<table border=\"1\">";
		html += "<tr><td>Row 1 Cell 1</td><td>Row 1 Cell 2</td></tr>";
		html += "<tr><td>Row 2 Cell 1</td><td>Row 2 Cell 2</td></tr>";
		html += "</table>";
		
		var md = HTML2Markdown(html);		
		console.log(md);
		
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
		
		var md = HTML2Markdown(html);
		console.log(md);
		var expected = "* List Item 1\n* List Item 2\n\n* List Item 3\n* List Item 4\n\n";

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
		
		var md = HTML2Markdown(html);		

		expect(md).toEqual(expected);
	});

	it("should be able to convert pre block with html tags", function() {
		var html = "<pre>\n";
		html += "<div>\n";
		html += "	<span>this is span inside pre block</span>\n";
		html += "	<p>this is paragraph inside pre block</p>\n";		
		html += "</div>";
		html += "</pre>";
		
		var expected = "    " + "<div>\n";
		expected += "    " + "	<span>this is span inside pre block</span>\n";
		expected += "    " + "	<p>this is paragraph inside pre block</p>\n";		
		expected += "    " + "</div>";
		expected += "\n\n";
		var md = HTML2Markdown(html);		

		expect(md).toEqual(expected);
	});

	//test empty block element
	it("should not convert emptyt tags", function() {
		var md = HTML2Markdown("<div>        </div>");
		console.log(md);
		expect(md).toEqual("");
		
		md = HTML2Markdown("<h1>        </h1>");
		console.log(md);
		expect(md).toEqual("");

		md = HTML2Markdown("<b>        </b>");
		console.log(md);
		expect(md).toEqual("");
	});
	
	it("should collape whitespace to single space for text nodes", function() {
		var md = HTML2Markdown("<div>     a     b     c\n     d    </div>");
		expect(md).toEqual(" a b c d \n\n");
		
		md = HTML2Markdown("<div></div><div>     a     b     c\n     d    </div>");
		expect(md).toEqual(" a b c d \n\n");
		
		md = HTML2Markdown("<div>1</div><div>     a     b     c\n     d    </div>");
		console.log(md);
		expect(md).toEqual("1\n\na b c d \n\n");
		
		md = HTML2Markdown("<h1>     a     b     c\n     d </h1>");
		expect(md).toEqual("# a b c d \n\n");
	});
	
	it("should trim anchor title and text", function() {
		var md = HTML2Markdown("<a href=\"http://www.example.com\" title=\"   Example   \">   Visit Example    </a>", {"inlineStyle": true});
		expect(md).toEqual("[Visit Example](http://www.example.com \"Example\")");
		
		md = HTML2Markdown("<a href=\"http://www.example.com\" title=\"   Example   \">   Visit Example    </a>", {"inlineStyle": false});
		expect(md).toEqual("[Visit Example][0]\n\n[0]: http://www.example.com");
		
		var html ="<a href='/blog/line-length-readability#comments'>\n";
		html += "<span itemprop='interactionCount'>32</span>\n";
		html += "comments\n</a>";
		
		md = HTML2Markdown(html);
		console.log(md);	
		expect(md).toEqual("[32 comments][0]\n\n[0]: "+base+"/blog/line-length-readability#comments");
	});

	it("should trim image alt and title", function() {
		var html = "<img alt=\"  Example Image   \" title=\"   Free example image   \" src=\"/img/62838.jpg\">";
		
		var md = HTML2Markdown(html, {"inlineStyle": true});		
		var expected = "![Example Image]("+base+"/img/62838.jpg \"Free example image\")\n\n";
		expect(md).toEqual(expected);
		
		md = HTML2Markdown(html);
		expected = "![Example Image][0]\n\n[0]: http://localhost:5984/img/62838.jpg";
		expect(md).toEqual(expected);
	});

	it("should be able to convert image followed by link to markdown that can be renderd using showdown", function() {
		var html = "<p>\n";
		html += "	<img alt='Feed' class='icon' src='http://baymard.com/images/feed.png?1332492828'/>\n";
		html += "	<a href='http://feeds.feedburner.com/baymard'>Subscribe via RSS</a>\n";
		html += "</p>";
		
		var md = HTML2Markdown(html);
		console.log(md);
	});
	
	//getNormalizedUrl(...)
	it("test getNormalizedUrl()", function() {		
		expect(getNormalizedUrl("http://localhost:5984/html2markdown/")).toEqual("http://localhost:5984/html2markdown/");
		expect(getNormalizedUrl("/html2markdown/")).toEqual(base + "/html2markdown/");
		expect(getNormalizedUrl("page")).toMatch(/\/page$/);
		expect(getNormalizedUrl("/img/62838.jpg")).toEqual(base + "/img/62838.jpg");		
	});

	it("parser function should be able to echo input html", function() {
		var html = "<div><span id=\"test-id\"> Hmm <br/> Hello HTML2Markdown converter </span><!-- this is comment --></div>";
		
		var e = document.createElement('div');
		e.innerHTML = html;
		
		var result ="";
		HTMLParser(e, {
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
	
	//TODO test bookmarklet links
	//TODO add test for xss protection
	//TODO test parsing of iframe/frame element
	//TODO add tests to verify hidden nodes are not parsed
	//TODO add more unit tests based on official markdown syntax
});