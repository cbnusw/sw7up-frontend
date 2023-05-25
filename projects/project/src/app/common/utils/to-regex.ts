export const toRegex = v => {
  const s = '.*+?^$[]{}()|\\';
  v = v.split('').map(c => s.includes(c) ? '\\' + c : c).join('');
  return new RegExp(v, 'i');
};
