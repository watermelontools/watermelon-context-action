const core = require("@actions/core");
const github = require("@actions/github");

const axios = require("axios");
export default async function getContext() {
  let textToWrite = "";
  await axios
    .post("http://app.watermelontools.com/api/actions/getContext", {
      user: github.context.payload.pull_request.user.login,
      repo: github.context.payload.repository.name,
      owner: github.context.payload.repository.owner.login,
      commitList: "264ef7c1455b51f1cb65d4457aeaa700478c91f4",
    })
    .then((response) => {
      console.log("api", response.data);
      textToWrite += "### GitHub PRs";
      for (let index = 0; index < response.data.items.length; index++) {
        const element = response.data.items[index];
        textToWrite += `\n - [#${element.number} - ${element.title}](${element.html_url})`;
        textToWrite += `\n`;
        // shortcircuit to three results
        if (index === 2) {
          textToWrite += `and ${response.data.items.length - 3} more`;
          break;
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  await axios
    .get(github.context.payload.pull_request.commits.href)
    .then((response) => {
      console.log("commits", response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  return true;
}
