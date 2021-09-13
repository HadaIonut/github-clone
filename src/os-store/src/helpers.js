import sanitizeHtml from 'sanitize-html';
import { TRUSTED_FIELD_PREFIX, TRUSTED_FIELDS } from './constants';

export const checkForFreeProductVariant = product =>
  Object.keys(product.options).some(elem => product.options[elem].price === 0);

// Some fields should not be sanitized (e.g markdown content)
const checkTrustedField = (key, data) => {
  let isTrusted = false;

  if (
    key.includes(TRUSTED_FIELD_PREFIX) ||
    TRUSTED_FIELDS.includes(key) ||
    !data[key]
  ) {
    isTrusted = true;
  }

  return isTrusted;
};

export const sanitizeValues = data => {
  if (data) {
    let sanitizedData = data;

    if (Array.isArray(data)) {
      sanitizedData = data.map(entry => sanitizeValues(entry));
    } else if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach(key => {
        sanitizedData[key] = checkTrustedField(key, data)
          ? data[key]
          : sanitizeValues(data[key]);
      });
    } else if (typeof data === 'string') {
      sanitizedData = sanitizeHtml(data, { allowedTags: [] });
    }
    return sanitizedData;
  }
  return null;
};
