const axios = require("axios");
export default async function getGithub() {
  let textToWrite = "";
  await axios
    .post("http://app.watermelontools.com/api/github/getIssuesByCommits", {
      user: "estebandalelr@gmail.com",
      repo: "watermelon",
      owner: "watermelontools",
      commitList: "264ef7c1455b51f1cb65d4457aeaa700478c91f4",
    })
    .then((response) => {
      textToWrite += "**GitHub PRs**";
      for (let index = 0; index < response.data.items.length; index++) {
        const element = response.data.items[index];
        textToWrite += `\n[#${element.number} - ${element.title}](${element.html_url})`;
        textToWrite += `--------------\n`;
        // shortcircuit to three results
        if (index === 2) {
          textToWrite += `and ${
            response.data.messages.matches.length - 3
          } more`;
          break;
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  return textToWrite;
}
