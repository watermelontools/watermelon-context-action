const core = require("@actions/core");
const github = require("@actions/github");

const axios = require("axios");
export default async function getContext() {
  let textToWrite = "";
  console.log("url ", github.context.payload.pull_request._links.commits.href);
  let commitList = [];
  await axios
    .get(github.context.payload.pull_request._links.commits.href)
    .then((response) => {
      for (let index = 0; index < response.data.length; index++) {
        commitList.push(response.data[index].sha);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  console.log({
    user: github.context.payload.pull_request.user.login,
    repo: github.context.payload.repository.name,
    owner: github.context.payload.repository.owner.login,
    commitList: encodeURIComponent(commitList.toString()),
  });
  console.log(commitList);

  await axios
    .post("http://app.watermelontools.com/api/actions/getContext", {
      user: github.context.payload.pull_request.user.login,
      repo: github.context.payload.repository.name,
      owner: github.context.payload.repository.owner.login,
      commitList: encodeURIComponent(commitList.toString()),
    })
    .then((response) => {
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

  return textToWrite;
}
