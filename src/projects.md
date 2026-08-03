---
eleventyExcludeFromCollections: true
layout: 'layouts/home.html'
title: 'Projects'
meta:
  desc:
    'Projects by Javier'
---
  {% render "partials/heading.html", title: "Projects", width: "{{width}}" %}
  <div class="py-8 leading-8 {{ width }}">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-around">
    {%- for project in collections.projects reversed -%}
      {%- unless project.data.draft -%}
        {% render "partials/project-card.liquid", project: project, index: forloop.index, show_tags: true %}
      {%- endunless -%}
    {%- endfor -%}
    </ul>
  </div>