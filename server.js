const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const budgetModel = require('./models/budget-schema');

let url = 'mongodb://localhost:27017/personal-budget';

app.use(express.json());
app.use('/', express.static('public'));

// const budget = {
//     myBudget: [
//         {
//             title: 'Eat out',
//             budget: 35
//         },
//         {
//             title: 'Rent',
//             budget: 375
//         },
//         {
//             title: 'Groceries',
//             budget: 110
//         },
//     ]
// };


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// app.get('/budget', (req, res) => {
//     fs.readFile('budget-data.json', (err, data) => {
//         if (err) throw err;
//         let budget = JSON.parse(data);
//         res.json(budget);
//     });
// });

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((connectionError) => {
        console.error('Could not connect to MongoDB...', connectionError);
    });

app.get('/budget', (req, res) => {
    budgetModel.find({})
        .then((expenses) => {
            res.json({ myBudget: expenses });
        })
        .catch((err) => {
            console.error('Error retrieving expenses...', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/budget', (req, res) => {
    const {title, budget, color} = req.body;
    const newExpense = new budgetModel({ title, budget, color });

    newExpense.save()
        .then((savedExpense) => {
            res.status(201).json(savedExpense);
        })
        .catch((saveError) => {
            console.error('Error saving expense...', saveError);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});