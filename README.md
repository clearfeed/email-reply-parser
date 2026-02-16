# Email Reply Parser

[![Test and Build](https://github.com/crisp-oss/email-reply-parser/workflows/Test%20and%20Build/badge.svg?branch=master)](https://github.com/crisp-oss/email-reply-parser/actions?query=workflow%3A%22Test+and+Build%22) [![Build and Release](https://github.com/crisp-oss/email-reply-parser/workflows/Build%20and%20Release/badge.svg)](https://github.com/crisp-oss/email-reply-parser/actions?query=workflow%3A%22Build+and+Release%22) [![NPM](https://img.shields.io/npm/v/email-reply-parser.svg)](https://www.npmjs.com/package/email-reply-parser) [![Downloads](https://img.shields.io/npm/dt/email-reply-parser.svg)](https://www.npmjs.com/package/email-reply-parser)

**Email Reply Parser is a node library to parse plain-text email replies and extract content**

This library supports most email replies, signatures and locales.

**😘 Maintainer**: [@baptistejamin](https://github.com/baptistejamin)

## Who uses it?

<table>
<tr>
<td align="center"><a href="https://crisp.chat/"><img src="https://crisp.chat/favicons/favicon-256x256.png" height="64" /></a></td>
</tr>
<tr>
<td align="center">Crisp</td>
</tr>
</table>

_👋 You use this library and you want to be listed there? [Contact us](https://crisp.chat/)._

## Installation

Install the project using NPM:

``` javascript
npm install --save @clearfeed-ai/email-reply-parser
```

## RE2 Support

By default, the library relies on the [RE2](https://github.com/uhop/node-re2) regex engine, which provides better performance and avoids issues like [ReDOS](https://en.wikipedia.org/wiki/ReDoS). By default, RE2 will be installed as a peer dependency.

If you want to explicitly exclude RE2, then `npm uninstall re2`.

## Features

This library is used at [Crisp](https://crisp.chat/) everyday with around 1 million inbound emails. Over the years, we improved this library so it can work with most emails.

- Strip email replies like `On DATE, NAME <EMAIL> wrote:`
- Supports around **10 locales**, including English, French, Spanish, Portuguese, Italian, Japanese, Chinese.
- Removes signatures like `Sent from my iPhone`
- Removes signatures like `Best wishes`

## Usage

``` javascript
var EmailReplyParser = require("@clearfeed-ai/email-reply-parser");

var email =  new EmailReplyParser().read(MY_EMAIL_STRING);

console.log(email.getVisibleText());
```

### Basic Example

``` javascript
var EmailReplyParser = require("@clearfeed-ai/email-reply-parser");

var emailContent = `Hi there,

I appreciate your help with this issue.

Thanks!

On Jan 28, 2026, at 10:00 AM, Support <support@example.com> wrote:

> How can I help you?
> 
> Best regards,
> Support Team`;

var parser = new EmailReplyParser();
var reply = parser.parseReply(emailContent);

console.log(reply);
// Output: "Hi there,\n\nI appreciate your help with this issue."
```

## Custom Regex Patterns

You can add custom header and signature regex patterns at runtime to handle specific email formats that aren't covered by the default patterns.

### Adding Custom Quote Header Patterns

Quote headers are patterns that indicate quoted or forwarded content (e.g., "On DATE, NAME wrote:").

``` javascript
var EmailReplyParser = require("@clearfeed-ai/email-reply-parser");

var parser = new EmailReplyParser();

// Add one or more custom quote header regexes
parser.addQuoteHeaderRegexes([
  /^Forwarded by .+ on .+$/m,
  /^Original message from .+$/m,
  /^----- Reply from .+ -----$/m
]);

// Now parse emails with these custom patterns
var email = parser.read(emailContent);
```

### Adding Custom Signature Patterns

Signature patterns identify signature lines that should be removed (e.g., "Sent from my iPhone", "Best regards").

``` javascript
var EmailReplyParser = require("@clearfeed-ai/email-reply-parser");

var parser = new EmailReplyParser();

// Add one or more custom signature regexes
parser.addSignatureRegexes([
  /^Sent via CompanyName Mobile$/,
  /^Thanks,?$/mi,
  /^Have a great day!?$/mi,
  /^Posted using MyApp$/
]);

// Now parse emails with these custom patterns
var email = parser.read(emailContent);
```

### Resetting to Default Patterns

If you need to reset the patterns back to the defaults:

``` javascript
var EmailReplyParser = require("@clearfeed-ai/email-reply-parser");

var parser = new EmailReplyParser();

// Add custom patterns
parser.addQuoteHeaderRegexes([/^Custom pattern$/m]);

// Reset to default quote header patterns
parser.resetQuoteHeaderRegexes();

// Reset to default signature patterns
parser.resetSignatureRegexes();
```

### Method Chaining

All custom regex methods support method chaining for convenience:

``` javascript
var EmailReplyParser = require("@clearfeed-ai/email-reply-parser");

var email = new EmailReplyParser()
  .addQuoteHeaderRegexes([/^Forwarded by .+$/m])
  .addSignatureRegexes([/^Sent via MyApp$/])
  .read(emailContent);
```

**Note:** Custom patterns are added globally and will affect all subsequent parsing operations. In multi-tenant environments, reset the patterns between tenants or avoid registering tenant-specific patterns globally.

## Contributing

Feel free to fork this project and submit fixes. We may adapt your code to fit the codebase.

You can run unit tests using:

``` javascript
npm test
```

## Credits

* GitHub
* William Durand <william.durand1@gmail.com>
* Crisp IM

## License

email-reply-parser is released under the MIT License. See the bundled LICENSE file for details.

