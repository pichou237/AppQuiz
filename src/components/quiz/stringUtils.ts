export const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };
  
  // Alternative pour Node.js si nécessaire
  export const decodeNodeEntities = (text: string): string => {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };