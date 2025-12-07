const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MAP_EMBED_URL =
    process.env.MAP_EMBED_URL ||
    'https://www.arcgis.com/apps/Embed/index.html?webmap=1b0b4b00f5f942b0b0cbb05916dc8bc4&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=dark';

// Serve static assets (images, styles) from /static
app.use('/static', express.static(path.join(__dirname, 'static')));

// Configure Nunjucks to use the template directory
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'template'), {
    autoescape: true,
    express: app,
    noCache: true,
});

const render = (view, data = {}) => (req, res) => res.render(view, data);

app.get('/', render('index.html'));
app.get('/segregation-redlining', render('segregation.html'));
app.get('/chevron-history', render('history.html'));
app.get('/health-impacts', render('health.html'));
app.get('/community-resistance', render('resistance.html'));
app.get('/maps', render('maps.html', { map_embed_url: MAP_EMBED_URL }));
app.get('/timeline', render('timeline.html'));
app.get('/voices', render('voices.html'));
app.get('/resources', render('resources.html'));
app.get('/policies', render('policies.html'));
app.get('/methods', render('methods.html'));
app.get('/on-campus-resources', render('campus.html'));

// Simple 404 handler
app.use((req, res) => res.status(404).send('Page not found'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
