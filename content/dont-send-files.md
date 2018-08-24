---
title: "Don't Send Files"
date: 2018-07-20T10:27:00+02:00
draft: true
---

You send out the file with the texts to be translated. In the meantime, you develop new features, so you generate a new version of the translation file with more texts. But the old one is already being translated, and not in your power... Who merges the two files, when, and how?

Someone sends you the code over e-mail. You make a Git repo out of it, because you should. You do some changes to better fit your needs. After some time, you ask about something and are sent a _new version_, of course over e-mail again, with many unexpected changes which conflict with your changes in several ways, technically and concept-wise. Ouch.

How to solve this? Well, don't send files over, please. The Web to can help you establish a [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for collaborating. If it's about code, a reference Git repo is the obvious solution. For anything else, just find the right online tool.
