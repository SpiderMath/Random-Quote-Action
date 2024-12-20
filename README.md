# Random Programming Quote Action

Puts a random programming quote to your README! It is a fun little project built by myself to satisfy the desire to have a randomly selected programming quote being put into my profile README. Feel free to use it for your own profile readmes! <br>

## ⚙ Usage

Put this in your README (the `...` stand for preceding and subsequent readme content, please ignore that)

```md
...
<!--PROGRAMMING-QUOTE-BOT:start-->

<!--PROGRAMMING-QUOTE-BOT:end-->
...
```

**Do not place any content between these 2 comments as they WILL be removed by the GitHub action** <br>

After adding these comments, make a new [`yml`](https://www.freecodecamp.org/news/what-is-yaml-the-yml-file-format/) file in `.github/workflows` under your root directory. It can have any name that<br>

For the sake of this example, let's just name it `random_programming_quote_action.yml`<br>

Next, please put the following code in that file.

```yml
name: Random Programming Quote

on:
  schedule:
    - cron: '*/30 * * * *'
  workflow_dispatch:

jobs:
  putRandomQuote:
    runs-on: ubuntu-latest
    name: Put a random random programming quote in README

    steps:
      - uses: actions/checkout@v2
      - name: Setup Node Environment
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      - name: Update the README
        uses: SpiderMath/Random-Quote-Action@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          QUOTE_FONT_SIZE: 6
          COMMIT_MESSAGE: 'Updated the README with a new Programming Quote 💻 '
          ITALICS: true
          BLOCKQUOTES: true
```

## 🛠️ Parameters

| Parameter | Type | Description | Default |
| :-: | :-: | - | :-: |
| `QUOTE_FONT_SIZE` | Integer | Size of the font, in the form of [`h`](https://www.w3schools.com/tags/tag_hn.asp) tags. `h6` is the smallest. So if you want LARGE text, you will want to you `1` or `2`. If you want a normalish size font, use `5` or `6` | `3` |
| `COMMIT_MESSAGE` | String |  The message that will be shown on the commit which updates the README | `Updated the README with a new Programming Quote 💻` |
| `ITALICS` | Boolean | Whether you want the quote to be italicized | `true` |
| `BLOCKQUOTES` | Boolean | Whether you want the quote to be in a blockquote | `true` |

> ℹ Also, you can change the `cron` parameter to change the duration till which you want to update the readme, this updates the readme every 30 minutes


And that's pretty much it for the configurations! Just run the action, and you'll see a random quote being shipped in every 30 minutes or the timeout you've set! Hope it proved useful, enjoy! 😁