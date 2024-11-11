require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 4001;

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI, { 
     useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
.then( () => {
    console.log('Connected to MongoDB');
})
.catch( (err) => {
    console.error ('Error Connecting to DB', err);
});


// Person Schema

const personSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFoods: [String]
});             

const Person = mongoose.model('Person', personSchema);   

// creating a Person       
const person = new Person({
    name: 'Aïssatou',
    age: 21,
    favoriteFoods: ['chicken', 'rice', 'cake']
});

// Create and Save a Record of a Model 

person
    .save()
    .then(() => {
        console.log('Person added successfully.');
    })
    .catch((err) => {
        console.error(err);
    });

    //creating an array of Persons   
    const arrayOfPeople = [
        { name: 'Aïssatou', age: 21, favoriteFoods: ['chicken', 'rice', 'cake'] },
        { name: 'Moussa', age: 30, favoriteFoods: ['rice', 'pasta', 'pancakes'] },
        { name: 'Asma Dial', age: 20, favoriteFoods: ['Yassa', 'ice cream'] }
    ];
    

    Person
    .insertMany(arrayOfPeople)
    .then(() => {
        console.log('People added successfully.');
    })              
    .catch((err) => {
        console.error(err);
    });

    //Getting Persons
    Person
    .find()
    .then((docs) => {            
        console.log('People Found', docs);
    })
    .catch((err) => {
        console.error(err);
    }); 

    //Getting a Person by favorite food "rice"
    Person
    .findOne({ favoriteFoods: { $in: ['rice'] } })   
    .then((doc) => {
        console.log('Person Found', doc);
    })
    .catch((err) => {
        console.error(err);
    });     
    
    //Getting a Person by ID
    const idUser = '5f7b3b3b7b3b3b3b3b3b3b3b';  
              
    Person
    .findById(idUser)     
    .then((doc) => {
        console.log('Person Found:', doc);
    })                  
    .catch((err) => {
        console.error(err);
    });             
    
    //Search a person by ID and add a new favorite food 
const id = '5f7b3b3b7b3b3b3b3b3b3b3';

    Person
    .findById(id)
    .then((doc) => {
        doc.favoriteFoods.push('pizza');
        doc.save();
        console.log(doc);
    })
    .catch((err) => {                  
        console.error(err);
    });

    //Find a person by name and update the age
    Person
    .findOneAndUpdate({ name: 'Aïssatou' }, { age: 22 }, { new: true })       
    .then((doc) => {
        console.log('Age updated', doc);
    })         
    .catch((err) => {
        console.error(err);
    });             
    
    //Delete person by ID
const idDel = '5f7b3b3b7b3b3b3b3b3b3b3';

    Person
    .findByIdAndRemove(idDel)               
    .then ((doc) => {                 
        console.log('Person with ID ${idDel} has been delected.', doc);
    })  
    .catch((err) => {
        console.error(err);
    });

    //Delete person with name "Fatou"

    Person
    .deleteMany({ name: 'Asma Dial' })
    .then((doc) => {
        console.log('Asma Dial successfully deleted.');
    })
    .catch((err) => {           
        console.error(err);
    });

    //Finding people who like ice cream
    Person
        .find({ favoriteFoods: { $in: ['ice cream'] } })    
        .sort('name')
        .limit(2)
        .select()
        .then((docs) => {
            console.log('People who like ice cream', docs);
        })
        .catch((err) => {
            console.error(err);
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        