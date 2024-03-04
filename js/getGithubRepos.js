document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.github.com/users/igorcoraine/repos') //github api
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('my_repos'); //portifolio div on html
            data.forEach(repo => {
                const listItem = document.createElement('li');
                const repoLink = document.createElement('a'); // Anchor tag for the whole box
                repoLink.href = repo.html_url;
                repoLink.target = '_blank'; // Open link in a new tab

                const repoName = document.createElement('h3');
                const repoDescription = document.createElement('p');
                const repoLanguages = document.createElement('p');
                const ghIcon = document.createElement('icon');

                repoName.textContent = repo.name;
                repoDescription.textContent = repo.description;
                ghIcon.classList.add('fa');
                ghIcon.classList.add('fa-github');

                // Fetch detailed repository information to get languages
                fetch(repo.languages_url)
                    .then(response => response.json())
                    .then(languagesData => {
                        const languages = Object.keys(languagesData);
                        repoLanguages.textContent = `Languages: ${languages.join(', ')}`;
                    })
                    .catch(error => console.error('Error fetching languages:', error));

                // Append content to the anchor tag
                repoLink.appendChild(repoName);
                repoLink.appendChild(repoDescription);
                repoLink.appendChild(repoLanguages);
                repoLink.appendChild(ghIcon);

                // Append the anchor tag to the list item
                listItem.appendChild(repoLink);

                // Append the list item to the repository list
                repoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
});
