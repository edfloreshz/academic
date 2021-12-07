import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { IAlumno } from "../models/Alumno";
import { IDocente } from "../models/Docente";
import {IPago} from "../models/Pago";

async function generatePDFAdeudo(alumno: IAlumno) {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Embed the Times Roman font
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the width and height of the page
  const { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 10;
  const jpgImageBytes = await fetch(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe14FjZbUhI9_TkDDeKlX3nwlODaNRw2kN95v5D3ixphPjy9csIIj96JxTKNYjQEDOhNE&usqp=CAU"
  ).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.5);
  const X = width / 10;
  page.drawImage(jpgImage, {
    x: X,
    y: (height / 8) * 6,
    width: jpgDims.width,
    height: jpgDims.height,
  }); // Logo
  page.drawText("COLEGIO: CRECIENDO JUNTOS\nCCT: 26PJN0246M", {
    x: X * 6,
    y: (height / 8) * 6,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawText("ASUNTO: CARTA DE NO ADEUDO", {
    x: X * 6,
    y: (height / 16) * 11,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText("A QUIEN CORRESPONDA:", {
    x: X,
    y: (height / 24) * 15,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(
    `Quien suscribe C. Mtra. MARIA DE LOS ANGELES MARTINEZ CAMPA director de este plantel`,
    {
      x: X,
      y: (height / 24) * 14,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(`HACE CONSTAR`, {
    x: (width / 12) * 5,
    y: (height / 48) * 26,
    size: fontSize + 4,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(
    `Que el alumno ${alumno.nombres} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno} con CURP: ${alumno.curp} es alumno de este plantel`,
    {
      x: X,
      y: (height / 48) * 24,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `educativo, el cual NO PRESENTA NINGUN TIPO DE ADEUDO a esta institucion, por concepto de`,
    {
      x: X,
      y: (height / 48) * 23,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(`colegiaturas, inscripciones, libros y material.`, {
    x: X,
    y: (height / 48) * 22,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(
    `Se extiende la presente CONSTANCIA al interesado para los fines personales que a el convenga en la`,
    {
      x: X,
      y: (height / 48) * 20,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  var date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  page.drawText(
    `ciudad de Hermosillo, Sonora a ${date.toLocaleString("es-ES", options)}.`,
    {
      x: X,
      y: (height / 48) * 19,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(`ATENTAMENTE`, {
    x: (width / 12) * 5,
    y: (height / 48) * 9,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(`MTRA. MARIA DE LOS ANGELES MARTINEZ CAMPA`, {
    x: (width / 12) * 3.4,
    y: (height / 48) * 6,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(`DIRECTOR DEL PLANTEL`, {
    x: (width / 12) * 4.7,
    y: (height / 48) * 5,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const url = window.URL.createObjectURL(new Blob([pdfBytes]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "file.pdf");
  document.body.appendChild(link);
  link.click();
}

async function generatePDFConducta(alumno: IAlumno) {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Embed the Times Roman font
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the width and height of the page
  const { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 10;
  const jpgImageBytes = await fetch(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe14FjZbUhI9_TkDDeKlX3nwlODaNRw2kN95v5D3ixphPjy9csIIj96JxTKNYjQEDOhNE&usqp=CAU"
  ).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.5);
  const X = width / 10;
  page.drawImage(jpgImage, {
    x: X,
    y: (height / 8) * 6,
    width: jpgDims.width,
    height: jpgDims.height,
  }); // Logo
  page.drawText("COLEGIO: CRECIENDO JUNTOS\nCCT: 26PJN0246M", {
    x: X * 6,
    y: (height / 8) * 6,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawText("ASUNTO: CARTA DE CONDUCTA.", {
    x: X * 6,
    y: (height / 16) * 11,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText("A QUIEN CORRESPONDA:", {
    x: X,
    y: (height / 24) * 15,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(
    `Quien suscribe C. Mtra. MARIA DE LOS ANGELES MARTINEZ CAMPA director del preescolar CENDI`,
    {
      x: X,
      y: (height / 48) * 28,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `CRECIENDO JUNTOS, hace constar que el alumno C. ${alumno.nombres} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno},  perteneció a esta`,
    {
      x: X,
      y: (height / 48) * 27,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `institución educativa tiempo durante el cual presento MUY BUENA CONDUCTA dentro de la institución,`,
    {
      x: X,
      y: (height / 48) * 26,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `por lo que en mi calidad de director me permito recomendarlo como un excelente alumno incapaz de`,
    {
      x: X,
      y: (height / 48) * 25,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(
    `observar actitud alguna que altere la disciplina y el orden.`,
    {
      x: X,
      y: (height / 48) * 24,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `Se extiende la presente CONSTANCIA al interesado para los fines personales que a el convenga en la`,
    {
      x: X,
      y: (height / 48) * 22,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  var date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  page.drawText(
    `ciudad de Hermosillo, Sonora a ${date.toLocaleString("es-ES", options)}.`,
    {
      x: X,
      y: (height / 48) * 21,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(`ATENTAMENTE`, {
    x: (width / 12) * 5,
    y: (height / 48) * 9,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(`MTRA. MARIA DE LOS ANGELES MARTINEZ CAMPA`, {
    x: (width / 12) * 3.4,
    y: (height / 48) * 6,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(`DIRECTOR DEL PLANTEL`, {
    x: (width / 12) * 4.7,
    y: (height / 48) * 5,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const url = window.URL.createObjectURL(new Blob([pdfBytes]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "file.pdf");
  document.body.appendChild(link);
  link.click();
}

async function generatePDFRecomendacion(
  docente: IDocente,
  startDate: Date,
  endDate: Date
) {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Embed the Times Roman font
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the width and height of the page
  const { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 10;
  const jpgImageBytes = await fetch(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe14FjZbUhI9_TkDDeKlX3nwlODaNRw2kN95v5D3ixphPjy9csIIj96JxTKNYjQEDOhNE&usqp=CAU"
  ).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.5);
  const X = width / 10;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  page.drawImage(jpgImage, {
    x: X,
    y: (height / 8) * 6,
    width: jpgDims.width,
    height: jpgDims.height,
  }); // Logo
  page.drawText("COLEGIO: CRECIENDO JUNTOS\nCCT: 26PJN0246M", {
    x: X * 6,
    y: (height / 8) * 6,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawText("ASUNTO: CARTA DE RECOMENDACIÓN.", {
    x: X * 6,
    y: (height / 16) * 11,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText("A QUIEN CORRESPONDA:", {
    x: X,
    y: (height / 24) * 15,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(
    `Por medio de la presente estoy recomendando ampliamente a la Lic. ${docente.nombres} ${docente.apellidoPaterno} ${docente.apellidoMaterno} quien`,
    {
      x: X,
      y: (height / 48) * 28,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `laboro en nuestra institución durante el periodo de ${startDate.toLocaleString(
      "es-ES",
      options
    )} a ${endDate.toLocaleString("es-ES", options)} como maestra`,
    {
      x: X,
      y: (height / 48) * 27,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(
    `titular del grupo de ${docente.aulaAsignadaNavigation?.nombre}, y de quien puedo decir es, una persona responsable, honesta, entusiasta`,
    {
      x: X,
      y: (height / 48) * 26,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );
  page.drawText(`y con un compromiso a su profesión.`, {
    x: X,
    y: (height / 48) * 25,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  var date = new Date();
  page.drawText(
    `Se extiende la presente en la ciudad de Hermosillo, Sonora a ${date.toLocaleString(
      "es-ES",
      options
    )}.`,
    {
      x: X,
      y: (height / 48) * 23,
      size: fontSize,
      font: helvetica,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(`ATENTAMENTE`, {
    x: (width / 12) * 5,
    y: (height / 48) * 9,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(`MTRA. MARIA DE LOS ANGELES MARTINEZ CAMPA`, {
    x: (width / 12) * 3.4,
    y: (height / 48) * 6,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });

  page.drawText(`DIRECTOR DEL PLANTEL`, {
    x: (width / 12) * 4.7,
    y: (height / 48) * 5,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const url = window.URL.createObjectURL(new Blob([pdfBytes]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "file.pdf");
  document.body.appendChild(link);
  link.click();
}

async function generateReceipt(pago: IPago) {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Embed the Times Roman font
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the width and height of the page
  const { width, height } = page.getSize();
  
  const fontSize = 16;

  const jpgImageBytes = await fetch(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe14FjZbUhI9_TkDDeKlX3nwlODaNRw2kN95v5D3ixphPjy9csIIj96JxTKNYjQEDOhNE&usqp=CAU"
  ).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.5);
  const X = width / 12;
  const Y = height / 64;
  page.drawImage(jpgImage, {
    x: X,
    y: Y * 49,
    width: jpgDims.width,
    height: jpgDims.height,
  }); // Logo

  page.drawRectangle({
    x: X-6,
    y: Y * 48,
    width: X*2.8,
    height: (height / 8)+27,
    color: rgb(0, 0, 0),
    borderWidth: 5,
    opacity: 0,
    borderOpacity: 1,
  });
  
  page.drawText(`RECIBO DE PAGO`, {
    x: X*3.8,
    y: (height / 8) * 7,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawRectangle({
    x: X*3.7,
    y: Y * 55,
    width: 400,
    height: 40,
    color: rgb(0, 0, 0),
    borderWidth: 5,
    opacity: 0,
    borderOpacity: 1,
  });
  page.drawText(`TUTOR: `, {
    x: X*3.8,
    y: (height / 16) * 13,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${pago.idTutorNavigation?.nombres.trim().toUpperCase()} ${pago.idTutorNavigation?.apellidoPaterno.trim().toUpperCase()} ${pago.idTutorNavigation?.apellidoMaterno.trim().toUpperCase()}`, {
    x: X*5.1,
    y: (height / 16) * 13,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawText(`ALUMNO: `, {
    x: X*3.8,
    y: (height / 16) * 12,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${pago.idAlumnoNavigation?.nombres.trim().toUpperCase()} ${pago.idAlumnoNavigation?.apellidoPaterno.trim().toUpperCase()} ${pago.idAlumnoNavigation?.apellidoMaterno.trim().toUpperCase()}`, {
    x: X*5.4,
    y: (height / 16) * 12,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawText(`CONCEPTO: `, {
    x: X*3.8,
    y: (height / 16) * 11,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${pago.conceptoNavigation?.concepto.trim().toUpperCase()}`, {
    x: X*5.9,
    y: (height / 16) * 11,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawText("FECHA: ", {
    x: X*3.8,
    y: (height / 16) * 10,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  })
      
  page.drawText(`${pago.fecha.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`, {
    x: X*5.2,
    y: (height / 16) * 10,
    size: fontSize,
    font: helvetica,
    color: rgb(0, 0, 0),
  });
  page.drawRectangle({
    x: X*3.7,
    y: Y*37,
    width: 400,
    height: 237,
    color: rgb(0, 0, 0),
    borderWidth: 5,
    opacity: 0,
    borderOpacity: 1,
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const url = window.URL.createObjectURL(new Blob([pdfBytes]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "file.pdf");
  document.body.appendChild(link);
  link.click();
}

export { generatePDFAdeudo, generatePDFConducta, generatePDFRecomendacion, generateReceipt};
