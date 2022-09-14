---
eleventyExcludeFromCollections: true
layout: 'layouts/home.html'
title: 'Home'
meta:
  desc:
    'Just the thoughts of a person, seldom updated'
---

  <div class="w-screen bg-gray-800 py-12">
    <h1 class="text-3xl font-bold leading-tight text-white text-right {{width}}">
      Musings by Javier Gonzalez
    </h1>
  </div>
  <div class="py-8 leading-8 {{ width }}">
    <h2 class="text-xl font-black">Featured Posts:</h2>
    <ul>
    {%- for post in collections.main -%}
    <a href="{{ post.filePathStem }}/">
      <li class="px-4 py-4 my-4 bg-slate-100 hover:bg-sky-200 transition-colors rounded-lg">
        <div class="flex justify-between ">
          {{ post.data.title }}
          <span x-data="{ date: '{{ post.date }}' }" x-text="() => new Date(date).toLocaleDateString()"></span>
        </div>
      </li>
    </a>
    {%- endfor -%}
    </ul>
  </div>