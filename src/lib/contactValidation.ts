const EMAIL_LOCAL_PART = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;

export function isValidEmailAddress(value: string): boolean {
  const email = value.trim();
  const separator = email.lastIndexOf('@');
  if (separator <= 0 || separator === email.length - 1 || email.length > 320) return false;

  const localPart = email.slice(0, separator);
  const domain = email.slice(separator + 1);
  if (
    localPart.length > 64 ||
    localPart.startsWith('.') ||
    localPart.endsWith('.') ||
    localPart.includes('..') ||
    !EMAIL_LOCAL_PART.test(localPart) ||
    domain.length > 253
  ) {
    return false;
  }

  const labels = domain.split('.');
  if (labels.length < 2 || labels.some((label) => label.length > 63 || !DOMAIN_LABEL.test(label))) {
    return false;
  }

  const topLevelDomain = labels[labels.length - 1];
  return /^[A-Za-z]{2,}$/.test(topLevelDomain) || /^xn--[A-Za-z0-9-]{2,}$/i.test(topLevelDomain);
}
