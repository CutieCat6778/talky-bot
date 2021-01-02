module.exports = function remove(text) {
    return text.slice(2, 3) == " " ? text.slice(2) : text.slice(1);
};