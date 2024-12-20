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
      - uses: actions/checkout@v4
      - name: Setup Node Environment
        uses: actions/setup-node@v4
        with:
          node-version: '14'
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

## 🫂 Contributing

Feel free to add some feature requests, new quotes or suggest some bug-fixes! I may not be available instantly, as I'm a student, but I'll definitely look into it after I return from any hiatuses!

### Project Structure

The project is basically a simple GitHub Action, which uses the [`actions/checkout`](https://github.com/actions/checkout) and [`actions/setup-node`](https://github.com/actions/setup-node) to setup the node environment. The list of quotes is present in the [`Data/Quotes.json`](./Data/Quotes.json), and our source code is present at [`Source/Actions.js`](./Source/Actions.js).<br>

After we've finished our script however, we need to compile it into a single file. We do so and save it in the [`dist`](./dist/) folder using the following command, facilated by the [`ncc`](https://npmjs.com/package/ncc) package.

```sh
npx ncc build ./Source/Actions.js -o Dist
```

To avoid having to keep rewriting this command again and again, I've added the `build` script to the [`package.json`](./package.json), and you can invoke the same via the following:

```sh
npm run build
```

> As of v1.2.0, we are using [`@vercel/ncc`](https://npmjs.com/package/@vercel/ncc) instead of [`@zeit/ncc`](https://npmjs.com/package/@zeit/ncc) due to the deprecation of the latter.

## Signing off
And that's pretty much it! Just run the action, and you'll see a random quote being shipped in every 30 minutes or the timeout you've set! Hope it proved useful, enjoy! 😁