import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translations, resolveKey, interpolate } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useLocalStorage('sa-f1-lang', 'ka');

  const value = useMemo(() => {
    const dict = translations[lang] || translations.ka;
    const t = (key, vars) => {
      const raw = resolveKey(dict, key);
      if (raw === undefined) return key;
      return interpolate(raw, vars);
    };
    return {
      lang,
      toggleLang: () => setLang((prev) => (prev === 'ka' ? 'en' : 'ka')),
      t,
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
