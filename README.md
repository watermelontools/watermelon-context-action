# Watermelon Context GitHub Action

> DEPRECATION WARNING
> We now use the [Watermelon Context App](https://github.com/apps/watermelon-context), please install that.
> This action will have no further development

[Install now](https://github.com/apps/watermelon-context)

[![Report an issue](https://img.shields.io/badge/-Report%20an%20issue-critical)](https://github.com/watermelontools/watermelon-context-action/issues/new)

[![GitHub Repo stars](https://img.shields.io/github/stars/watermelontools/watermelon-context-action?style=flat-square)](https://github.com/watermelontools/watermelon-context-action/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/WatermelonTools?style=flat-square)](https://twitter.com/intent/follow?screen_name=WatermelonTools)
[![Discord](https://img.shields.io/discord/933846506438541492?style=flat-square)](https://discord.com/invite/H4AE6b9442)

Watermelon is your **AI-Powered** Code Review Toolbox. We improve the code review process by providing business logic context to GitHub PRs. 

Our GitHub Action indexes the most relevant PR, Jira ticket, and Slack message thread for a new PR. This way, we help you make the code review process faster and in a more informed way.

## Installation

[Install now](https://github.com/apps/watermelon-context)

Create a "watermelon.yml" file in ".github/workflows/". Then, copy and paste the following snippet into your .yml file

```
name: watermelon-context
on: [pull_request]

jobs:
  getcontext:
    runs-on: ubuntu-latest
    name: Get code context with Watermelon
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Watermelon-context-action
        uses: watermelontools/watermelon-context-action@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

or copy and paste the following snippet into your .yml file

`- name: Watermelon-context-action
  uses: watermelontools/watermelon-context-action@v1.0`

After this, you can [start by logging in](https://app.watermelontools.com). You will be asked to give us read access to your GitHub organization, and optionally, to your Jira and Slack teams.

## Features

You can find the roadmap for this product [here](https://github.com/orgs/watermelontools/projects/2/views/1).

### Create a Pull Request to Create Context

The first feature for our alpha version is bringing the most relevant pieces of information from GitHub, Jira, and Slack for a new PR.

Soon, we will generate a GPT-powered summary of this indexed context.

## Contributing

Check out [Contributing.md](CONTRIBUTING.md) and be aware of the [Code of Conduct](CODE_OF_CONDUCT.md)!

We're an early stage project, therefore we still have the luxury to coordinate via short chats with our contributors. If you're interested in contributing, please join our [Discord](https://discord.com/invite/H4AE6b9442) community.
Alternatively, comment on our issues if you plan to solve one.

## Analytics

We are in the process of integrating [VS Code's telemetry library](https://github.com/microsoft/vscode-extension-telemetry). We're in the process of evaluating this alternative since we have a [VS Code extension](https://github.com/watermelontools/watermelon-extension) that complements this GitHub Action.

## Supporters

[![Stargazers repo roster for @watermelontools/watermelon-context-action](https://reporoster.com/stars/watermelontools/watermelon-context-action)](https://github.com/watermelontools/watermelon-context-action/stargazers)

[![Forkers repo roster for @watermelontools/watermelon-context-action](https://reporoster.com/forks/watermelontools/watermelon-context-action)](https://github.com/watermelontools/watermelon-context-action/network/members)

#### About Watermelon

Watermelon is built by a globally distributed team of developers devoted to making software development easier. Join our [Discord](https://discord.com/invite/H4AE6b9442) community, follow us on [Twitter](https://twitter.com/WatermelonTools) and go to the [Watermelon blog](https://watermelon.tools/blog/blog) to get the best programming tips.

### License

- [Apache License](license.md)
