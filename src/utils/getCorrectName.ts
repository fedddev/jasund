const wrongNames = new Set([
  "Jason",
  "Jayson",
  "Jaysun",
  "Json",
  "Jasmine",
  "Jasoon",
  "Juan",
  "J",
  "Jay",
]);

const capIt = (name: string): string => {
  const lowerName = name.toLocaleLowerCase().replace(/\s/g, "");
  return (
    lowerName.toLocaleLowerCase().charAt(0).toLocaleUpperCase() +
    lowerName.slice(1)
  );
};

const isWrongName = (name: string): boolean => {
  return wrongNames.has(name);
};

export const getCorrectName = (
  countryOne: string,
  countryTwo: string
): string => {
  const first = countryOne[0];
  const last = countryOne[countryOne.length - 1];
  let middle = "";
  for (let i = 0; i < countryTwo.length; i++) {
    middle = countryTwo[i] + middle;
  }
  const correctName = capIt(`${first}${middle}${last}`);
  return !isWrongName(correctName)
    ? correctName
    : 'Contrary to popular belief, "Jasun" is actually a perfectly fine way to spell it.';
};
