# Remotion Microfrontends

An experiment, to investigate the feasibility of loading remotion compositions over a URL.

## Background

There are two projects, [my-chassis](./my-chassis/) and [my-video](./my-video/).

[my-chassis](/my-chassis/) is the root project, which loads compositions defined in [my-video](./my-video/)

## Note

- CORS may prevent assets of one project from being loaded in the browser when running the other project, so I use [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en-US), a chrome extension to disable CORS so I can keep experimenting.