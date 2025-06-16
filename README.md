<<<<<<< HEAD
# Installation

Use NPM <br>
`npm install better-console-s`

# Usage

```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",
});

console.log(output);
```

# Colors

You can set `textColor` (text color), `borderColor` (border color), `backgroundColor` (background color), `color` (general color). <br>
When you enter a color, you can enter either the color hex or the color name.
A list of all colors can be found in the Styles tab.

```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  color: "red",
});

console.log(output);
```

or

```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  textColor: "red",
  borderColor: "blue",
});

console.log(output);
```

# Borders

You can set the border via `borderStyle` (instead of the frame name you can enter null, then the border will not be displayed). <br>
A list of all frames can be found in the Styles tab.

```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",
});

console.log(output);
```

# Spacing

You can set the spacing using: `margin`, `padding` or `marginTop`, `marginBottom`, `marginLeft`, `marginRight`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`.

```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  margin: 2,
  padding: 1,
});

console.log(output);
```

or

```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  marginTop: 2,
  paddingBottom: 1,

  paddingTop: 3,
  paddingLeft: 1,
  ...
});

console.log(output);
```

# Styles

**Configuration Options:**

- borderStyle
- color
- backgroundColor
- textColor
- borderColor
- margin
- padding
- marginTop
- marginBottom
- marginLeft
- marginRight
- paddingTop
- paddingBottom
- paddingLeft
- paddingRight
- newLine

**Borders:**

- null
- single
- double
- bold
- extraBold
- block
- rounded
- doubleRounded
- ascii
- dashed
- plus
- minus
- dotted
- doubleDotted
- star
- arrow
- braces
- wave
- unicodeBox
- curved
- roundedDots
- diamond
- slashes
- hashes
- minimal
- brackets
- doubleWithDots
- waveDouble
- binary
- flowers

**Colors:**

- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- orange
- purple
- pink
- lime
- teal
- navy
- maroon
- olive
- silver
- gold
- crimson
- darkorange
- ...

and all hex colors.
=======
# Installation
Use NPM <br>
`npm install better-console-s`

# Usage
```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",
});

console.log(output);
```

# Colors
You can set  `textColor` (text color), `borderColor` (border color), `backgroundColor` (background color), `color` (general color). <br>
When you enter a color, you can enter either the color hex or the color name.
A list of all colors can be found in the Styles tab.
```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  color: "red",
});

console.log(output);
```
or
```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  textColor: "red",
  borderColor: "blue",
});

console.log(output);
```

# Borders
You can set the border via `borderStyle` (instead of the frame name you can enter null, then the border will not be displayed). <br>
A list of all frames can be found in the Styles tab.
```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",
});

console.log(output);
```

# Spacing
You can set the spacing using:  `margin`, `padding` or `marginTop`, `marginBottom`, `marginLeft`, `marginRight`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`.
```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  margin: 2,
  padding: 1,
});

console.log(output);
```
or
```
const betterConsole = require("better-console-s");

const output = betterConsole("test 123", {
  borderStyle: "single",

  marginTop: 2,
  paddingBottom: 1,

  paddingTop: 3,
  paddingLeft: 1,
  ...
});

console.log(output);
```

# Styles

**Configuration Options:**
- borderStyle
- color
- backgroundColor
- textColor
- borderColor
- margin
- padding
- marginTop
- marginBottom
- marginLeft
- marginRight
- paddingTop
- paddingBottom
- paddingLeft
- paddingRight
- newLine

**Borders:**
- null
- single
- double
- bold
- extraBold
- block
- rounded
- doubleRounded
- ascii
- dashed
- plus
- minus
- dotted
- doubleDotted
- star
- arrow
- braces
- wave
- unicodeBox
- curved
- roundedDots
- diamond
- slashes
- hashes
- minimal
- brackets
- doubleWithDots
- waveDouble
- binary
- flowers

**Colors:**
- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- orange
- purple
- pink
- lime
- teal
- navy
- maroon
- olive
- silver
- gold
- crimson
- darkorange
- ...

and all hex colors.
>>>>>>> db3cee4ab9ea75f437e482efea440652d6f43b7a
