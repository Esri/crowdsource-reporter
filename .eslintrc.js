module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "comma-dangle": [ "error", "never" ],
        "eqeqeq": [ "error", "always" ],
        "indent": [ "error", 2 ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ]
    }
};
