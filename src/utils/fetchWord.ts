export const fetchRandomWord = async (length: number): Promise<string | null> => {
  try {
    const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}&lang=es`);
    const data = await res.json();
    const word = data[0].toUpperCase();
    if (word.includes('Ñ')) return await fetchRandomWord(length); // Evitar palabras con Ñ
    return word;
  } catch (err) {
    console.error(err);
    return null;
  }
};
