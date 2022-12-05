---
eleventyExcludeFromCollections: true
layout: 'layouts/home.html'
title: 'Home'
meta:
  desc:
    'Just the thoughts of a person, seldom updated'
---
  {% render "partials/heading.html", title: "Musings By <br> Javier Gonzalez", width: "{{width}}" %}
  <div class="py-8 leading-8 {{ width }}">
    <h2 class="text-xl font-black">Featured Posts:</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-around">
    {%- for post in collections.main -%}
      {% render "partials/content-card.html", post: post %}
    {%- endfor -%}
    </ul>
  </div>