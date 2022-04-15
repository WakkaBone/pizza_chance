If there are too many bugs that need to be fixed on the release day - we might have to stay longer on their working place. In this case not to starve we probably will want to order pizza. This app calculates the chance of ordering pizza depending on the number of bugs and number of minutes until the end of shift. We calculate in like this: 100 / (remainingTime / numberOfBugs - normalTimeToFixABug)

Each raindrop appearing on the random place of the screen represents a single bug. Its size and color can be customized in config.js. We can also change the end of shift, max amount of bugs and normal time to fix a bug there.

The number of bugs is fetched from the random number api.

App is written on **React** with **Styled-Components** library used for styling.
