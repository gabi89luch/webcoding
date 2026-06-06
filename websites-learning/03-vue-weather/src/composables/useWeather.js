import { ref, computed } from "vue";

const CITIES = [
  { name: "Dublin",    lat: 53.3498, lon: -6.2603 },
  { name: "London",    lat: 51.5074, lon: -0.1278 },
  { name: "New York",  lat: 40.7128, lon: -74.0060 },
  { name: "Tokyo",     lat: 35.6762, lon: 139.6503 },
  { name: "Sydney",    lat: -33.8688, lon: 151.2093 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 }
];

const WMO = {
  0:  { label: "Clear",          icon: "☀" },
  1:  { label: "Mainly clear",   icon: "🌤" },
  2:  { label: "Partly cloudy",  icon: "⛅" },
  3:  { label: "Overcast",       icon: "☁" },
  45: { label: "Fog",            icon: "🌫" },
  48: { label: "Rime fog",       icon: "🌫" },
  51: { label: "Light drizzle",  icon: "🌦" },
  53: { label: "Drizzle",        icon: "🌦" },
  55: { label: "Heavy drizzle",  icon: "🌧" },
  61: { label: "Light rain",     icon: "🌦" },
  63: { label: "Rain",           icon: "🌧" },
  65: { label: "Heavy rain",     icon: "🌧" },
  71: { label: "Light snow",     icon: "🌨" },
  73: { label: "Snow",           icon: "❄" },
  75: { label: "Heavy snow",     icon: "❄" },
  80: { label: "Showers",        icon: "🌦" },
  81: { label: "Heavy showers",  icon: "🌧" },
  82: { label: "Violent showers",icon: "⛈" },
  95: { label: "Thunderstorm",   icon: "⛈" },
  96: { label: "Hail storm",     icon: "⛈" },
  99: { label: "Severe storm",   icon: "⛈" }
};

export function describe(code) {
  return WMO[code] || { label: "Unknown", icon: "❓" };
}

export function useWeather() {
  const cities = ref(CITIES);
  const activeIndex = ref(0);
  const data = ref(null);
  const loading = ref(false);
  const error = ref("");

  const activeCity = computed(() => cities.value[activeIndex.value]);

  async function fetchCity(city) {
    loading.value = true;
    error.value = "";
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      error.value = "Couldn't load weather. Check your connection.";
    } finally {
      loading.value = false;
    }
  }

  function selectCity(index) {
    activeIndex.value = index;
    fetchCity(cities.value[index]);
  }

  return { cities, activeIndex, activeCity, data, loading, error, selectCity, fetchCity };
}
