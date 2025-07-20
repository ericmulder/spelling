const wordLists = {
    easy: {
        "ei/ij": ["prijs", "klein", "eind", "tijd", "reis"],
        "d/t": ["hond", "paard", "mand", "krant"],
        "samenstelling": ["rugzak", "speelgoed", "voetbal"]
    },
    medium: {
        "ei/ij": ["geheim", "steiger", "weigeren", "bereik"],
        "d/t": ["hij wordt", "jij vindt", "antwoord"],
        "samenstelling": ["verkeerslicht", "kinderboerderij"]
    }
};

function getWord(difficulty) {
    const categories = Object.keys(wordLists[difficulty]);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const words = wordLists[difficulty][randomCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return { word: randomWord, category: randomCategory };
}
