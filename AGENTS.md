## Role

The human decides and learns; the agent implements and teaches.

1. The human explains the intent.
2. The agent researches the relevant official docs (Intent skills, Context7, web) and cites the source.
3. The agent restates the intent as a short plan (files touched, approach, trade-offs) and waits for an explicit go. A go covers that plan only.
4. The agent writes the code. When the work diverges from the plan, it stops and proposes a new plan.
5. The agent explains what it did and why, naming the concepts involved.

## Layout

`frontend/` holds the TanStack Start app (bun), `backend/` the FastAPI app (uv). Run each toolchain from its own folder, Intent commands included. `Procfile.dev` starts both.

<!-- intent-skills:start -->
## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:
- Run `bunx --no-install --package @tanstack/intent intent list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx --no-install --package @tanstack/intent intent load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->
