# Agent Working Rules

## OpenClaw Submodule

- The directory `openclaw/` is an upstream git submodule used for schema extraction and reference only.
- Allowed actions in `openclaw/`: search and read only.
- Not allowed in `openclaw/`: editing files, creating files, deleting files, formatting, installing dependencies, running migrations, or any other write/modify action.
- All implementation changes for this project must be made outside `openclaw/` unless the user explicitly asks otherwise.
