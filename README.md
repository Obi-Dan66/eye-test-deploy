# React + Vite Eye-test App

This project is inspired by https://visionscreening.zeiss.com/en-INT

The goal is to make similar Eye - testing app, in Czech Republic.

### You can check live here: https://obi-dan66.github.io/eye-test-deploy/

This project is made by "npm create vite@latest --template react".
You can also see high use of "case" for carousel like appearance.
The build and deployment process is made by github workflow action,
described in deploy.yml.

The project is currently deployed to github pages, however it is still in works.

### Parts of project currently in development:

Set responsiveness rules.

Adding shade sizing.

Add a conditional case to the instructions when the slider for shade is not moved.

Add animation to the last case in the instructions (sharp, contrast tests).

Add a page and click through to the result page on the map.

Add button on result case that will lead to next test if there is any left.

Add button on result case that will lead to test selection.

Add hook -> if the user has already seen the general instructions than display only the abbreviated instructions for relevant test.

Add a page that will store and display the results of all tests so far done.

Add a cross that returns to the main page.

Add an info icon that will have contact, faq and legal documents

### Next steps:

Add user administration for adding users in Google Map. This step also include adding payments solution,
since the membership in map will have a small fee. Also includes setting up automation with Google Map.

Initial info:

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
