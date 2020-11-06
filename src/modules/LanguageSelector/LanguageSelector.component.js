import React from 'react';
import { useTranslation } from 'react-i18next';

import './LanguageSelector.css';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation('LanguageSelector');

  const changeLanguage = (event) => i18n.changeLanguage(event.target.value);

  return (
    <select className="LanguageSelector" onChange={changeLanguage}>
      <option value="en">{t('[option] english')}</option>
      <option value="nl">{t('[option] dutch')}</option>
    </select>
  )
}

export default LanguageSelector;
