export function replaceLinks(html, url, filterString) {
  return html.replaceAll(
    /href="\.\/[^"]*/g,
    (match) => {
      let newText = `${
        match.replace('./', `${url.replace(/\/$/, '')}/`)
      }`;
      if (filterString) {
        newText += `/${encodeURIComponent(filterString)}`;
      }
      return newText;
    },
  );
}

export default function replace(text, replaceFilter) {
  let newText = text;
  if (replaceFilter) {
    replaceFilter.pieces.forEach((piece) => {
      if (piece.type === 'replace') {
        newText = newText.replace(new RegExp(`\\b${piece.params.text}\\b`, 'gi'), (match) => {
          if (match[0] === match[0].toUpperCase()) {
            return piece.params.new[0].toUpperCase() + piece.params.new.substring(1);
          }
          return piece.params.new;
        });
      }
    });
  }
  return newText;
}
