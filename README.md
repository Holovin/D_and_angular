# Todo list demo app


## Installing Node.js and Bower Packages
- Open terminal
- Type `npm install` (it _must_ install bower packages too)

## Running
1. Build project with `gulp do -D` or `gulp do -P` (d means **d**evelopment and p means **p**roduction)
2. Start local server with `gulp web`
3. Open http://localhost:8001/

## Gulp commands
| Command        | Action | Require params (see below) |
| :-------       | :--- | :--- |
| all            | Build and run (do + web); Aliases: ez | YES
| clean          | Clean build path | NO
| copy-data      | Copy data (.json) files to build folder | NO
| copy-fonts     | Copy bower fonts to build folder | YES
| do             | Build project | YES
| help           | Display help | NO
| scripts-app    | Concat and minify app js files | YES
| scripts-inject | Inject js and css files into main app.html file | NO
| scripts-vendor | Concat and minify vendor js files | YES
| styles-app     | Concat and minify app css files | YES
| styles-vendor  | Concat and minify vendor css files | YES
| web            | Run local server with app | NO


### Gulp params
| Param | Action |
| :--- | :--- |
| -P | Set production environment |
| -D | Set development environment |
| -env=ENV | Set ENV environment |

> Production flag enable minification for js and css files.