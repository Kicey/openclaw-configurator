# OpenClaw Configurator

OpenClaw Configurator is a web-based visual configuration builder for OpenClaw.

The goal is to make OpenClaw setup easier for beginners and faster for advanced users by replacing manual JSON5 editing with a guided UI, validation feedback, and import/export workflows.

This project is inspired by the interaction model of Ghostty Config:
- Ghostty Config repository: https://github.com/zerebos/ghostty-config
- Ghostty Config live app: https://ghostty.zerebos.com/

OpenClaw references:
- OpenClaw repository: https://github.com/openclaw/openclaw
- OpenClaw docs: https://docs.openclaw.ai/

## Why This Project

OpenClaw configuration is powerful and extensive. The config format supports many top-level sections (channels, agents, tools, gateway, hooks, plugins, and more), and OpenClaw validates config strictly.

A visual configurator should help users:
- Start with working defaults quickly.
- Understand what each setting does.
- Avoid invalid combinations before saving.
- Generate clean JSON5 that OpenClaw accepts.

## Scope (Initial)

The first milestone focuses on a browser UI that can:
- Load an existing OpenClaw config.
- Edit common settings through forms.
- Validate values and show errors before export.
- Export valid JSON5 ready for ~/.openclaw/openclaw.json.

Planned first-class sections for MVP:
- Identity and agent defaults
- Core channels (WhatsApp, Telegram, Discord, Slack)
- Messaging behavior (prefixes, queue, mention gating)
- Tool policies (profile, allow/deny, elevated)
- Gateway basics (bind, port, auth mode)

## Design Direction

From Ghostty Config, we borrow the product direction, not code:
- Category-based settings navigation
- Fast form interactions with instant feedback
- Import/export as a core flow
- Simple static deployment model

For OpenClaw specifics, we align with docs and schema behavior:
- JSON5 output format
- Strict schema compatibility
- Clear handling for required pairings (for example dmPolicy=open with allowFrom=["*"])

## Proposed Tech Stack

- Svelte + TypeScript + Vite
- Bun (preferred) or npm/pnpm for local development
- JSON5 parser/serializer
- Schema validation layer for OpenClaw config correctness

## Project Status

Status: Planning

Current deliverables in this repository:
- Project README
- Implementation planning documents under docs/implementation/

## Notes

- This project is independent and community-driven.
- It is not an official OpenClaw product unless adopted by the OpenClaw maintainers.
