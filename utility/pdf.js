const pdfMake = require("pdfmake/build/pdfmake.js");
import font from "pdfmake/build/vfs_fonts";
pdfMake.vfs = font.pdfMake.vfs;

export function createAndDownloadPDF(content) {
  const { patient, productCounter, totalAmount, totalQty } = content;
  const {
    first_name,
    last_name,
    gender,
    phone,
    description,
    collection,
    status
  } = patient;

  const tableHeader = {
    bold: true,
    fontSize: 13,
    color: "black"
  };

  let bodyArray = [];
  bodyArray.push([
    { text: "Items checked out", style: tableHeader },
    { text: "Qty", style: tableHeader },
    { text: "Price", style: tableHeader }
  ]);

  _.sortedUniqBy(collection, "id")
    .map((product, i) => {
      const { id, name, price, description } = product;
      const qty = productCounter[id];
      return [name, qty, (Number(qty) * Number(price)).toFixed(2)];
    })
    .forEach(product => {
      bodyArray.push(product);
    });

  bodyArray.push([
    { text: "Total Qty", style: tableHeader },
    { text: "x" + totalQty, style: tableHeader },
    { text: totalAmount, style: tableHeader }
  ]);

  let docDefinition = {
    content: [
      {
        text: `Bill for ${first_name} ${last_name}`,
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 8]
      },
      {
        style: { margin: [0, 5, 0, 15] },
        table: {
          headerRows: 1,
          body: bodyArray
        },
        layout: "headerLineOnly"
      }
    ]
  };

  pdfMake.createPdf(docDefinition).download(`${first_name}_${last_name}.pdf`);
}
