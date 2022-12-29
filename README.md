# Remotion Microfrontends

An experiment, to investigate the feasibility of loading remotion compositions over a URL.

## Background

There are two projects, [my-chassis](./my-chassis/) and [my-video](./my-video/).

[my-chassis](/my-chassis/) is the root project, which loads compositions defined in [my-video](./my-video/)

## Note

- CORS may prevent assets of one project from being loaded in the browser when running the other project, so I use [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en-US), a chrome extension to disable CORS so I can keep experimenting.
- Remotion keeps complaining about there being multiple versions of itself running, even though I have set it up as a shared module in webpack's module-federation. I have gotten around this by setting `window.remotion_imported = false`, and this can be discussed later.
- Crucial components for allowing use of `useCurrentFrame()` and `useVideoConfig()` in remote compositions are not exposed in remotion's core, and [a forked branch has been created for this](https://github.com/remotion-dev/remotion/compare/main...mykeels:remotion:load-composition-over-url?expand=1#diff-9a4ceebe7c6f86856371906c3f061d3b56b7457022b05179884a113e7ced67e8).
- Remotion components such as `Sequence`, `Series`, `Freeze` and more, have not been tested, but can be in further investigations if this works.

## Goals

A microfrontend component should:

1. Continue to work as expected with hooks such as:
    - `useVideoConfig()`
    - `useCurrentFrame()`

2. Use remotion's `delayRender` and `continueRender` when loading
