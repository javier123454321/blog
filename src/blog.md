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
      {%- for post in collections.all reversed -%}
        {%- unless post.data.draft -%}
          {% render "partials/content-card.liquid", post: post, show_tags: true %}
        {%- endunless -%}
      {%- endfor -%}
    </ul>
  </div>

