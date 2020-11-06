import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { mergeDeepRight } from 'ramda'

import { translations as Greeting } from '../../modules/Greeting'
import { translations as LanguageSelector } from '../../modules/LanguageSelector'

const resources = mergeDeepRight(
  LanguageSelector,
  Greeting,
)

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: process.env.REACT_APP_LANGUAGE || 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
