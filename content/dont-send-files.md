---
title: "Don't Send Files"
date: 2018-07-20T10:27:00+02:00
draft: false
---

## Don't send files: The Single Source of Truth principle

You send out the file with the texts to be translated. In the meantime, you develop new features, so you generate a new version of the translation file with more texts. But the old one is already being translated, and not in your power... What do you do?

Someone sends you the code over e-mail. You make a Git repo out of it. You do some changes to better fit your needs. After some time, you ask about something and are sent a _new version_, which conflicts with your changes.

How to solve this? You don't send files. You better use the Web to have a Single Source of Truth. If it's code, a reference Git repo is the obvious solution. For anything else, just find the right online tool.

