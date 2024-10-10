export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
}

export const REPLACE_TEXT_TEMPLATE_START = '\{{';
export const REPLACE_TEXT_TEMPLATE_END = '\}}';
export const TRANSLATE_KEY = 'translate';
export const RENDER_SUB_KEY = 'render';
export const RENDER_SUB_SYMBOL = '(!';
export const RENDER_SUB_KEY_START = 'render(!';
export const RENDER_SUB_KEY_FIRST_END = '!,';
