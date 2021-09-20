const scaleNumberToRange = (nr, min, max) => {
  return (nr % (max - min + 1)) + min;
};

export default scaleNumberToRange;
