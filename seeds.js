// const mongoose = require("mongoose");
// const express = require("express");
// const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const db = require("./config/keys").mongoURI;

async function seedDB() {
    const uri = db;

    const client = new MongoClient(uri, {
        useNewUrlParser: true
    });

    try {
        await client.connect();
        console.log('connected to the server');

        const collection = client.db('myFirstDatabase').collection('questions');

        // client.db('myFirstDatabase').collection('users').drop();
        collection.drop();

        let questionData = [
            {
                question: 'New Artists or Top 100',
                targetCategory: 'popularity',
                answerOptions: [
                    {
                        answerText: 'New Artists',
                        answerValue: 0
                    },
                    {
                        answerText: 'Top 100',
                        answerValue: 1
                    },
                ]
            },
            {
                question: 'Chill bar or Nightclub?',
                targetCategory: 'danceability',
                answerOptions: [
                    {
                        answerText: 'Chill Bar',
                        answerValue: 0
                    },
                    {
                        answerText: 'Nightclub',
                        answerValue: 1
                    },
                ]
            },
            {
                question: 'In the morning, hit the snooze button or hit the gym?',
                targetCategory: 'energy',
                answerOptions: [
                    {
                        answerText: 'Snooze button',
                        answerValue: 0
                    },
                    {
                        answerText: 'Hit the gym',
                        answerValue: 1
                    },
                ]
            },
            {
                question: 'Broadway or Concert?',
                targetCategory: 'instrumentalness',
                answerOptions: [
                    {
                        answerText: 'Broadway',
                        answerValue: 0
                    },
                    {
                        answerText: 'Concert',
                        answerValue: 1
                    },
                ]
            },
            {
                question: 'Short stories or Novels?',
                targetCategory: 'duration',
                answerOptions: [
                    {
                        answerText: 'Short stories',
                        answerValue: 0
                    },
                    {
                        answerText: 'Novels',
                        answerValue: 1
                    },
                ]
            },
            {
                question: 'How many sweaters do you own?',
                targetCategory: 'acousticness',
                answerOptions: [
                    {
                        answerText: 'Less than 3',
                        answerValue: 0
                    },
                    {
                        answerText: 'I only wear sweaters',
                        answerValue: 1
                    },
                ]
            },
            
        ];

        collection.insertMany(questionData).then(res => client.close()).catch(err => console.log(err));

        console.log('Database seeded!');

        // client.close();
    } catch (err) {
        console.log(err.stack);
    }
};

module.exports = seedDB;