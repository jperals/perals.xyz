---
title: "Colors of Twitter"
year: 2019
draft: false
excerpt: Generating language maps from Twitter data
link: https://jperals.github.io/colors-of-twitter/
tags: [Node.js, MongoDB, Twitter, maps, visualization]
image: img/map-20190209-1549668005938-323656points.png
---

Basically by combining Twitter feed data (90 million tweets and counting) with a language detector (together with some geometric post-processing, and lots of hours of coding), I was able to offer a quite detailed look at the language geography of the Twitter universe.

(Note: to compensate the dominance of English on Twitter, I manually limited the boundaries of this language in particular.)

I can generate GeoJSON output, which can be displayed as an interactive map:

<iframe src="https://jperals.github.io/colors-of-twitter/#embed" width="100%" height="450" frameborder="0"></iframe>

And also static PNG images, which can be useful to share highlights about specific regions, like these:

<div>
<img alt="Africa" class="enlarge" src="img/map-20190307-1551994567978-504409points.png"/>
</div>
<p class="img-comment">
__Africa__: Considering how Twitter users often choose the language with a biggest audience, I am happy about the language diversity that shows up in Africa, especially in the East, South, and the Gulf of Guinea.
</p>

<div>
<img class="enlarge" src="img/map-20190307-1551990717706-504084points.png"/>
</div>
<p class="img-comment">
__Catalan__: The Catalan language appears intermixed with Spanish in the way I would have more or less expected, with Catalan dominating in inner Catalonia and Spanish dominating in most coastal areas, as well as in most of the Valencian Country and the Balearic Islands.
</p>

<div>
<img alt="Europe" class="enlarge" src="img/map-20190307-1551993116891-504273points.png"/>
<div>
<p class="img-comment">
__Europe__: Most of the European language boundaries strongly follow state boundaries, with the notable exception of minoritarian languages like Basque, Catalan, Galician, Norwegian Nynorsk, Welsh... Belgium, roughly split in two halves, is also an interesting case.
</p>


<div class="columns two-columns fit">
<a><img alt="Languages of India including English" class="enlarge" src="img/map-20190209-1549671272755-350693points.png"></a>
<a><img alt="Languages of India excluding English" class="enlarge" src="img/map-20190209-1549669541369-323844points.png"></a>
</div>

<p class="img-comment">
__India__ including English (left) and without including English (right). A Twitter user [pointed out](https://twitter.com/kr__sunder/status/1089142503406587904) that Hindi is the preferred lingua franca in Northern India, and English in the South.
</p>

To know more about this project, see: https://jperals.github.com/colors-of-twitter