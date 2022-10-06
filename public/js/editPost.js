
const editPostButtonHref = document.querySelector('#editPostButton').href
const url = editPostButtonHref.replace('/posts','/api/posts')
const saveButton = document.getElementById("saveEdit");

async function init(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const editPostTextArea = document.querySelector('#edit-post-content');
        editPostTextArea.textContent = data.content;

        const editPostTitleInput = document.querySelector('#edit-post-title');
        editPostTitleInput.value = data.title.trim()
    })
}

async function saveEdit(){
  
    const title = document.querySelector('#edit-post-title').value.trim()
    const content = document.querySelector('#edit-post-content').value.trim();

    const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        if(res.ok){
            document.location.reload();
        }
}

if(editPostButtonHref){
    init();
   saveButton.addEventListener('click', saveEdit)
}


