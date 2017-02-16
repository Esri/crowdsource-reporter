module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
      "$": false,
      "require": false,
      "define": false,
      "dojo": false // app should be refactored, use of global dojo is deprecated
    },
    "rules": {
        "comma-dangle": [ "error", "never" ],
        "eqeqeq": [ "error", "always" ],
        "indent": [ "error", 2 ],
        "no-console": [ "error", { "allow": [ "warn", "error" ] }],
        "no-unused-vars": [ "error", { "args": "none" } ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ]
    }
};
