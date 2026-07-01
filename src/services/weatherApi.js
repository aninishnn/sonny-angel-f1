import axios from 'axios';

const WEATHER_CODES = {
  0: { en: 'Clear sky', ka: 'მოწმენდილი ცა', icon: '☀️' },
  1: { en: 'Mostly clear', ka: 'ნაწილობრივ მზიანი', icon: '🌤️' },
  2: { en: 'Partly cloudy', ka: 'ნაწილობრივ ღრუბლიანი', icon: '⛅' },
  3: { en: 'Overcast', ka: 'მოღრუბლული', icon: '☁️' },
  45: { en: 'Fog', ka: 'ნისლი', icon: '🌫️' },
  48: { en: 'Freezing fog', ka: 'გაყინული ნისლი', icon: '🌫️' },
  51: { en: 'Light drizzle', ka: 'მსუბუქი წვიმა', icon: '🌦️' },
  53: { en: 'Drizzle', ka: 'წვიმა', icon: '🌦️' },
  55: { en: 'Dense drizzle', ka: 'ხშირი წვიმა', icon: '🌧️' },
  61: { en: 'Light rain', ka: 'მსუბუქი წვიმა', icon: '🌧️' },
  63: { en: 'Rain', ka: 'წვიმა', icon: '🌧️' },
  65: { en: 'Heavy rain', ka: 'ძლიერი წვიმა', icon: '🌧️' },
  71: { en: 'Light snow', ka: 'მსუბუქი თოვლი', icon: '🌨️' },
  73: { en: 'Snow', ka: 'თოვლი', icon: '🌨️' },
  75: { en: 'Heavy snow', ka: 'ძლიერი თოვლი', icon: '❄️' },
  80: { en: 'Rain showers', ka: 'ხანმოკლე წვიმა', icon: '🌦️' },
  81: { en: 'Showers', ka: 'წვიმის გადავლა', icon: '🌧️' },
  82: { en: 'Violent showers', ka: 'ძლიერი წვიმის გადავლა', icon: '⛈️' },
  95: { en: 'Thunderstorm', ka: 'ჭექა-ქუხილი', icon: '⛈️' },
};

const FALLBACK_WEATHER = {
  temperature: 24,
  description: { en: 'Sunny / Dry', ka: 'მზიანი / მშრალი' },
  icon: '☀️',
  isLive: false,
};

export async function fetchWeatherForCircuit({ lat, lon }) {
  try {
    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: { latitude: lat, longitude: lon, current_weather: true },
      timeout: 6000,
    });
    const current = data?.current_weather;
    if (!current) throw new Error('No current_weather in response');

    const code = WEATHER_CODES[current.weathercode] || { en: 'Conditions unknown', ka: 'უცნობია', icon: '🌡️' };
    return {
      temperature: Math.round(current.temperature),
      description: { en: code.en, ka: code.ka },
      icon: code.icon,
      isLive: true,
    };
  } catch (err) {
    console.warn('[weatherApi] falling back to mock weather:', err.message);
    return FALLBACK_WEATHER;
  }
}
