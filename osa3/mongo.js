const mongoose = require('mongoose')

/* if ( process.argv.length<5 ) {
  console.log('give more words')
  process.exit(1)
} */

console.log('----------------------------------------------------')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://jhiekkap:${password}@jarinklusteri-pnulk.mongodb.net/persons?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log("puhelinluettelo:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name}: ${person.number} `)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  console.log('password: ', password)
  console.log('name: ', name)
  console.log('number: ', number)


  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    console.log(`lisättiin ${name} numero ${number} luetteloon`)
    mongoose.connection.close()
  })
}





//jhiekkap vanha


