const register = function(Handlebars) {
    var helpers = {
    compare: function(ownerId, loggedInUserId,postId) {
        return ownerId === loggedInUserId ?
        `<section class="card-body d-flex justify-content-end">
        <a href="/posts/${postId}/edit " class="card-link btn btn-info mr-3" data-bs-toggle="modal" data-bs-target="#editPost" data-bs-whatever="@fat">Edit</a>
        <form class="d-inline" action="/dashboard/posts/${postId}?_method=DELETE" method="POST">
        <button class="btn btn-danger">Delete</button>
        </form>
        </section>` 
        : ''
    },

    renderComments:  function(comments,signedInUserId,createdAt){
        let html = ''

    if(comments.length){
            comments.forEach((c) =>{
                html = html +`<div class="col-md-6">
                <div class="card mb-3 mt-3 ">
                 <div class="card-body">
                 <h5 class="card-title">${c.user.username}</h5>
                    `
                if(c.user_id === signedInUserId){
                html += `<div class="d-flex justify-content-between"> 
                        <p class="card-text">${c.comment_text}</p>

                        <form class="d-inline" action="/comments/${c.id}?_method=DELETE" method="POST">
                          <button type="submit" class="btn btn-danger btn-sm">delete</button>
                        </form>
                        </div>
                        `  
                      
                }
                else{
                    html += `<p class="card-text mb-3">${c.comment_text}</p> `
                }
    
                html += ` </div><section class="card-footer text-muted">
                posted on ${createdAt}
                 </section>
                </div>
                 </div>`
            })
        }
   

        return html;
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
