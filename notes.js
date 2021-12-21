const fs = require('fs')
const chalk = require('chalk')

const log = console.log

const addNotes = (title, body) => {
  const notes = loadNotes()
  const noteExists = notes.some(note => note.title === title)

  if (!noteExists) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    log(chalk.bgGreen('new note added'))
  } else {
    log(chalk.bgRed('note title taken'))
  }
}
const removeNote = title => {
  const notes = loadNotes()

  if (notes.length > 0) {
    const noteExists = notes.some(note => note.title === title)
    if (noteExists) {
      const notesRemaining = notes.filter(note => note.title !== title)
      saveNotes(notesRemaining)
      log(chalk.bgGreen('note removed!'))
    } else {
      log(chalk.bgRed('note does not exist'))
    }
  } else {
    log(chalk.bgRed('there are no notes to remove'))
  }
}
const listNotes = _ => {
  const notes = loadNotes()
  if (notes.length > 0) {
    log(chalk.green.bold('YOUR NOTES'))
    log('')
    notes.map(note => {
      log(chalk.yellow.bold('Title' + ': '), chalk.blue(note.title))
      log(chalk.yellow.bold('Body' + ': '), chalk.blue(note.body))
      log('')
    })
  } else {
    log(chalk.bgRed('there are no notes to list'))
  }
}
const readNote = title => {
  const notes = loadNotes()
  if (notes.length > 0) {
    const note = notes.find(note => note.title === title)
    if (note) {
      log(chalk.green.bold('YOUR NOTE'))
      log(chalk.yellow.bold('Title' + ': '), chalk.blue(note.title))
      log(chalk.yellow.bold('Body' + ': '), chalk.blue(note.body))
    } else {
      log(chalk.bgRed('note does not exist'))
    }
  } else {
    log(chalk.bgRed('there are no notes to list'))
  }
}

const saveNotes = notes => {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
  } catch (e) {
    return []
  }
}

module.exports = { addNotes, removeNote, listNotes, readNote }
