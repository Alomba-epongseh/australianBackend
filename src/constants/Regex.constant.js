export const RegexConstant = {
    SPECIAL_CHARACTERS_EXCEPT_PERIOD:
        /[`~!@#$%^&*()_|+\-=?;:'",<>{}[\]\\/\s]/gi,
    PHONE_NUMBER: RegExp(/^(6|2)(2|3|[5-9])[0-9]{7}$/),
    EMAIL: RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    TEXT: RegExp(/^((\w{2,})+\s?)*$/),
    ADDRESS: RegExp(/^((\w{2,})+\s?)*$/),
    PASSWORD: RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    USERNAME: RegExp(/^[a-zA-Z]{3,}$/i),
};
