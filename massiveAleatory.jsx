const fs = require('fs');
const { parse } = require('json2csv');

// Función para generar un código de patrocinador aleatorio
function generateRandomSponsorCode() {
  const randomDigits = Math.floor(Math.random() * 10000000);
  const sponsorCode = `MOV${randomDigits.toString().padStart(7, '0')}`;
  return sponsorCode;
}

// Función para generar un número de documento aleatorio
function generateRandomDocumentNumber() {
  let documentNumber;
  do {
    documentNumber = Math.floor(Math.random() * 80000000) + 10000000;
  } while (/(\d)\1{2}/.test(documentNumber));
  return documentNumber.toString();
}

// Función para generar los registros de datos
function generateDataRecords() {
  const data = [];
  for (let i = 0; i < 5671; i++) {
    const record = {
      sponsorCode: generateRandomSponsorCode(),
      documentNumber: generateRandomDocumentNumber()
    };
    data.push(record);
  }
  return data;
}

// Generar los datos en formato JSON
const jsonData = {
  companyId: "0E76433E-F36B-1410-81C2-009E18C9AD57",
  data: generateDataRecords()
};

// Convertir JSON a CSV
const fields = ['sponsorCode', 'documentNumber'];
const opts = { fields };

try {
  const csv = parse(jsonData.data, opts);
  fs.writeFile('registros.csv', csv, (err) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('El archivo CSV se ha creado correctamente.');
  });
} catch (err) {
  console.error('Error:', err);
}
