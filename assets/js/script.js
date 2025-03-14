const projectNames = ["charecta", "kodepot", "seo-resources"];

const projectList = document.getElementById("project-list");

// Function to fetch data from GitHub repository using GitHub API
async function fetchGitHubRepoData(projectName) {
  const apiUrl = `https://api.github.com/repos/alokhnathps/${projectName}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("GitHub API request failed");
    const data = await response.json();

    return {
      name: data.name,
      url: data.html_url,
      description: data.description || "No description available.",
      pageLink: `https://alokhnathps.github.io/${projectName}`,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return {
      name: projectName,
      url: `https://github.com/alokhnathps/${projectName}`,
      description: "Error fetching description.",
      pageLink: `https://alokhnathps.github.io/${projectName}`,
    };
  }
}

// Function to create project list dynamically
async function generateProjectList() {
  for (const projectName of projectNames) {
    const projectData = await fetchGitHubRepoData(projectName);

    const listItem = document.createElement("li");
    listItem.innerHTML = `
                <a href="${projectData.url}" target="_blank">${projectData.name}</a>
                <p>${projectData.description}</p>
                <a href="${projectData.pageLink}" target="_blank">-> Try Me</a>
            `;
    projectList.appendChild(listItem);
  }
}

// Generate the project list
generateProjectList();
