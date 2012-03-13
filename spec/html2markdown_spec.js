describe("HTML2Markdown", function() {
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

	it("should be able to convert 'This has a <strong>block</strong> word' to 'This has a **block** word'", function() {
		var md = HTML2Markdown("This has a <strong>block</strong> word");
		expect(md).toMatch(/This has a \*{2}block\*{2} word/);
	});

	it("should be able to convert 'This has <strong>blocked and <em>italicized</em></strong> texts.' to 'This has **blocked and _italicized_** texts.'", function() {
		var md = HTML2Markdown("This has <strong>blocked and <em>italicized</em></strong> texts.");
		expect(md).toMatch(/This has \*{2}blocked and \_italicized\_\*{2} texts\./);
	});

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

	it("should be able to convert '<h5>H5<h5>' to '##### H5\\n\\n'", function() {
		var md = HTML2Markdown("<h5>H5</h5>");
		expect(md).toMatch(/\#{5} H5\n\n/);
	});

	it("should be able to convert '<h6>H6</h6>' to '###### H6\\n\\n'", function() {
		var md = HTML2Markdown("<h6>H6</h6>");
		expect(md).toMatch(/\#{6} H6\n\n/);
	});

	it("should be able to convert '<hr />' to '- - -\\n\\n'", function() {
		var md = HTML2Markdown("<hr />");
		expect(md).toEqual("- - -\n\n");
	});

	it("should be able to convert '<ul><li>item a</li><li>item b</li></ul>' to '* item a\\n*item b\\n'", function() {
		var md = HTML2Markdown("<ul><li>item a</li><li>item b</li></ul>");
		expect(md).toMatch(/\* item a\n\* item b\n/);
	});

	it("should be able to convert '<ol><li>item 1</li><li>item 2</li></ol>' to '1. item 1\\n1. item 2\\n'", function() {
		var md = HTML2Markdown("<ol><li>item 1</li><li>item 2</li></ol>");
		expect(md).toMatch(/1\. item 1\n1\. item 2\n/);
	});

	it("should be able to convert '<a href=\"http://www.example.com\" title=\"Example\">Visit Example</a>' to '[Visit Example](http://www.example.com \"Example\")'", function() {
		var md = HTML2Markdown("<a href=\"http://www.example.com\" title=\"Example\">Visit Example</a>");
		expect(md).toEqual("[Visit Example](http://www.example.com \"Example\")");
	});

	it("should be able to convert '<blockquote>This is blockquoted</blockquote>' to '> This is blockquoted'", function() {
		var md = HTML2Markdown("<blockquote>This is blockquoted</blockquote>");
		expect(md).toMatch("> This is blockquoted");
	});

	it("should be able to convert '<p>This is a paragraph. This is the second sentence.</p>' to 'This is a paragraph. This is the second sentence.\\n\\n'", function() {
		var md = HTML2Markdown("<p>This is a paragraph. This is the second sentence.</p>");
		expect(md).toEqual("This is a paragraph. This is the second sentence.\n\n");
	});

	var html = "<p>This is a paragraph. Followed by a blockquote.</p><blockquote><p>This is a blockquote which will be truncated at 75 characters width. It will be somewhere around here.</p></blockquote>";
	html += "<p>Some list for you:</p><ul><li>item a</li><li>item b</li></ul><p>So which one do you choose?</p>";
	it("should be able to convert a block of html", function() {
		var md = HTML2Markdown(html);
		var md_str = "This is a paragraph\. Followed by a blockquote\.\n\n\> This is a blockquote which will be truncated at 75 characters width\. It \nwill be somewhere around here\.\n\nSome list for you:\n\n\* item a\n\* item b\n\nSo which one do you choose\?\n\n";
		expect(md).toEqual(md_str);
	});
});
