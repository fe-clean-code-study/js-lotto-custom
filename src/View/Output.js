import createValidator from '../utils/createValidator.js';
import OutputValidator from '../validator/View/OutputValidator.js';

export default class Output {
  #template;
  constructor({ template }) {
    this.#template = template;
    this.validator = createValidator(OutputValidator);
  }

  static print(...message) {
    console.log(...message);
  }

  static lineBreak() {
    console.log('');
  }

  format(templateKey, templateVariables) {
    this.validator({ templateKey, templateVariables });
    let templateString = this.#template[templateKey];

    Object.entires(templateVariables).forEach(([variable, value]) => {
      templateString = templateString.replaceAll(`%{${variable}}`, value);
    });

    return templateString;
  }
}
