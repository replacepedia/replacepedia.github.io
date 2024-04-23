export default function sentenceToKebab(string) {
  return string.replaceAll(' ', '-').toLowerCase();
}

export function kebabToSentence(string) {
  let sentence = string.replaceAll('-', ' ').toLowerCase();
  if (string && string !== '') {
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }
  return sentence;
}
