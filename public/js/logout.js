async function logoutButtonHandler() {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        const container = document.querySelector('#login-container');
        const div = document.createElement('div');
        div.innerHTML = `<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show container col-6" role="alert">
        <svg class="bi flex-shrink-0 me-2 mr-2" width="20" height="20" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        You're already logged out
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`
      

       container.prepend(div)
    }
};

const logoutButton = document.querySelector('#logout')
logoutButton.addEventListener('click', logoutButtonHandler);