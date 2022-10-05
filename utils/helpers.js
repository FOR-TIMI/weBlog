var register = function(Handlebars) {
    var helpers = {
    compare: function(vala, valb) {
        return vala === valb ?
        `<section class="card-body d-flex justify-content-end">
        <a href="/campgrounds/62a82173dbcde1a5ebbffe30/edit " class="card-link btn btn-info mr-3">Edit</a>
        <form class="d-inline" action="/campgrounds/62a82173dbcde1a5ebbffe30?_method=DELETE" method="POST">
        <button class="btn btn-danger">Delete</button>
        </form>
        </section>` 
        : ''
    },

};

if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else {
    return helpers;
}

}

module.exports.register = register;
module.exports.helpers = register(null); 
