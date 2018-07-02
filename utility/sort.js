export function countProductsByUnique(selectedProducts) {
  let counter = {};
  if (selectedProducts) {
    selectedProducts.forEach(product => {
      let { id } = product;
      if (counter[id]) {
        counter[id] += 1;
      } else {
        counter[id] = 1;
      }
    });
  }

  return counter;
}
