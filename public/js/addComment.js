async function commentFormHandler(event) {
    event.preventDefault();

    let comment_text = document.querySelector('#comment-text-area')

       //Remove white spaces
        comment_text = comment_text.value.trim();
      
    //To get the post id through the 
      const post_id = window.location.href.split('/')[4]

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            const container = document.querySelector('#comment-container');
            const div = document.createElement('div');
            div.innerHTML = `<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show container col-6" role="alert">
			<svg class="bi flex-shrink-0 me-2 mr-2" width="20" height="20" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
			post not found
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		   </div>`
          

           container.prepend(div)
        }
    }
};

const commentForm = document.querySelector('#comment-form')

commentForm.addEventListener('submit', commentFormHandler);