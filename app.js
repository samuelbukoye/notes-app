// const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

const log = console.log

// create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.addNotes(argv.title, argv.body)
  }
})
// create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a  note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.removeNote(argv.title)
  }
})

// create list command
yargs.command({
  command: 'list',
  describe: 'list notes',
  handler () {
    notes.listNotes()
  }
})
// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler (argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse()
