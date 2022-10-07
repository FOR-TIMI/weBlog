async function registerHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#registerUsername').value.trim();
    const password = document.querySelector('#registerPassword').value.trim();
    const email = document.querySelector('#registerEmail').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const container = document.querySelector('#register-container');
            const div = document.createElement('div');
            div.innerHTML = `<div class="alert alert-danger d-flex align-items-center alert-dismissible fade show container col-6" role="alert">
			<svg class="bi flex-shrink-0 me-2 mr-2" width="20" height="20" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
			That username already exists
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		   </div>`
          

           container.prepend(div)
        }
    }
};
const signUpForm = document.querySelector('#register-form')

signUpForm.addEventListener('submit', registerHandler);