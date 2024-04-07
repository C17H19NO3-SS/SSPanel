# SSPanel

To install bun for linux or macos:

```bash
curl -fSsl https://bun.sh/install | bash
```

For windows:

```bat
powershell -c "irm bun.sh/install.ps1 | iex"
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project does not support nodejs because require and import are used in the same file.

SSPanel is an api project, front-end writing is left to the preference of the person,~~you can find a sample front-end design on our github page~~.

- FileManagement added.
- ProcessManagement added.
- Extension system added.
- Theme system added.
- i18n language system added.
- ~~Maked default theme.~~
