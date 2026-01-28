/*
 * email-reply-parser
 *
 * Copyright 2025, Mirage AI
 * Author: Baptiste Jamin <baptiste@jam.in>
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: LIB
import EmailParser from "./parser/emailparser.js";
import RegexList from "./regex.js";

/**
 * EmailReplyParser
 */
class EmailReplyParser {
  /**
   * Parse an email
   */
  public read(text: string) {
    return new EmailParser().parse(text);
  }

  /**
   * Parse a reply
   */
  public parseReply(text: string) {
    return this.read(text).getVisibleText();
  }

  /**
   * Parse a replied email
   */
  public parseReplied(text: string) {
    return this.read(text).getQuotedText();
  }

  /**
   * Add multiple custom quote header regexes
   */
  public addQuoteHeaderRegexes(regexes: RegExp[]): this {
    RegexList.addQuoteHeaderRegexes(regexes);
    return this;
  }

  /**
   * Add multiple custom signature regexes
   */
  public addSignatureRegexes(regexes: RegExp[]): this {
    RegexList.addSignatureRegexes(regexes);
    return this;
  }

  /**
   * Reset quote header regexes to default
   */
  public resetQuoteHeaderRegexes(): this {
    RegexList.resetQuoteHeaderRegexes();
    return this;
  }

  /**
   * Reset signature regexes to default
   */
  public resetSignatureRegexes(): this {
    RegexList.resetSignatureRegexes();
    return this;
  }
}

export default EmailReplyParser;
