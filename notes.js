const fs = require('fs')
const chalk = require('chalk')

const log = console.log

const getNotes = () => {
  return 'Your Notes...'
}

const addNotes = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
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
  const noteExists = notes.some(note => note.title === title)

  if (notes.length > 0) {
    if (noteExists) {
      const notesRemaining = notes.filter(note => {
        return note.title !== title
      })
      saveNotes(notesRemaining)
      log(chalk.bgGreen('note removed!'))
    } else {
      log(chalk.bgRed('note does not exist'))
    }
  } else {
    log(chalk.bgred('there are no notes to remove'))
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

module.exports = { getNotes, addNotes, removeNote }
