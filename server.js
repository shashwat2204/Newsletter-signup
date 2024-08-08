const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newsletter', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const subscriberSchema = new mongoose.Schema({
    firstName: String,
    email: { type: String, required: true, unique: true }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Handle signup form submission
app.post('/signup', async (req, res) => {
    const { firstName, email } = req.body;

    try {
        const newSubscriber = new Subscriber({ firstName, email });
        await newSubscriber.save();
        console.log(`New signup: ${firstName}, ${email}`);
        res.json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error saving subscription:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
});

// Serve the home page
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Serve the index page (signup form page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

