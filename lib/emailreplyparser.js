var EmailParser = require("./parser/emailparser");
var RegexList = require("./regex");

class EmailReplyParser {
    read(text) {
      return new EmailParser().parse(text);
    }

    parseReply(text) {
      return this.read(text).getVisibleText();
    }

    parseReplied(text) {
      return this.read(text).getQuotedText();
    }

    /**
     * Add a custom quote header regex
     */
    addQuoteHeaderRegex(regex) {
      RegexList.addQuoteHeaderRegex(regex);
      return this;
    }

    /**
     * Add multiple custom quote header regexes
     */
    addQuoteHeaderRegexes(regexes) {
      RegexList.addQuoteHeaderRegexes(regexes);
      return this;
    }

    /**
     * Add a custom signature regex
     */
    addSignatureRegex(regex) {
      RegexList.addSignatureRegex(regex);
      return this;
    }

    /**
     * Add multiple custom signature regexes
     */
    addSignatureRegexes(regexes) {
      RegexList.addSignatureRegexes(regexes);
      return this;
    }

    /**
     * Reset quote header regexes to default
     */
    resetQuoteHeaderRegexes() {
      RegexList.resetQuoteHeaderRegexes();
      return this;
    }

    /**
     * Reset signature regexes to default
     */
    resetSignatureRegexes() {
      RegexList.resetSignatureRegexes();
      return this;
    }
}

module.exports = EmailReplyParser;
