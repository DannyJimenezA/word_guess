export async function fetchRandomWord(length = 5): Promise<string | null> {
    try {
      const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`);
      const data = await response.json();
      return data[0]?.toUpperCase() || null;
    } catch (err) {
      console.error("Error fetching word:", err);
      return null;
    }
  }
  