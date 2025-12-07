const readline = require('readline');
const db = require('./db');
require('./events/logger'); // Initialize event logger

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log(`
===== NodeVault =====
1. Add Record
2. List Records
3. Update Record
4. Delete Record
5. Search Records
6. Sort Records
7. Export Data
8. View Vault Statistics
9. Exit
=====================
  `);

  rl.question('Choose option: ', ans => {
    switch (ans.trim()) {
      case '1':
        rl.question('Enter name: ', name => {
          rl.question('Enter value: ', value => {
            Promise.resolve(db.addRecord({ name, value }))
              .then(() => console.log('✅ Record added successfully!'))
              .catch(err => console.log(`❌ ${err.message}`))
              .finally(menu);
          });
        });
        break;

      case '2':
        Promise.resolve(db.listRecords())
          .then(records => {
            if (!records || records.length === 0) console.log('No records found.');
            else records.forEach(r => console.log(`ID: ${r.id} | Name: ${r.name} | Value: ${r.value}`));
          })
          .catch(err => console.log(`❌ ${err.message}`))
          .finally(menu);
        break;

      case '3':
        rl.question('Enter record ID to update: ', id => {
          rl.question('New name: ', name => {
            rl.question('New value: ', value => {
              Promise.resolve(db.updateRecord(Number(id), name, value))
                .then(updated => console.log(updated ? '✅ Record updated!' : '❌ Record not found.'))
                .catch(err => console.log(`❌ ${err.message}`))
                .finally(menu);
            });
          });
        });
        break;

      case '4':
        rl.question('Enter record ID to delete: ', id => {
          Promise.resolve(db.deleteRecord(Number(id)))
            .then(deleted => console.log(deleted ? '🗑️ Record deleted!' : '❌ Record not found.'))
            .catch(err => console.log(`❌ ${err.message}`))
            .finally(menu);
        });
        break;

      case '5':
        rl.question('Enter search keyword: ', keyword => {
          Promise.resolve(db.searchRecords(keyword))
            .then(results => {
              if (!results || results.length === 0) {
                console.log('No records found.');
              } else {
                console.log(`\nFound ${results.length} matching record(s):`);
                results.forEach((record, index) => {
                  console.log(`${index + 1}. ID: ${record.id} | Name: ${record.name} | Value: ${record.value}`);
                });
              }
            })
            .catch(err => console.log(`❌ ${err.message}`))
            .finally(menu);
        });
        break;

      case '6':
        console.log('\nSort Options:');
        console.log('1) Name');
        console.log('2) Creation Date');
        rl.question('Choose field (1/2): ', fieldInput => {
          const field = fieldInput.trim() === '2' ? 'createdAt' : 'name';

          rl.question('Order (asc/desc): ', orderInput => {
            const direction = orderInput.trim().toLowerCase() === 'desc' ? 'desc' : 'asc';
            Promise.resolve(db.sortRecords(field, direction))
              .then(sorted => {
                if (!sorted || sorted.length === 0) {
                  console.log('No records found.');
                } else {
                  console.log(`\nSorted by ${field === 'createdAt' ? 'creation date' : 'name'} (${direction}):`);
                  sorted.forEach(r => {
                    console.log(`ID: ${r.id} | Name: ${r.name} | Created: ${r.createdAt} | Value: ${r.value}`);
                  });
                }
              })
              .catch(err => console.log(`❌ ${err.message}`))
              .finally(menu);
          });
        });
        break;

      case '7':
        Promise.resolve(db.exportToText())
          .then(exportPath => console.log(`✅ Data exported successfully to ${exportPath}`))
          .catch(err => console.log(`❌ ${err.message}`))
          .finally(menu);
        break;

      case '8':
        Promise.resolve(db.getStatistics())
          .then(stats => {
            console.log('\nVault Statistics:');
            console.log('-------------------');
            console.log(`Total Records: ${stats.totalRecords}`);
            console.log(`Last Modified: ${stats.lastModified}`);
            console.log(`Longest Name: ${stats.longestName} (${stats.longestNameLength} chars)`);
            console.log(`Earliest Record: ${stats.earliest}`);
            console.log(`Latest Record: ${stats.latest}`);
          })
          .catch(err => console.log(`❌ ${err.message}`))
          .finally(menu);
        break;

      case '9':
        console.log('👋 Exiting NodeVault...');
        rl.close();
        break;

      default:
        console.log('Invalid option.');
        menu();
    }
  });
}

menu();
