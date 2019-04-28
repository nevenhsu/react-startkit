import _ from 'lodash'
import badwordsLib from 'constants/badwords'

const badwordsFilter = {

    scan: function (text, callback) {
        var word, key, match;
        var regex = /\w+/g

        while (match = regex.exec(text)) {
            word = match[0];
            key = word.toLowerCase();

            if (_.indexOf(badwordsLib.en, key) != -1) {
                if (callback(word, match.index, key) === false) {
                    break;
                }
            }
        }
    },

    profane: function (text) {
        var profane = false;

        this.scan(text, function (word, index, categories) {
            profane = true;
            return false; // Stop on first match
        });

        return profane;
    },

    clean: function (text) {

        /* filter English Badwords */
        this.scan(text, function (word, index, categories) {
            text = text.substr(0, index) +
                word.replace(/\S/g, '*') +
                text.substr(index + word.length);
        });

        /* filter Chinese Badwords */
        for (var badword of badwordsLib.cn) {
            if (text.indexOf(badword) != -1) {
                var tmpWord = ""
                for (var i = 0; i < badword.length; i++) {
                    tmpWord += '*'
                }
                text = text.replace(badword, tmpWord)
            }
        }

        return text;
    }
};

export default badwordsFilter;
