const fs = require("node:fs");
const path = require("node:path");
const { Command } = require("commander");

const filePath = path.join(__dirname + "/expense.json");
const program = new Command();

program
  .name("expense-tracker")
  .description("Expense tracker CLI")
  .version("0.8.0");

//add an expense
program
  .command("add")
  .description("add an expense")
  .requiredOption("--description <expense>", "name of the expense you spent on")
  .requiredOption("--amount <amount>", "amount spent on the expense")
  .action((options) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        const newExpenseData = {
          id: 1,
          date: new Date().toLocaleString(),
          description: options.description,
          amount: options.amount,
        };
        const expenseData = [newExpenseData];

        fs.writeFile(filePath, JSON.stringify(expenseData), (err) => {
          if (err) throw err;
          console.log(`Expense successfully added (ID: ${newExpenseData.id})`);
        });
      } else {
        let allExpenses = JSON.parse(data);
        const newExpenseData = {
          id: allExpenses.length + 1,
          date: new Date().toLocaleString(),
          description: options.description,
          amount: options.amount,
        };

        allExpenses.push(newExpenseData);

        fs.writeFile(filePath, JSON.stringify(allExpenses), (err) => {
          if (err) throw err;
          console.log(`Expense successfully added (ID: ${newExpenseData.id})`);
        });
      }
    });
  });

//delete an expense
program
  .command("delete")
  .description("delete an expense")
  .requiredOption("--id <id>", "id of the expense to delete")
  .action((options) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("No such file exists", err);
      } else {
        let allExpenses = JSON.parse(data);
        if (options.id > allExpenses.length) {
          console.log(`No expense with such id: ${options.id}`);
        } else {
          allExpenses.splice(options.id - 1, 1);
        }

        //updating expense IDs
        for (let i = 0; i < allExpenses.length; i++) {
          allExpenses[i].id = i + 1;
        }

        fs.writeFile(filePath, JSON.stringify(allExpenses), (err) => {
          if (err) {
            throw err;
          } else {
            console.log(`Expense successfully deleted`);

            //delete file if all expenses are deleted.
            if (allExpenses.length === 0) {
              fs.unlink(filePath, (err) => {
                if (err) {
                  throw err;
                } else {
                  console.log(
                    "All expenses deleted. \nDeleting file ... ... ... \nFile successfully deleted."
                  );
                }
              });
            }
          }
        });
      }
    });
  });

//update an expense
program
  .command("update")
  .description("update an expense")
  .requiredOption("--id <id>", "id of the expense to update")
  .option("--description <expense>", "update expense")
  .option("--amount <amount>", "update amount spent")
  .action((options) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("No such file exists: ", err);
      } else {
        let allExpenses = JSON.parse(data);
        if (!options.description && !options.amount) {
          console.error(
            "Error: At least one of --description or --amount is required."
          );
          process.exit(1);
        } else if (options.description && options.amount) {
          allExpenses[options.id - 1].description = options.description;
          allExpenses[options.id - 1].amount = options.amount;
        } else if (!options.description && options.amount) {
          allExpenses[options.id - 1].amount = options.amount;
        } else {
          allExpenses[options.id - 1].description = options.description;
        }

        fs.writeFile(filePath, JSON.stringify(allExpenses), (err) => {
          if (err) {
            throw err;
          } else {
            console.log(`Expense successfully updated`);
          }
        });
      }
    });
  });

program.parse();
