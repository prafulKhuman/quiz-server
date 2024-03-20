const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');


require("./Database/db");

const app = express();


const envPath = path.resolve(__dirname, '.env');

try {
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8').trim();

        if (!envContent) {
            console.error(`Error: ${envPath} is empty.`);
        } else {
            const envVariables = envContent?.split('\n').reduce((acc, line) => {
                if (!line.startsWith('#')) {
                    const [key, value] = line?.split('=');
                    if (key && value) {
                        acc[key.trim()] = value.trim();
                    }
                }
                return acc;
            }, {});
            Object.assign(process.env, envVariables);

        }
    } else {
        console.error(`Error: ${envPath} does not exist.`);
    }
} catch (err) {
    console.error('Error reading .env file:', err);
}



app.use(express.json());

app.use(cookieParser());
app.use(cors());

app.use('/graphql', (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (req.body && req.body.operationName && ['register' , 'adminlogin' , 'login'].includes(req.body.operationName.toLowerCase())) {
            return next();
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        const Auth = token.split('Bearer ')[1];
        const decoded = jwt.verify(Auth , process.env.SECRET_KEY);

        req.user = decoded;
        if (!decoded) {
            return res.status(401).json({ message: error.message });
        }
        next();

        return decoded;
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
});



app.use('/graphql', graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true,
    context: { user: req.user || null }
})));



app.listen(3000, () => {
    console.log('now listening for requests on port 3000');
});







