# spectral-ui

---

# Description

Spectral UI is a library of React components that are designed to be used with the Spectral design system. It provides a set of reusable components that can be easily integrated into your React applications, allowing you to build beautiful and consistent user interfaces.

---

# Filestructure

```bash
├── .github
│   └── workflows
```

---

# APIs used

- auth
  - creator
    - creatorSignup /creator/register
    - creatorLogin /creator/login
    - creatorResetPassword /creator/reset-password
    - creatorVerifyEmail /creator/verify-email
    - creatorVerifyPhone /creator/verify-phone
    - creatorProfile /creator/me
    - creatorLogout /creator/logout
  - editor
    - editorSignup /editor/register
    - editorLogin /editor/login
    - editorForgotPassword /editor/forgot-password
    - editorResetPassword /editor/reset-password
    - editorVerifyEmail /editor/verify-email
    - editorVerifyPhone /editor/verify-phone
    - editorProfile /editor/me
    - editorLogout /editor/logout
- home
  - creator
    - /creator/inbox (get)
  - editor
    - /editor/inbox (get)
- dashboard

  - creator

    - creatorDashboard
      - /creator/link-channel (post)
      - /creator/channels (get)
      - /creator/unlink-channel (delete)
      - /creator/channels/:channelId (get) + /creator/channels/:channelId/uploads (get) + /creator/channels/:channelId/map-editor/:editorId (get) + /creator/channels/:channelId (delete)
      - /creator/channels/:channelId/uploads/:uploadId (get)

  - editor
    - /editor/channels (get)
    - /editor/channels/:channelId (get)
    - /editor/channels/:channelId/uploads/:uploadId (get) + /editor/channels/:channelId/uploads/new (post)
    - /editor/channels/:channelId/uploads/:uploadId (delete)

- inbox
  - creator
    - /creator/inbox (get)
  - editor
    - /editor/inbox (get)
- requests
  - creator
    - /creator/requests (get)(manage) + /creator/requests/add (post) + /creator/requests/:requestId (delete)
  - editor
    - /editor/requests (get)(manage) + /editor/requests/add (post) + /editor/requests/:requestId (delete)
- editor


---

TODO

- use profile pic usage
- add forgot password
- 
