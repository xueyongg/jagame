// const pdfMake = require("pdfmake");

export function createAndDownloadPDF (content){
    let docDefinition ={
        content: [
            { text: 'This is a header', style: 'header' },
            'No styling here, this is a standard paragraph',
            { text: 'Another text', style: 'anotherStyle' },
            { text: 'Multiple styles applied', style: [ 'header', 'anotherStyle' ] }
          ],
    }

    pdfMake.createPdf(docDefinition).download();
}
