Changelog
=========

## v2.0.2

**Package renamed from `email-reply-parser` to `@clearfeed-ai/email-reply-parser`.**

- Add support for custom header and signature regex patterns at runtime.
- Add methods: `addQuoteHeaderRegex()`, `addQuoteHeaderRegexes()`, `addSignatureRegex()`, `addSignatureRegexes()`.
- Add reset methods: `resetQuoteHeaderRegexes()`, `resetSignatureRegexes()`.
- Fix issue with custom regexes that don't have capture groups.
- Add TypeScript declaration file (index.d.ts) for better IDE support.

## v2.0.1

- Previous version with CommonJS support
