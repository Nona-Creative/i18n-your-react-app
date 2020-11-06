import React from 'react'
import { useTranslation } from 'react-i18next'

import './Greeting.css';

const Greeting = () => {
  const { t } = useTranslation('Greeting')
  
  return <h1 className="greeting">{t('[header] greeting')}</h1>
}

export default Greeting
