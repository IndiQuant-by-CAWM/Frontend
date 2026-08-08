# CLAUDE.md — Frontend

> Source of truth: Notion → System Architecture → Core Platform → **frontend**.
> See the root `CLAUDE.md` for the platform-wide architecture and guardrails.

## 1. Purpose and Strategic Role

`Frontend` is the **user-facing presentation layer** of the IndiQuant platform. It
gives participants and administrators a clear, constrained interface. It does not own
data, enforce rules, or perform computations — it **renders authoritative state**
supplied by `Backend` and guides users through permitted actions.

Answers: *"How do humans interact with the system without violating its rules or
assumptions?"*

**The frontend must never become a second source of truth.** It reflects system
state; it does not define it.

## 2. Scope and Responsibilities

- Presenting available tournaments and their status
- Allowing authenticated users to download datasets
- Allowing authenticated users to upload submissions
- Displaying submission status and validation outcomes
- Displaying leaderboards and reputation summaries
- Providing administrative interfaces for authorized users

**Must not**: compute scores, infer eligibility, or expose internal logic.

## 3. User Types and Views

1. **Participants** — view tournaments, download datasets, upload submissions, view
   personal submission history, view public leaderboards
2. **Administrators** — configure tournaments, manage dataset visibility, view system
   status summaries

The frontend relies **entirely** on backend authorization responses to determine what
to display — it never makes its own authorization decisions (root `CLAUDE.md` §3:
`FORECASTER`/`ADMIN` are distinct permission sets).

## 4. Authentication Integration

Integrates with `Auth` **indirectly via `Backend`**: initiates login flows, stores and
presents tokens securely, attaches tokens to backend API requests, handles expiry and
logout. **Never stores credentials or secrets directly.**

## 5. Tournament Discovery and Status

Displays name/description, dataset reference, submission window status, horizon
information, current phase — **all read-only** from the frontend's perspective.

## 6. Dataset Access Flow

1. List datasets available to the user
2. Display dataset metadata (version, time range)
3. Provide a download mechanism via backend-controlled links

Must not: cache datasets, modify dataset content, or reveal obfuscation mappings.
Dataset access events are recorded by backend systems, not the frontend.

## 7. Submission Upload Flow

Select a file, attach required metadata (tournament, dataset version), upload to
backend, display upload success/failure, display validation results once available.
Must not pre-validate submissions beyond basic file presence/size checks — real
validation is `Submission-Validator`'s job.

## 8. Submission Status and Feedback

Displays received / validated / rejected (with reasons) / scored — all status values
sourced from backend state. **Must not infer or guess status transitions.**

## 9. Leaderboards and Results Display

Ranked lists, score values, relative positioning. Treats leaderboard data as
**immutable once published** — must not recalculate or filter scores beyond
presentation-level sorting.

## 10. Reputation and History Views

Displays reputation metrics and historical participation summaries as provided by
backend. Must not compute reputation locally or merge data from multiple sources
independently.

## 11. Administrative Interfaces

Tournament configuration forms, dataset visibility toggles, submission window
controls — all executed via backend APIs and confirmed explicitly. No bulk or
implicit actions.

## 12. Error Handling and Messaging

Backend errors displayed clearly but minimally; no internal stack traces or system
details; user-facing messages must not reveal sensitive logic. Must not suppress or
reinterpret backend errors.

## 13. Determinism and State Management

Backend state is authoritative; local UI state is ephemeral. **Refreshing the page
must not change system state.**

## 14. Security Considerations

No secret storage, no privileged logic, protection against common client-side
vulnerabilities, strict reliance on backend authorization. Assume all client-side
state is untrusted.

## 15. Performance Considerations

Avoid unnecessary polling, respect backend rate limits, paginate large result sets.
Performance optimizations must not compromise correctness.

## 16. Explicit Non-Goals

Must never: perform scoring or validation, execute trades, expose internal
identifiers, infer/predict system outcomes, or act as a data processing layer.

## 17. Why This Repository Is Separate

Clear separation between UI and logic, easier iteration on UX, reduced security risk,
independent scaling of presentation vs. computation.

## 18. Engineering Notes for Claude Code

- TypeScript/React per root `CLAUDE.md` §5 — keep this the only frontend surface;
  don't introduce a second UI stack without a documented reason in `Docs/`.
- Treat every value on screen as derived from a `Backend` response — if a feature
  needs the frontend to compute, infer, or cache anything beyond display formatting,
  stop and flag it (§16).
- No obfuscation-mapping, real-identifier, or credential handling ever touches this
  codebase (§6, §14) — that data must not reach the client at all.
- There is no code path where a `FORECASTER` sees personalized allocation advice or a
  return guarantee, per root `CLAUDE.md` §2 guardrail #3.
