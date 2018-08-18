const logger = require("../log");
const query = require("./query");
const db = require("./connection");
const fs = require("fs");
const path = require("path");
// const QueryFile = require('pg-promise').QueryFile;

// // Helper for linking to external query files:
// const sql = (filePath) => {
//   return new QueryFile(filePath, {minify: true})
// }

// const migrate = async () => {
//   // drop everything first - TODO: remove on production
//   await query(db).table.dropAll()
//   console.log(await query(db).table.getAll())

//   // ensure migration table exists
//   await query(db).migration.create()

//   // retrieve the migrations from the directory
//   migrationDir = path.join(__dirname, 'sql')
//   fs.readdir(migrationDir, (err, files) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(files);
//       db.tx(async t => {
//         for (let [index, file] of files.slice(0, 6).entries()) {
//           let res = await query(db).migration.exists(index + 1)
//           if (!res.exists)
//             try {
//               await t.none(sql(path.join(migrationDir, file)))
//               await query(db).migration.insert(file)
//               logger.log("info", `migration ${file} success`)
//             } catch (e) {
//               logger.log("error", `migration ${file} failed: ${e}`)
//             }
//           else logger.log("info", `migration ${file} skipped`)
//         }
//       });
//     }
//   });
// };

const migrate = async () => {
  
  // drop tables if on DEV
  if (process.env.DROP_TABLES) await query(db).table.dropAll();
  await query(db).table.init();

  // ensure migration table exists
  await query(db).migration.create();

  // retrieve the migrations from the directory
  fs.readdir(path.join(__dirname, "./migration"), async (err, files) => {
    if (err) {
      console.error(err);
    } else {
      console.log(files);
      const migrations = files.map(f => [f, require("./migration/" + f)]);
      // do migrations
      for (let [index, m] of migrations.entries()) {
        let res = await query(db).migration.exists(index + 1);
        if (!res.exists)
          try {
            await m[1]();
            await query(db).migration.insert(m[0]);
            logger.log("info", `migration ${m[0]} success`);
          } catch (e) {
            logger.log("error", `migration ${m[0]} failed: ${e}`);
            break;
          }
        else logger.log("info", `migration ${m[0]} skipped`);
      }
      logger.log("info", `migrations complete`);
      // console.log(await query(db).table.getAll());
    }
  });
};

module.exports = migrate;
