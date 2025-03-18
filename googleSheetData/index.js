const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Jithin:jithin@cluster0.sjnsmvz.mongodb.net/stock_price', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const stockSchema = new mongoose.Schema({
    _id: String,
    symbol: String,
    date: String,
    closing_price: Number
});

const Stock = mongoose.model('stock_details', stockSchema);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1qHbAFcqBpZfUqv6lSSV5fx5jJFveuzW4yaeQVvs9xws',
        // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Sheet1!A1:AE366',
    });

    fs.writeFile('response.json', JSON.stringify(res.data.values))
    const rows = res.data.values;
    const headers = rows[0].slice(1); // Remove 'Date' and keep stock symbols
    const formattedData = [];

    for (let i = 1; i < rows.length; i++) {
        const date = rows[i][0]; // Get the date
        for (let j = 1; j < rows[i].length; j++) {
            const closingPrice = parseFloat(rows[i][j]);

            // Ensure closing_price is a valid number before inserting
            if (!isNaN(closingPrice)) {
                formattedData.push({
                    symbol: headers[j - 1].replace("NSE:", ""), // Remove 'NSE:' prefix
                    date: date,
                    closing_price: closingPrice
                });
            } else {
                console.warn(`Skipping invalid closing price for symbol ${headers[j - 1]} on date ${date}`);
            }
        }
    }

    if (formattedData.length > 0) {
        await Stock.insertMany(formattedData);
        console.log("Data inserted successfully!");
    } else {
        console.warn("No valid data to insert.");
    }

    //   const rows = res.data.values;
    //   if (!rows || rows.length === 0) {
    //     console.log('No data found.');
    //     return;
    //   }
    //   console.log('Name, Major:');
    //   rows.forEach((row) => {
    //     // Print columns A and E, which correspond to indices 0 and 4.
    //     console.log(`${row[0]}, ${row[4]}`);
    //   });
}

authorize().then(listMajors).catch(console.error);