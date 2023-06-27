    
    document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#github-form').addEventListener('submit', searchUser);

    function searchUser(event) {
        event.preventDefault();
        let search = document.getElementById('search').value;
        let link = `https://api.github.com/search/users?q=${search}`;
        fetch(link)
            .then(response => response.json())               
            .then(data => {
                const users = document.querySelector('#user-list');
                users.innerHTML = '';

                data.items.forEach(user => {
                    const usersName = document.createElement('h2');
                    const usersAvatar = document.createElement('img');
                    const usersLink = document.createElement('a');

                    usersName.textContent = user.login;
                    usersName.id = 'username';
                    usersAvatar.src = user.avatar_url;
                    usersLink.href = user.html_url;
                    usersLink.textContent = 'View Profile';

                    const userContainer = document.createElement('li');
                    userContainer.appendChild(usersName);
                    userContainer.appendChild(usersAvatar);
                    userContainer.appendChild(usersLink);

                    users.appendChild(userContainer);
                });
            });

        document.getElementById('user-list').addEventListener('click', findRepos)

        function findRepos() {

            fetch(`https://api.github.com/users/${search}/repos`)
                .then(response => response.json())
                .then(data => {
                    const reposList = document.querySelector('#repos-list');

                    data.forEach(repo => {
                        const reposName = document.createElement('h2');
                        const reposLink = document.createElement('a');

                        reposName.textContent = repo.name;
                        reposLink.href = repo.html_url;
                        reposLink.textContent = 'View Repo';

                        const reposContainer = document.createElement('li');
                        reposContainer.appendChild(reposName);
                        reposContainer.appendChild(reposLink);
                        reposList.appendChild(reposContainer);
                    })

                })

        }

    }
});