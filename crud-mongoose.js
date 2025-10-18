const mongoose = require('mongoose');
const budgetModel = require('./models/budget-schema');

let url = 'mongodb://localhost:27017/personal-budget';

mongoose.connect(url)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        const myBudget = [
            {
                title: "Eat out",
                budget: 50,
                color: "#ffcd56"
            },
            {
                title: "Rent",
                budget: 750,
                color: "#ff6384"
            },
            {
                title: "Groceries",
                budget: 110,
                color: "#36a2eb"
            },
            {
                title: "Gas",
                budget: 80,
                color: "#fd6b19"
            },
            {
                title: "Utilities",
                budget: 90,
                color: "#ffcd56"
            },
            {
                title: "Gym Membership",
                budget: 70,
                color: "#ff6384"
            },
            {
                title: "Savings",
                budget: 200,
                color: "#36a2eb"
            }
        ];

        budgetModel.insertMany(myBudget)
            .then(() => {
                console.log('✅ Data inserted successfully');
                mongoose.connection.close();
            })
            .catch((insertError) => {
                console.error('❌ Error inserting data...', insertError);
            });

    })
    .catch((connectionError) => {
        console.error('Could not connect to MongoDB...', connectionError);
    });