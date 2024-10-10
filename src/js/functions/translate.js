import {TRANSLATE_KEY} from "../_vars";

class Translate {
  constructor(dataType = "translate") {
    this.data = {};
    this.dataType = dataType;
    this.lang = localStorage.getItem(TRANSLATE_KEY);
  }

  #getFile (lang, nameSpace = 'translation') {
    return new Promise(async (res, rej) => {
      try {
        const result = await fetch(`./locales/${lang}/${nameSpace}.json`);
        if(result.ok) {
          const json = await result.json();
          res(json);
        }else {
          res({})
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  async init () {
    const elemsList = document.querySelectorAll(`[data-${this.dataType}]`);
    const nameSpace = location.pathname.split(".")[0].slice(1);

    if(!this.lang) {
      localStorage.setItem(TRANSLATE_KEY, "ru");
      this.lang = "ru";
    }

    if(!(this.data?.main && this.data?.main[this.lang]) && !(this.data?.page && this.data?.page[this.lang])) {
      const mainTranslation = await this.#getFile(this.lang);
      const pageTranslation = await this.#getFile(this.lang, nameSpace);
      this.data.main = { ...this.data.main, [this.lang]: mainTranslation }
      this.data.page = { ...this.data.page, [this.lang]: pageTranslation }
    }

    this.renderData(elemsList);
  }

  renderData (elemsList) {
    const { data, lang } = this;
    let _data = { ...data.main[lang], ...data.page[lang] }
    if(elemsList.length) {
      elemsList.forEach(item => {
        const key = item.dataset[this.dataType];
        if(key in _data) {
          item.textContent = _data[key];
        }else {
          item.textContent = key;
          console.warn(`can not find key ${key}`)
        }
      })
    }
  }

  changeLang (lang) {
    const LangList = ['ru', 'en', 'uz'];

    if(typeof lang === "string" && LangList.includes(lang)) {
      localStorage.setItem(TRANSLATE_KEY, lang);
      this.lang = lang;
      this.init();
    }
  }
}

export default new Translate();
