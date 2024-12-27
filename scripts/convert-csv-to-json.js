const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

const years = ['2021', '2022', '2023'];
const branches = ['cse', 'it', 'ece', 'mae', 'barch'];

years.forEach(year => {
  branches.forEach(branch => {
    const csvFilePath = path.join(__dirname, '..', 'data', year, `${branch}.csv`);
    const jsonFilePath = path.join(__dirname, '..', 'public', 'data', year, `${branch}.json`);

    if (fs.existsSync(csvFilePath)) {
      const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
      const records = csv.parse(csvContent, {
        columns: true,
        skip_empty_lines: true
      });

      fs.mkdirSync(path.dirname(jsonFilePath), { recursive: true });
      fs.writeFileSync(jsonFilePath, JSON.stringify(records, null, 2));

      console.log(`Converted ${csvFilePath} to ${jsonFilePath}`);
    } else {
      console.log(`CSV file not found: ${csvFilePath}`);
    }
  });
});

