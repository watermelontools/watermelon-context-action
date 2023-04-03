const core = require("@actions/core");
const github = require("@actions/github");

const axios = require("axios");
export default async function getContext() {
  let textToWrite = "";
  let commitList = [];
  await axios
    .get(github.context.payload.pull_request._links.commits.href)
    .then((response) => {
      for (let index = 0; index < response?.data?.length; index++) {
        commitList.push(response.data[index].commit.message);
      }
    })
    .catch((error) => {
      console.error(error.message);
    });

  await axios
    .post("http://app.watermelontools.com/api/actions/getContext", {
      user: github.context.payload.pull_request.user.login,
      repo: github.context.payload.repository.name,
      owner: github.context.payload.repository.owner.login,
      commitList: commitList.toString(),
      title: github.context.payload.pull_request.title,
      body: github.context.payload.pull_request.body,
      number: github.context.payload.pull_request.number,
    })
    .then((response) => {
      textToWrite += "### GitHub PRs";
      if (response?.data?.ghValue?.length) {
        for (let index = 0; index < response.data?.ghValue?.length; index++) {
          const element = response.data.ghValue[index];
          textToWrite += `\n - [#${element.number} - ${element.title}](${element.html_url})`;
          textToWrite += `\n`;
          // shortcircuit to three results
          if (index === 2) {
            textToWrite += `and ${response.data.ghValue.length - 3} more`;
            break;
          }
        }
      } else {
        textToWrite += `\n No results found :(`;
      }

      textToWrite += `\n`;

      textToWrite += "### Jira Tickets";
      if (response.data.jiraValue.error === "no jira token") {
        textToWrite += `\n [Click here to login to Jira](https://app.watermelontools.com)`;
      } else {
        if (response?.data?.jiraValue?.length) {
          for (let index = 0; index < response.data.jiraValue.length; index++) {
            const element = response.data.jiraValue[index];
            textToWrite += `\n - [${element.key} - ${element.fields.summary}](${element.serverInfo.baseUrl}/browse/${element.key})`;
            textToWrite += `\n`;
            // shortcircuit to three results
            if (index === 2) {
              textToWrite += `and ${response.data.jiraValue.length - 3} more`;
              break;
            }
          }
        } else {
          textToWrite += `\n No results found :(`;
        }
      }
      textToWrite += `\n`;

      textToWrite += "### Slack Threads";
      if (response.data.slackValue.error === "no slack token") {
        textToWrite += `\n [Click here to login to Slack](https://app.watermelontools.com)`;
      } else {
        if (response?.data?.slackValue?.messages?.matches?.length) {
          for (
            let index = 0;
            index < response.data.slackValue.messages.matches.length;
            index++
          ) {
            const element = response.data.slackValue.messages.matches[index];
            textToWrite += `\n - [#${element.channel.name} - ${
              element.username
            }\n ${
              element.text.length > 100
                ? element.text.substring(0, 100) + "..."
                : element.text
            }](${element.permalink})`;
            textToWrite += `\n`;
            // shortcircuit to three results
            if (index === 2) {
              textToWrite += `and ${
                response.data.slackValue.messages.matches.length - 3
              } more`;
              break;
            }
          }
        } else {
          textToWrite += `\n No results found :(`;
        }
      }
    })
    .catch((error) => {
      console.error(error.message);
    });

  return textToWrite;
}
