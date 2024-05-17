import { validationRules, checkRules } from '~/utils';

describe('Form fields validation util:', () => {
  test('Not empty', () => {
    const rules = validationRules().notEmpty().finalize();

    expect(checkRules('aaa', rules)).toBeNull();
    expect(checkRules('', rules)).toBe('Field cannot be empty');
  });

  test('No spaces', () => {
    const rules = validationRules().noSpaces().finalize();

    expect(checkRules('aaa', rules)).toBeNull();
    expect(checkRules('aaa bbb', rules)).toBe('Field cannot contain spaces');
  });

  test('Minimum size', () => {
    const rules = validationRules().minSize(8).finalize();

    expect(checkRules('aaaaaaaa', rules)).toBeNull();
    expect(checkRules('aaa bbb', rules)).toBe('Minimum size should be 8 characters');
  });

  test('Maximum size', () => {
    const rules = validationRules().maxSize(8).finalize();

    expect(checkRules('aaaaaaaa', rules)).toBeNull();
    expect(checkRules('aaa bbb ccc', rules)).toBe('Maximum size should be 8 characters');
  });

  test('Password', () => {
    const rules = validationRules().password().finalize();

    expect(checkRules('aB1', rules)).toBeNull();
    expect(checkRules('aaa', rules)).not.toBeNull();
  });

  test('Date', () => {
    const rules = validationRules().date().finalize();

    expect(checkRules('01.01.2000', rules)).toBeNull();
    expect(checkRules('01/01/2000', rules)).not.toBeNull();
  });

  test('Minimum age', () => {
    const rules = validationRules().minAge(20, 'Too young').finalize();

    expect(checkRules('01.01.2000', rules)).toBeNull();
    expect(checkRules('01.01.2010', rules)).toBe('Too young');
  });

  test('Only letters', () => {
    const rules = validationRules().onlyLetters().finalize();

    expect(checkRules('abc', rules)).toBeNull();
    expect(checkRules('ab/01', rules)).not.toBeNull();
  });

  test('Only numbers', () => {
    const rules = validationRules().onlyNumbers().finalize();

    expect(checkRules('123', rules)).toBeNull();
    expect(checkRules('ab/01', rules)).not.toBeNull();
  });

  test('Only string', () => {
    const rules = validationRules().string().finalize();

    expect(checkRules('abc', rules)).toBeNull();
    expect(checkRules('01/02', rules)).not.toBeNull();
  });

  test('Validate email', () => {
    const rules = validationRules().notEmpty().noSpaces().email('Invalid email address').finalize();

    expect(checkRules('2@2.ru', rules)).toBeNull();
    expect(checkRules('abra@cadabra', rules)).toBe('Invalid email address');
  });
});
