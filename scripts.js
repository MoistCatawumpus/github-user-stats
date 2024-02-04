async function getUserStats() {
    const username = document.getElementById("searchInput").value;
    const userStatsContainer = document.getElementById("userStats");

    if (username.trim() === "") {
        alert("Please enter a valid GitHub username.");
        userStatsContainer.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        if (response.status === 200) {
            displayUserStats(userData);
            userStatsContainer.classList.remove("hidden");
        } else {
            alert(`Error: ${userData.message}`);
            userStatsContainer.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again later.");
        userStatsContainer.classList.add("hidden");
    }
}

function displayUserStats(userData) {
    const userStatsContainer = document.getElementById("userStats");
    userStatsContainer.innerHTML = `
        <h2>${userData.login}</h2>
        <img src="${userData.avatar_url}" alt="Profile Image">
        <p><strong>Followers:</strong> <code>${userData.followers}</code></p>
        <p><strong>Following:</strong> <code>${userData.following}</code></p>
        <p><strong>Public Repositories:</strong> <code>${userData.public_repos}</code></p>
        <p><strong>Joined GitHub on:</strong> <code>${new Date(userData.created_at).toLocaleDateString()}</code></p>
        <p><strong>Location:</strong> <code>${userData.location || "Not specified"}</code></p>
        <p><strong>Email:</strong> <code>${userData.email || "Not specified"}</code></p>
        <p><strong>Company:</strong> <code>${userData.company || "Not specified"}</code></p>
        <p><strong>Blog:</strong> ${userData.blog ? `<a href="${userData.blog}" target="_blank">${userData.blog}</a>` : "Not specified"}</p>
        <p><strong>Repos:</strong> ${userData.public_repos > 0 ? `<code>${userData.public_repos}</code>` : "No public repositories"}</p>
        <p><strong>Gists:</strong> ${userData.public_gists > 0 ? `<code>${userData.public_gists}</code>` : "No public gists"}</p>
    `;
}

function searchOnEnter(event) {
    if (event.key === "Enter") {
        getUserStats();
    }
}
