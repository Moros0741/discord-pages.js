
module.exports = {
  name: "chunker",
  execute(list, elementsPerSubArray) {
    const chunkedArray = [];
    let i, k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        chunkedArray[k] = [];
      }
      chunkedArray[k].push(list[i]);
    }
    return chunkedArray;
  },
};