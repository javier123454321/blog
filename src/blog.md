---
eleventyExcludeFromCollections: true
layout: 'layouts/home.html'
title: 'Blog'
meta:
  desc:
    'All Posts By Javier'
intro:
  title: 'All Musings'
---
  {% render "partials/heading.html", title: "All Posts", width: "{{width}}" %}
  <div class="{{ width }}">
    <ul class="grid grid-cols-1 gap-8 justify-around">
      {%- for post in collections.all -%}
        {% render "partials/content-card.html", post: post, details:true %}
      {%- endfor -%}
    </ul>
  </div>

