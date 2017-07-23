function parse(str, scope, maxTry = 10) {
    if (/\$\{([^}]*)}/.test(str)) {
        console.error('DO NOT USE ${}', str);
    }
    var temp = str;

    while (maxTry && /#\{([^}]*)}/.test(temp)) {
        temp = temp.replace(/#\{([^}]*)}/g, (match, $1) => {
            var value = scope[$1];
            if (value !== undefined) {
                return value;
            }
            return match;
        });
        maxTry--;
    }
    return temp;
}

module.exports = {
    parse
};
