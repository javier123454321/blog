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
    <h2 class="text-xl font-black py-4">Featured Posts:</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-around">
    {%- for post in collections.main reversed -%}
      {%- unless post.data.draft -%}
        {% render "partials/content-card.liquid", post: post %}
      {%- endunless -%}
    {%- endfor -%}
    </ul>
    <div class="text-center">
      <a href="/blog/" class="">
      <button class="mt-4 px-4 py-2
        border-4
      bg-white 
      border-black
        drop-shadow-hard
        hover:drop-shadow-hard-sm
        hover:translate-y-1
        hover:translate-x-1       
        transition-all">
        All Posts
        </button>
      </a>
    </div>
  </div>