import Form from './components/form';

export default class FormSucsess extends Form {
  constructor(
    title,
    buttonClass,
    additionalClasses,
  ) {
    super([], null, "", title, buttonClass, null, additionalClasses);
  }
}
