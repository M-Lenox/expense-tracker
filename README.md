# Expense Tracker CLI

A simple command-line interface (CLI) built with Node.js to help you track your daily expenses. This tool allows you to add, update, delete, and summarize expenses directly from your terminal using commands and options. It’s a lightweight project designed to practice working with files, CLI arguments, and user input using the Commander.js library.
Project idea from: https://roadmap.sh/projects/expense-tracker

## Features

- Add a new expense with amount, description, and date

- Delete or update any expense by ID

- View all expenses

- Generate a summary by month or year

- Data stored locally in a JSON file

- Simple interface with easy-to-use commands

## Getting Started

### Prerequisites

- `Node.js` installed on your machine

## Usage

### Run the CLI

```bash
node main.js <command> [options]
```

### Available Commands

```bash
# Add a new expense
node main.js add --description "Groceries" --amount "500"

# Update an expense at least one option is required
node main.js update --id "2" --amount "600"

# Delete an expense
node main.js delete --id "2"

# View summary for a specific month (current year)
node main.js summary --month "4"

# View summary
node main.js summary

# List all expenses
node main.js list
```

File Storage
All expenses are stored in expenses.json in the current directory. If the file does not exist, it will be created automatically on first use.

## Expense Data Structure

```json
{
  "id": 1,
  "amount": 500,
  "description": "Groceries",
  "date": "2025-04-25T00:00:00.000Z",
  "createdAt": "2025-04-25T10:00:00.000Z",
  "updatedAt": "2025-04-25T10:00:00.000Z"
}
```

## Error Handling

- Missing required options

- Invalid command usage

- Non-existent expense IDs

- File system errors
