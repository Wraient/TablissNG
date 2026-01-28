# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

I also attempt to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## [1.6.1] - 1/15/2026 | New logos, better caching, a Trello widget, Bing wallpapers and more!

Finally changed the logo to something different from Tabliss's logo! This release includes a lot of community contributions, so thanks a ton to everyone who helped out!

### Added

- feat: implement favicon changing (#85). [44bc62ce](https://github.com/BookCatKid/TablissNG/commit/44bc62ce)
- feat: add bing daily wallpaper. [ce9dadb4](https://github.com/BookCatKid/TablissNG/commit/ce9dadb4)
- feat: add opentype font features parsing support. [2f34128d](https://github.com/BookCatKid/TablissNG/commit/2f34128d)
- Enable better offline support with workbox (#66). [b4c5f165](https://github.com/BookCatKid/TablissNG/commit/b4c5f165)
- feat(trello): added Trello integration (#73). [7e3c9b9](https://github.com/John-Ling/TablissNG/commit/7e3c9b9968dd6639a3f985e73f1d236b30c39916), [62e8b5f5](https://github.com/BookCatKid/TablissNG/commit/62e8b5f5)

### Fixed

- fix(Search): use correct search engine even on default. [a059570f](https://github.com/BookCatKid/TablissNG/commit/a059570f)
- fix: maybe fix extension dev builds on non-web. [d4589fef](https://github.com/BookCatKid/TablissNG/commit/d4589fef)

### Changed

- feat: small improvements to custom settings icons position. [57316369](https://github.com/BookCatKid/TablissNG/commit/57316369)
- feat: fix workbox on chrome (and safari). [49cfd0ec](https://github.com/BookCatKid/TablissNG/commit/49cfd0ec)
- feat(Prettier): fix glob pattern (#84). [2e809d72](https://github.com/BookCatKid/TablissNG/commit/2e809d72)
- feat: new logos!. [12bee649](https://github.com/BookCatKid/TablissNG/commit/12bee649), [0506376d](https://github.com/BookCatKid/TablissNG/commit/0506376d), [44432f2f](https://github.com/BookCatKid/TablissNG/commit/44432f2f)
- feat(Chromium): include key to preserve extension id on dev. [e2a19a81](https://github.com/BookCatKid/TablissNG/commit/e2a19a81)

### Chore / Cleanup

- Fix ESLint errors (#83). [92921bfc](https://github.com/BookCatKid/TablissNG/commit/92921bfc)
- chore: run prettier to fix tests. [ca41f40e](https://github.com/BookCatKid/TablissNG/commit/ca41f40e)
- Add Husky hooks (#68). [4c12b606](https://github.com/BookCatKid/TablissNG/commit/4c12b606)
- ci: add safari to releases. [e141c006](https://github.com/BookCatKid/TablissNG/commit/e141c006)
- ci: auto nightly releases. [35d782ba](https://github.com/BookCatKid/TablissNG/commit/35d782ba), [25f30991](https://github.com/BookCatKid/TablissNG/commit/25f30991)

## [1.6.0] - 1/1/2026 | Large Feature and Bugfix Update (FINALLY)

### Added

- feat(Persist): improve errors and remove on non-web builds. [98195e8](https://github.com/BookCatKid/TablissNG/commit/98195e8)
- feat(storage): add SAVE_BATCH_TIMEOUT to prevent storage errors. [b587897](https://github.com/BookCatKid/TablissNG/commit/b587897)
- feat(LiteratureClock): enhance quote fetching with SFW filter and a new endpoint for more quotes. [224b153](https://github.com/BookCatKid/TablissNG/commit/224b153)
- feat(bookmarks): add toggle to remember folder expansions. [f319b0a](https://github.com/BookCatKid/TablissNG/commit/f319b0a)
- feat: add italics and underline options to widget font settings. [40d615d](https://github.com/BookCatKid/TablissNG/commit/40d615d)
- feat: add perplexity search engine. [c504a5d](https://github.com/BookCatKid/TablissNG/commit/c504a5d)
- feat: beta safari support (simple). [b0d63a8](https://github.com/BookCatKid/TablissNG/commit/b0d63a8)
- feat(links): add keyboard shortcut input. [8a936582](https://github.com/BookCatKid/TablissNG/commit/8a936582d96df2945f0419393fb147b3010c579a)
- feat: state persistence when switching backgrounds. [840ad259](https://github.com/BookCatKid/TablissNG/commit/840ad259b732ff0566c4b0b05ff5e9e1a2ca8eca)

### Changed

- feat: change Unsplash "Tags" input to "Search Term". [8efe064](https://github.com/BookCatKid/TablissNG/commit/8efe064)
- feat: attempt at making custom positioning relative. [a28115b](https://github.com/BookCatKid/TablissNG/commit/a28115b)
- feat: change resize mode of textareas changed to vertical to avoid resizing them into unclickable areas. [8b72e14](https://github.com/BookCatKid/TablissNG/commit/8b72e14)
- chore: update dependencies and minor housekeeping. [0446686](https://github.com/BookCatKid/TablissNG/commit/0446686), [07abb38](https://github.com/BookCatKid/TablissNG/commit/07abb38)
- chore: Change timezone label "Europe/Kiev" to "Europe/Kyiv". [46c9b61](https://github.com/BookCatKid/TablissNG/commit/46c9b61)
- refactor(backgrounds): introduce a baseBackgorund so facilitate adding backgrounds. [9bb547f](https://github.com/BookCatKid/TablissNG/commit/9bb547f)
- feat: clean up settings, remove ads. [7201357](https://github.com/BookCatKid/TablissNG/commit/7201357)
- feat: use browser default sans-serif font. [a331ad0](https://github.com/BookCatKid/TablissNG/commit/a331ad036ec0ad8cb27dc80f6e0f11c6b2771632)
- fix(Jokes): retry API call for long jokes. [8ff8a93](https://github.com/BookCatKid/TablissNG/commit/8ff8a933822b5f715785762eb2390f60a6a34e7f)

### Fixed

- fix(Import): set display.scale to true by default. [116df62](https://github.com/BookCatKid/TablissNG/commit/116df62a21c3eb83d8756c2d657ce01fa0a680b3)
