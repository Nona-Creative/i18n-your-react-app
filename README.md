Translating your React App
===

Making your application multilingual can be quite the undertaking. Especially when you didn't plan for it upfront and need to retrofit.
However with a little bit of effort it’s very easy to make your application language proof. Even if you end up not using more than one language at the very least you’ll have a neat separation between the logic of your app and your copy.

Let's go through a basic implementation of internationalization in React.

## Prerequisites
We will be using the following tools:
- Create React App
- i18next
- react-i18next
- ramda

The app is organized using a modular approach. (For more information on modularizing your application check out this article https://medium.com/@alexmngn/why-react-developers-should-modularize-their-applications-d26d381854c1).

Check out the full source code here:

## Adding a translation to your module
We have modularized our app so it only makes sense we also modularize our translations and keep them in our modules. This means adding a translation in each module and not a global translation file.

Let's look at the greeting component:
```
import React from 'react'
import { useTranslation } from 'react-i18next'

import './Greeting.css';

const Greeting = () => {
  const { t } = useTranslation('Greeting')
  
  return <h1 className="greeting">{t('[header] greeting')}</h1>
}

export default Greeting
```

### useTranslation hook
`react-i18next` conveniently provides us with a `useTranslation` hook. In this example you'll notice, when calling the hook I feed it `Greeting`. This is our namespace. It's not required to use namespaces but I like to namespace my translations with my module name.

### t function
All thats left now is to use the hook's `t` function, feed it a translation key and that's it. Your component is now ready to accept translated text.

The `t` function is quite powerful and can handle string interpolation, plurals, defaults, etc. For more information on this check: https://www.i18next.com/translation-function/essentials.

### Translation keys
It's a good idea to provide some context with your translations. Especially if you're not the one translating your own app. The way you want to provide this context can be cause for a bit of a discussion but key is (absolutely pun intended) that it becomes clear where and how your translation is being used. This will prevent awkward and incorrect translations.

Looking at our key here it looks as follows: 
```
[header] greeting
```

I've decided to keep the context within square brackets, followed by a name for my translation.
It shows that this translation will be a greeting and used in a header.

## The translation file
The translation files are kept in a `locales` folder in which I like to keep my translations grouped by language code and in json files. It looks something like this:

```
{
  "[header] greeting": "Hi from the UK"
}
```

## Combining translations
To complete the module's namespace we need to combine our translation files and prepare it in a format that can be read by `i18next`. This is done in the `*.intl.js` files. 
An example:

```
import en from './locales/en.json'
import nl from './locales/nl.json'

const translations = {
  en: {
    Greeting: en,
  },
  nl: {
    Greeting: nl,
  },
}

export default translations
```

First the language files we created are imported by language code. Then we create a translations object where we use language codes as keys for each language you want to support. Each language contains the namespace we mentioned earlier with the imported language files.


## Exporting 
The last step we need to do to complete the translation of your module is exporting it. This happens in the index file:

```
import Component from './Greeting.component'
import translations from './Greeting.intl'


export default Component
export { translations }
```

Almost time to celebrate! We have a wonderfully structured, translatable module. Now it's time for our application to put it to work.

## Adding i18n to your app
To be able to use our module's translations we need to tell our app to use internationalization. Since this is a common responsibility `i18n` is initialized in `common/intl`.

Since initializing `i18n` is done in a common location that encompasses the entire app, this is the perfect place to start collecting the translations:

```
import { translations as Greeting } from '../../modules/Greeting'
import { translations as LanguageSelector } from '../../modules/LanguageSelector'
```

Next we group all namespaces per language. To do this I've used `Ramda` to make my life a bit easier:

```
const resources = mergeDeepRight(
  LanguageSelector,
  Greeting,
)
```

If you don't use `Ramda` , the end result should look something like this:
```
{
  "en":{
    "LanguageSelector": {
      "[option] english": "English",
      "[option] dutch": "Dutch"
    },
    "Greeting": {
      "[header] greeting": "Hi from the UK"
    }
  },
  "nl": {
    "LanguageSelector": {
      "[option] english": "Engels",
      "[option] dutch": "Nederlands"
    },
    "Greeting": {
      "[header] greeting": "Hoi uit Nederland"
    }
  }
}
```

Now we do the actual initialization in its most basic form using our combined resources:

```
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: process.env.REACT_APP_LANGUAGE || 'en',
    interpolation: {
      escapeValue: false,
    },
  })
```

## One last step
Now that we've got it all hooked up, the last thing we need to do is tell our app to actually use all our hard work. Thankfully this is very easy. Just import `./common/intl` into your main `index.js` file and that should do it. That should then end up looking something like this:

```
import React from 'react'
import ReactDOM from 'react-dom'

import './common/intl'
import './index.css'
import App from './modules/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
```

## Success, impumelelo, sukses, keberhasilan, éxito
Awesome, we now have a translated app, that's easy to maintain, easy to collaborate without losing modularity.

And, with all your copy and components neatly separated, how nice would it be if your backlog will never contain tickets like “Change button copy from X to Y” ever again? An article on using remote translations will come to a screen near you soon.

Thank you for reading, if you like this article please open up a PR against our example repo [[]] and add a translation for your native language!