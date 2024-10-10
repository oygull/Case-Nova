import {
  RENDER_SUB_KEY,
  RENDER_SUB_KEY_FIRST_END,
  RENDER_SUB_KEY_START, RENDER_SUB_SYMBOL,
  REPLACE_TEXT_TEMPLATE_END,
  REPLACE_TEXT_TEMPLATE_START
} from "../_vars";

export class HtmlWorker {
  constructor (templateData) {
    this.templateData = templateData;
  }

  render (renderTo, renderingElem, _templateData) {
    const _renderTo = typeof renderTo === "object" && renderTo?.nodeName ? renderTo : document.querySelector(renderTo);
    const _data = _templateData || this.templateData;
    // console.log('Template: ', renderingElem)
    function returnString(str) {
      // console.log(str, this);
      // console.log(REPLACE_TEXT_TEMPLATE_START)
      // console.log(str.match(new RegExp('\\' + REPLACE_TEXT_TEMPLATE_START, 'g')))

      const testFunc = (start) => {
        let _start = str.indexOf(REPLACE_TEXT_TEMPLATE_START, start);

        if(_start < 0) return false;

        let startIndexWithRegExp = _start + REPLACE_TEXT_TEMPLATE_START.length;
        let keyValue = str.slice(startIndexWithRegExp, str.indexOf(REPLACE_TEXT_TEMPLATE_END, startIndexWithRegExp));

        if(keyValue.includes(RENDER_SUB_KEY_START)) {
          const firstArgumentEnd = str.indexOf(RENDER_SUB_KEY_FIRST_END, startIndexWithRegExp);
          let htmlString = str.slice((str.indexOf(RENDER_SUB_KEY_START, start) + RENDER_SUB_KEY_START.length), firstArgumentEnd);
          let dataKey = str.slice(firstArgumentEnd + RENDER_SUB_KEY_FIRST_END.length, str.indexOf(")", firstArgumentEnd)).trim();

          if(this[dataKey]) {
            let c = '';
            if(Array.isArray(this[dataKey]) && this[dataKey].length) {
              this[dataKey].forEach(item => {
                c += returnString.apply(item, [htmlString]);
              })
            }else {
              c = returnString.apply(this[dataKey], [htmlString]);
            }
            let reg = new RegExp(`\\${REPLACE_TEXT_TEMPLATE_START}${RENDER_SUB_KEY}\\${RENDER_SUB_SYMBOL}.+${dataKey}\\)\\${REPLACE_TEXT_TEMPLATE_END}`, 's');
            str = str.replace(reg, c);
          }
        }else {
          if(this[keyValue]) {
            let reg = new RegExp(`\\${REPLACE_TEXT_TEMPLATE_START}${keyValue}\\${REPLACE_TEXT_TEMPLATE_END}`);
            str = str.replace(reg, this[keyValue])
          } else console.error(`this "${keyValue}" key is not found in scope`)
        }
        // console.log(_start)

        testFunc(startIndexWithRegExp)
      }
      testFunc(0)
      // console.log(str)
      return str
    }

    if (_renderTo && renderingElem) {
      console.log('Render: ', _renderTo, renderingElem, _data)
      if(Array.isArray(_data)) {
        _data.forEach(item => _renderTo.innerHTML += returnString.apply(item, [renderingElem]));
      }else {
        _renderTo.innerHTML += returnString.apply(_data, [renderingElem]);
      }
    }
  }
}
