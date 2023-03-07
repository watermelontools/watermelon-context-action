const axios = require("axios");
export default async function getSlack() {
  let textToWrite = "";
  await axios
    .post("http://app.watermelontools.com/api/slack/searchMessagesByText", {
      user: "estebandalelr@gmail.com",
      text: "action github",
    })
    .then((response) => {
      textToWrite += "**Slack Treads**";
      for (
        let index = 0;
        index < response.data.messages.matches.length;
        index++
      ) {
        const element = response.data.messages.matches[index];
        textToWrite += `\n[#${element.channel.name} - ${element.username}\n ${
          element.text.length > 100
            ? element.text.substring(0, 100) + "..."
            : element.text
        }](${element.permalink})`;
        textToWrite += `\n--------------\n`;
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
