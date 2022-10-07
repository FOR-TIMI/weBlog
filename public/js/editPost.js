
//Handle save edit event
async function saveEdit(){
    //To get new data
    const title = document.querySelector('#edit-post-title').value.trim()
    const content = document.querySelector('#edit-post-content').value.trim();

    //To set URL 
    const url = location.href.replace('/posts', '/api/posts')

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


//To set initial text Content of the edit form
function init(){
   
    //Get current inner text of the title
    const oldPostTitle = document.getElementById('post-details-title')
                     .innerText
                     .trim();

    const oldPostContent = document.getElementById('post-details-content')
                                .innerText
                                .trim();
   


    //set inner Text of modal to the old text
    //Text area for modal
    const newPostTextArea = document.querySelector('#edit-post-content');
          newPostTextArea.textContent = oldPostContent
        
    //Set inner text of Input
    // input for modal
    const editPostTitleInput = document.querySelector('#edit-post-title');
          editPostTitleInput.value = oldPostTitle;

    
    const saveButton = document.querySelector('.saveEdit');

    
    //add event listener to the save button
    saveButton.addEventListener('click', saveEdit)


}

init();

