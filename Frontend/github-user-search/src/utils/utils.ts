export const sliceText = (value: string, maxValue: number) => {
  return value.length > maxValue ? `${value.slice(0, maxValue)}...` : value;
};

export const pluralizeText = (value: number, text: string) => {
  return value <= 1 ? `${text}` : `${text}s`;
};
