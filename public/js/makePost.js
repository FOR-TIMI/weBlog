
const addPostBtn = document.getElementById('addPost')

async function makePost(){

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    //To get userid through the link
    const user_id = parseInt(document.getElementById('user-id').href.split('/')[3])


    if(title.length, content.length, user_id){
        //POST request -  /api/post
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
                user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            document.location.replace('/dashboard');
        }
    }
    
  return;

}

addPostBtn.addEventListener('click', makePost)