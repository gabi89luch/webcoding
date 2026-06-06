<script setup>
import { onMounted, computed } from "vue";
import { useWeather, describe } from "./composables/useWeather.js";

const { cities, activeIndex, activeCity, data, loading, error, selectCity, fetchCity } = useWeather();

onMounted(() => fetchCity(cities.value[0]));

const current = computed(() => data.value?.current);
const daily = computed(() => data.value?.daily);
</script>

<template>
  <main class="app">
    <header>
      <h1>Vue Weather</h1>
      <p class="lead">A reactive weather dashboard using Vue 3's Composition API and the Open-Meteo API.</p>
    </header>

    <nav class="cities">
      <button
        v-for="(city, i) in cities"
        :key="city.name"
        :class="{ active: i === activeIndex }"
        @click="selectCity(i)"
      >
        {{ city.name }}
      </button>
    </nav>

    <section v-if="loading" class="card loading">
      <p>Loading weather for {{ activeCity.name }}…</p>
    </section>

    <section v-else-if="error" class="card error">
      <p>{{ error }}</p>
      <button @click="fetchCity(activeCity)">Retry</button>
    </section>

    <section v-else-if="current" class="card current">
      <div class="now">
        <div class="icon">{{ describe(current.weather_code).icon }}</div>
        <div>
          <h2>{{ activeCity.name }}</h2>
          <p class="desc">{{ describe(current.weather_code).label }}</p>
        </div>
        <div class="temp">{{ Math.round(current.temperature_2m) }}°</div>
      </div>
      <dl class="stats">
        <div><dt>Feels like</dt><dd>{{ Math.round(current.apparent_temperature) }}°C</dd></div>
        <div><dt>Humidity</dt><dd>{{ current.relative_humidity_2m }}%</dd></div>
        <div><dt>Wind</dt><dd>{{ current.wind_speed_10m }} km/h</dd></div>
      </dl>
    </section>

    <section v-if="daily" class="forecast">
      <h3>Next {{ daily.time.length - 1 }} days</h3>
      <ul>
        <li v-for="(t, i) in daily.time.slice(1)" :key="t">
          <span class="day">{{ new Date(t).toLocaleDateString(undefined, { weekday: "short" }) }}</span>
          <span class="ic">{{ describe(daily.weather_code[i + 1]).icon }}</span>
          <span class="hi">{{ Math.round(daily.temperature_2m_max[i + 1]) }}°</span>
          <span class="lo">{{ Math.round(daily.temperature_2m_min[i + 1]) }}°</span>
        </li>
      </ul>
    </section>

    <footer>
      <p>Data from <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · no API key required.</p>
    </footer>
  </main>
</template>
