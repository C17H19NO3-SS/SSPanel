# sspanel

To install bun:

```bash
curl -fSsl https://bun.sh/install | bash
```

To install dependencies:

For linux or macos:
```bash
bun install
```

For windows:

```bat
powershell -c "irm bun.sh/install.ps1 | iex"
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.1.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### This project does not support nodejs because require and import are used in the same file.
