// Sum up the total value of selected products
export function productSum(products) {
  let total = 0;
  if (products && products.length > 0) {
    let priceList = products.map(product => {
      return product.price;
    });

    total = priceList.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue)
    );
  }

  return Number(total).toFixed(2) || Number(0).toFixed(2);
}
