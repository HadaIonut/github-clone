import { sanitizeValues } from '../src/helpers';

describe('sanitizeValues', () => {
  it('sanitizes string', () => {
    const text = '<div>Test</div>';
    const result = sanitizeValues(text);

    const expectedResult = 'Test';
    expect(result).toEqual(expectedResult);
  });

  it('sanitizes object', () => {
    const object = {
      value1: '<div>Test</div>',
      value2: '<span>Test 2</span>',
    };
    const result = sanitizeValues(object);

    const expectedResult = {
      value1: 'Test',
      value2: 'Test 2',
    };
    expect(result).toEqual(expectedResult);
  });

  it('sanitizes nested object', () => {
    const object = {
      parent: {
        value: '<div>Test</div>',
      },
    };
    const result = sanitizeValues(object);

    const expectedResult = {
      parent: {
        value: 'Test',
      },
    };
    expect(result).toEqual(expectedResult);
  });

  it('sanitizes array', () => {
    const arr = ['<div>Test</div>'];

    const result = sanitizeValues(arr);

    const expectedResult = ['Test'];
    expect(result).toEqual(expectedResult);
  });

  it('sanitizes array of objects', () => {
    const arr = [{ value: '<div>Test</div>' }];

    const result = sanitizeValues(arr);

    const expectedResult = [{ value: 'Test' }];
    expect(result).toEqual(expectedResult);
  });

  it('sanitizes various nesting levels', () => {
    const arr = {
      parent: [{ value: '<div>Test</div>' }, '<table>test3</table>'],
      value2: '<span>Test2</span>',
    };

    const result = sanitizeValues(arr);

    const expectedResult = {
      parent: [{ value: 'Test' }, 'test3'],
      value2: 'Test2',
    };
    expect(result).toEqual(expectedResult);
  });

  it('encodes non alphanumeric characters', () => {
    const text = 'test < test3 >';

    const result = sanitizeValues(text);

    const expectedResult = 'test &lt; test3 &gt;';
    expect(result).toEqual(expectedResult);
  });

  it('allows alphanumeric characters', () => {
    const text = '.,;+-/[]{}*';

    const result = sanitizeValues(text);

    const expectedResult = '.,;+-/[]{}*';
    expect(result).toEqual(expectedResult);
  });

  it('ignores password field', () => {
    const object = {
      password: '<div>Test</div>',
      value2: '<span>Test 2</span>',
    };
    const result = sanitizeValues(object);

    const expectedResult = {
      password: '<div>Test</div>',
      value2: 'Test 2',
    };

    expect(result).toEqual(expectedResult);
  });

  it('does not sanitize null values', () => {
    const data = null;
    const result = sanitizeValues(data);
    const expectedResult = null;

    expect(result).toEqual(expectedResult);
  });
});
