// Sum up the total value of selected products
export function productSum(products) {
  let total;
  if (products && products.length > 0) {
      console.log("< Products: ",products)
    let priceList = products.map(product => {
      return product.price;
    });
    

    total = priceList.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
  return total || Number(0).toFixed(2);
}
