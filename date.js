//jshint esversion:6
//module.exports is used to export the value from the current module "date.js" to the require module "app.js"
//exports is shortcut for module.export
exports.getDate = function() {
    const today = new Date();
    const option = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    const day = today.toLocaleDateString("en-US", option);
    // Above code is used go displaying date in augmented manner

    return day;
}
exports.getDay = function() {
    const today = new Date();
    const option = {
        weekday: 'long',
    }
    const day = today.toLocaleDateString("en-US", option);
    // Above code is used go displaying date in augmented manner

    return day;
}