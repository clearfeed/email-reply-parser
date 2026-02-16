var fs               = require("fs");
var _                = require("underscore");
var EmailReplyParser = require("../lib/emailreplyparser");

const COMMON_FIRST_FRAGMENT = 'Fusce bibendum, quam hendrerit sagittis tempor, dui turpis tempus erat, pharetra sodales ante sem sit amet metus.\n\
Nulla malesuada, orci non vulputate lobortis, massa felis pharetra ex, convallis consectetur ex libero eget ante.\n\
Nam vel turpis posuere, rhoncus ligula in, venenatis orci. Duis interdum venenatis ex a rutrum.\n\
Duis ut libero eu lectus consequat consequat ut vel lorem. Vestibulum convallis lectus urna,\n\
et mollis ligula rutrum quis. Fusce sed odio id arcu varius aliquet nec nec nibh.';

function get_email(name) {
  var data = fs.readFileSync(__dirname + "/fixtures/" + name + ".txt", "utf-8");

  return new EmailReplyParser().read(data);
}

exports.test_reads_simple_body = function(test){
  reply = get_email("email_1");

  test.equal(2, reply.fragments.length);

  test.deepEqual([false, false], _.map(reply.fragments, function(f) { return f.isQuoted(); }));
  test.deepEqual([false, true], _.map(reply.fragments, function(f) { return f.isHidden(); }));

   test.equal("Hi folks\n\nWhat is the best way to clear a Riak bucket of all key, values after\nrunning a test?\nI am currently using the Java HTTP API.\n\n-Abhishek Kona\n\n", reply.fragments[0].toString());

  test.done();
};

exports.test_reads_top_post = function(test){
  let email = get_email("email_3");

  let fragments = email.getFragments();

  test.equal("Hi folks\n\nWhat is the best way to clear a Riak bucket of all key, values after\nrunning a test?\nI am currently using the Java HTTP API.\n\n-Abhishek Kona\n\n", reply.fragments[0].toString());

  test.done();
};

exports.test_reads_bottom_post = function(test){
    let email = get_email("email_2");

    let fragments = email.getFragments();
  test.equal(6, fragments.length);

  test.equal("Hi,", fragments[0]);
  test.equal(true, /^On [^\:]+\:/.test(fragments[1]));
  test.equal(true, /^You can list/.test(fragments[2]));
  test.equal(true, /^>/.test(fragments[3]));
  test.equal(true, /^_/.test(fragments[5]));
  test.done();
};

exports.test_recognizes_data_string_above_quote = function(test){
  let email = get_email("email_4");

  let fragments = email.getFragments();

  test.equal(true, /^Awesome/.test(fragments[0]));
  test.equal(true, /^On/.test(fragments[1]));
  test.equal(true, /Loader/.test(fragments[1]));
  test.done();
};

exports.test_complex_body_with_only_one_fragment = function(test){
  let email = get_email("email_5");

  let fragments = email.getFragments();

  test.equal(1, fragments.length);
  test.done();
};

exports.test_deals_with_multiline_reply_headers = function(test){
  let email = get_email("email_6");

  let fragments = email.getFragments();

  test.equal(true, /^I get/.test(fragments[0]));
  test.equal(true,/^On/.test(fragments[1]));
  test.equal(true, /Was this/.test(fragments[1]));

  test.done();
};

exports.test_email_with_italian = function(test) {
  let email = get_email("email_7");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_with_dutch = function(test) {
  let email = get_email("email_8");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_with_signature = function(test) {
  let email = get_email("email_9");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_with_hotmail = function(test) {
  let email = get_email("email_10");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_whitespace_before_header = function(test) {
  let email = get_email("email_11");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_square_brackets = function(test) {
  let email = get_email("email_12");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_da_into_italian = function(test) {
  let email = get_email("email_13");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_header_polish = function(test) {
  let email = get_email("email_14");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_sent_from_my = function(test) {
  let email = get_email("email_15");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_header_polish_with_dnia_and_napisala = function(test) {
  let email = get_email("email_16");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_header_polish_with_date_in_iso8601 = function(test) {
  let email = get_email("email_17");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_outlook_en = function(test) {
  let email = get_email("email_18");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_22 = function(test) {
  let email = get_email("email_22");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_23 = function(test) {
  let email = get_email("email_23");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_25 = function(test) {
  let email = get_email("email_25");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_26 = function(test) {
  let email = get_email("email_26");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_portuguese = function(test) {
  let email = get_email("email_portuguese");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_german = function(test) {
  let email = get_email("email_german");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_german_2 = function(test) {
  let email = get_email("email_german_2");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_german_3 = function(test) {
  let email = get_email("email_german_3");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_gmail_no = function(test) {
  let email = get_email("email_norwegian_gmail");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_finnish = function(test) {
  let email = get_email("email_finnish");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_italian = function(test) {
  let email = get_email("email_italian");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_with_correct_signature = function(test) {
  let email = get_email("correct_sig");

  let fragments = email.getFragments();

  test.equal(2, fragments.length);
  test.equal(false, fragments[1].isQuoted());
  test.equal(false, fragments[0].isSignature());
  test.equal(true, fragments[1].isSignature());
  test.equal(false, fragments[0].isHidden());
  test.equal(true, fragments[1].isHidden());

  test.equal(true, /^--\nrick/.test(fragments[1]));

  test.done();
};

exports.test_reads_email_with_signature_with_no_empty_line_above = function(test) {
  let email = get_email("sig_no_empty_line");

  let fragments = email.getFragments();

  test.equal(2, fragments.length);
  test.equal(false, fragments[0].isQuoted());
  test.equal(false, fragments[1].isQuoted());

  test.equal(false, fragments[0].isSignature());
  test.equal(true, fragments[1].isSignature());

  test.equal(false, fragments[0].isHidden());
  test.equal(true, fragments[1].isHidden());

  test.equal(true, /^--\nrick/.test(fragments[1]));

  test.done();
};

exports.test_one_is_not_one = function(test) {
  let email = get_email("email_one_is_not_on");

  let fragments = email.getFragments();

  test.equal(true, /One outstanding question/.test(fragments[0]));
  test.equal(true, /^On Oct 1, 2012/.test(fragments[1]));

  test.done();
};

exports.test_sent_from = function(test) {
  let email = get_email("email_sent_from");

  test.equal("Hi it can happen to any texts you type, as long as you type in between words or paragraphs.\n", email.getVisibleText());

  test.done();
};

exports.test_email_emoji = function(test) {
  let email = get_email("email_emoji");

  test.equal("🎉\n\n—\nJohn Doe\nCEO at Pandaland\n\n@pandaland", email.getVisibleText());

  test.done();
};

exports.test_email_with_quotes = function(test) {
  let email = get_email("email_with_quotes");

  test.equal("Thank you very much.\n\nhere is the code:\n> console.log(\"A\")\n> console.log(\"B\")\n>\n> {\n>     \"summary\": {\n>         \"totalPartnershipsCount\": 0\n>     },\n>     \"partnerships\": []\n> }\nBaptiste\n", email.getVisibleText());

  test.done();
};

exports.test_email_not_a_signature = function(test) {
  let email = get_email("email_not_a_signature");

  let fragments = email.getFragments();

  test.equal(false, fragments[0].isSignature());
  test.equal(1, fragments.length);

  test.done();
};

exports.test_email_not_a_signature_2 = function(test) {
  let email = get_email("email_not_a_signature_2");

  let fragments = email.getFragments();

  test.equal(false, fragments[0].isSignature());
  test.equal(1, fragments.length);

  test.done();
};

exports.test_email_24 = function(test) {
  let email = get_email("email_24");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());

  test.done();
};

exports.test_email_outlook = function(test) {
  let email = get_email("email_outlook_split_line_from");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.test_email_gmail = function(test) {
  let email = get_email("email_gmail_split_line_from");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.text_email_reply_header = function(test) {
  let email = get_email("email_reply_header");

  let fragments = email.getFragments();

  const firstFragmentRegex = /^On the other hand/m;
  const secondFragmentRegex = /^On Wed, Dec 9/m;

  test.equal(firstFragmentRegex.test(fragments[0].toString().trim()), true)
  test.equal(secondFragmentRegex.test(fragments[1].toString().trim()), true)

  test.done();
}

exports.text_email_ios_outlook_fr = function(test) {
  let email = get_email("email_ios_outlook_fr");

  let fragments = email.getFragments();
  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(3, fragments.length);

  test.done();
}

exports.text_email_ios_outlook = function(test) {
  let email = get_email("email_ios_outlook");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(3, fragments.length);

  test.done();
}

exports.text_email_msn = function(test) {
  let email = get_email("email_msn");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.text_email_zoho = function(test) {
  let email = get_email("email_zoho");

  let fragments = email.getFragments();

  test.equal("What is the best way to clear a Riak bucket of all key, values after\nrunning a test?\n", fragments[0].toString());

  test.done();
}

exports.text_email_regards = function(test) {
  let email = get_email("email_with_regards");

  let fragments = email.getFragments();

  test.equal("Hi,\n\nI still have the same problem....\n\nCan you help?\n", fragments[0].toString());

  test.done();
}

exports.test_email_fr_multiline = function(test) {
  let email = get_email("email_fr_multiline");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.test_email_fr_2 = function(test) {
  let email = get_email("email_french_2");

  let text = email.getVisibleText().trim();

  test.equal(COMMON_FIRST_FRAGMENT, text);

  test.done();
}

exports.test_email_en_multiline_2 = function(test) {
  let email = get_email("email_en_multiline_2");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.test_email_original_message = function(test) {
  let email = get_email("email_original_message");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.test_email_original_message_2 = function(test) {
  let email = get_email("email_original_message_2");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.test_email_original_message_danish_dash = function(test) {
  let email = get_email("email_danish_dash_separator");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

exports.test_email_original_message_french_dash = function(test) {
  let email = get_email("email_french_dash_separator");

  let fragments = email.getFragments();

  test.equal(COMMON_FIRST_FRAGMENT, fragments[0].toString().trim());
  test.equal(2, fragments.length);

  test.done();
}

// Tests for custom regex functionality

exports.test_addQuoteHeaderRegexes_single_pattern = function(test) {
  var emailContent = `Hi team,

This is my reply.

Forwarded by John Smith on Jan 28, 2026

> Original message below
> Previous content here`;

  // Without custom pattern
  var parser1 = new EmailReplyParser();
  var result1 = parser1.parseReply(emailContent);

  test.equal(true, /Forwarded by John Smith/.test(result1));
  
  // With custom pattern
  var parser2 = new EmailReplyParser();

  parser2.addQuoteHeaderRegexes([/^Forwarded by .+ on .+$/m]);
  
  var result2 = parser2.parseReply(emailContent);

  test.equal(false, /Forwarded by John Smith/.test(result2));
  test.equal(false, /Original message below/.test(result2));
  test.equal(true, /This is my reply/.test(result2));
  
  test.done();
}

exports.test_addQuoteHeaderRegexes_multiple_patterns = function(test) {
  var emailContent = `My response here

Original message from support@example.com

> Previous email content

----- Reply from jane@example.com -----

> Another quoted section`;

  var parser = new EmailReplyParser();

  parser.addQuoteHeaderRegexes([
    /^Original message from .+$/m,
    /^----- Reply from .+ -----$/m
  ]);
  
  var result = parser.parseReply(emailContent);

  test.equal(true, /My response here/.test(result));
  test.equal(false, /Original message from/.test(result));
  test.equal(false, /Reply from jane/.test(result));
  test.equal(false, /Previous email content/.test(result));
  test.equal(false, /Another quoted section/.test(result));
  
  test.done();
}

exports.test_addSignatureRegexes_single_pattern = function(test) {
  var emailContent = `Hi there,

Thanks for your help!

Custom Signature Line
Posted using MyCustomApp

Best regards,
Jane`;

  // Without custom pattern
  var parser1 = new EmailReplyParser();
  var result1 = parser1.parseReply(emailContent);

  test.equal(true, /Custom Signature Line/.test(result1));
  test.equal(true, /Posted using MyCustomApp/.test(result1));
  
  // With custom patterns
  var parser2 = new EmailReplyParser();

  parser2.addSignatureRegexes([
    /^Posted using MyCustomApp$/,
    /^Custom Signature Line$/
  ]);
  
  var result2 = parser2.parseReply(emailContent);

  test.equal(true, /Thanks for your help/.test(result2));
  test.equal(false, /Custom Signature Line/.test(result2));
  test.equal(false, /Posted using MyCustomApp/.test(result2));
  
  test.done();
}

exports.test_addSignatureRegexes_multiple_patterns = function(test) {
  var emailContent = `Hello,

Here is my message.

Thanks,
TeamName

Have a great day!
Posted using CompanyApp`;

  var parser = new EmailReplyParser();

  parser.addSignatureRegexes([
    /^Thanks,?$/mi,
    /^Have a great day!?$/mi,
    /^Posted using CompanyApp$/
  ]);
  
  var result = parser.parseReply(emailContent);

  test.equal(true, /Here is my message/.test(result));
  test.equal(false, /Thanks/.test(result));
  test.equal(false, /Have a great day/.test(result));
  test.equal(false, /Posted using CompanyApp/.test(result));
  
  test.done();
}

exports.test_method_chaining_with_custom_regexes = function(test) {
  var emailContent = `My reply here

CompanyBot Signature

Forwarded by Bot on Jan 28, 2026

> Previous message`;

  var result = new EmailReplyParser()
    .addQuoteHeaderRegexes([/^Forwarded by Bot on .+$/m])
    .addSignatureRegexes([/^CompanyBot Signature$/])
    .parseReply(emailContent);

  test.equal(true, /My reply here/.test(result));
  test.equal(false, /CompanyBot Signature/.test(result));
  test.equal(false, /Forwarded by Bot/.test(result));
  test.equal(false, /Previous message/.test(result));
  
  test.done();
}

exports.test_resetQuoteHeaderRegexes_to_defaults = function(test) {
  var emailContent = `My message

Custom Header Pattern

> Quoted text`;

  var parser = new EmailReplyParser();

  // Add custom pattern
  parser.addQuoteHeaderRegexes([/^Custom Header Pattern$/m]);
  
  var result1 = parser.parseReply(emailContent);

  test.equal(false, /Custom Header Pattern/.test(result1));
  
  // Reset to defaults
  parser.resetQuoteHeaderRegexes();
  
  var result2 = parser.parseReply(emailContent);

  // Custom pattern should now be visible again
  test.equal(true, /Custom Header Pattern/.test(result2));
  
  test.done();
}

exports.test_resetSignatureRegexes_to_defaults = function(test) {
  var emailContent = `My message

Custom Signature

Best regards`;

  var parser = new EmailReplyParser();

  // Add custom pattern
  parser.addSignatureRegexes([/^Custom Signature$/]);
  
  var result1 = parser.parseReply(emailContent);

  test.equal(false, /Custom Signature/.test(result1));
  
  // Reset to defaults
  parser.resetSignatureRegexes();
  
  var result2 = parser.parseReply(emailContent);

  // Custom pattern should now be visible, but "Best regards" should still be hidden by default
  test.equal(true, /Custom Signature/.test(result2));
  test.equal(false, /Best regards/.test(result2));
  
  test.done();
}

exports.test_custom_regexes_work_with_default_patterns = function(test) {
  var emailContent = `My reply here

Custom App Signature

Sent from my iPhone

On Jan 28, 2026, at 10:00 AM, Support <support@example.com> wrote:

> Original message
> Some quoted content`;

  var parser = new EmailReplyParser();

  // Add custom signature pattern
  parser.addSignatureRegexes([/^Custom App Signature$/]);
  
  var result = parser.parseReply(emailContent);

  test.equal(true, /My reply here/.test(result));
  // Custom pattern should be removed
  test.equal(false, /Custom App Signature/.test(result));
  // Default signature pattern should still work
  test.equal(false, /Sent from my iPhone/.test(result));
  // Default quote header pattern should still work
  test.equal(false, /On Jan 28, 2026/.test(result));
  test.equal(false, /Original message/.test(result));
  
  test.done();
}

exports.test_custom_regex_without_capture_group = function(test) {
  // Test that custom regexes without capture groups don't crash
  var emailContent = `My message

FORWARDED MESSAGE

> Quoted content`;

  var parser = new EmailReplyParser();

  // Add pattern without capture group
  parser.addQuoteHeaderRegexes([/^FORWARDED MESSAGE$/m]);
  
  var result = parser.parseReply(emailContent);

  test.equal(true, /My message/.test(result));
  test.equal(false, /FORWARDED MESSAGE/.test(result));
  test.equal(false, /Quoted content/.test(result));
  
  test.done();
}

exports.test_case_insensitive_custom_signature = function(test) {
  var emailContent = `Hello,

My response here.

thanKS,
John`;

  var parser = new EmailReplyParser();

  parser.addSignatureRegexes([/^thanks,?$/mi]);
  
  var result = parser.parseReply(emailContent);

  test.equal(true, /My response here/.test(result));
  test.equal(false, /thanKS/.test(result));
  
  test.done();
}

exports.test_complex_custom_quote_header_pattern = function(test) {
  var emailContent = `My reply here

[FORWARDED MESSAGE FROM user@example.com]

> Previous content
> More quoted text`;

  var parser = new EmailReplyParser();

  // Add pattern with square brackets and uppercase
  parser.addQuoteHeaderRegexes([/^\[FORWARDED MESSAGE FROM .+\]$/m]);
  
  var result = parser.parseReply(emailContent);

  test.equal(true, /My reply here/.test(result));
  test.equal(false, /FORWARDED MESSAGE/.test(result));
  test.equal(false, /Previous content/.test(result));
  test.equal(false, /More quoted text/.test(result));
  
  test.done();
}
