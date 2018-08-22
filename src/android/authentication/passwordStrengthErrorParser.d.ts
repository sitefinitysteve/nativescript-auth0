export declare class PasswordStrengthErrorParser {
    private static readonly RULE_TYPE_LENGTH_AT_LEAST;
    private static readonly RULE_TYPE_CONTAINS_AT_LEAST;
    private static readonly RULE_TYPE_SHOULD_CONTAIN;
    private static readonly RULE_TYPE_IDENTICAL_CHARS;
    private static readonly KEY_RULES;
    private static readonly KEY_CODE;
    private static readonly KEY_VERIFIED;
    private static readonly KEY_FORMAT;
    private static readonly KEY_ITEMS;
    private static readonly KEY_MESSAGE;
    private description;
    constructor(descriptionMap: {
        [key: string]: any;
    });
    getDescription(): string;
    private parseRules;
    private asLengthAtLeast;
    private asContainsCharset;
    private asIdenticalChars;
}
