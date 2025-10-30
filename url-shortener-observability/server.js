const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor, ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const express = require('express');
const logger = require('./logger');

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

logger.info('Tracing initialized');


const {client, httpRequestDurationMicroseconds, httpRequestsTotal} = require('./metrics');

const app = express();
const urlMap = new Map();

app.use(express.json());

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.post('/shorten', (req, res) => {
    const endTimer = httpRequestDurationMicroseconds.startTimer();
    const { longUrl } = req.body;
    const shortCode = Math.random().toString(36).substring(2, 8);
    urlMap.set(shortCode, longUrl);
    logger.info('URL shortened successfully', { shortCode, longUrl });
    httpRequestsTotal.inc({ method: 'POST', route: '/shorten', status_code: 200 });
    endTimer({ method: 'POST', route: '/shorten', code: 200 });
    res.json({ shortCode, longUrl });
});

app.get('/:shortCode', (req, res) => {
    const endTimer = httpRequestDurationMicroseconds.startTimer();
    const { shortCode } = req.params;
    const longUrl = urlMap.get(shortCode);

    if (!longUrl) {
        logger.warn('Attempted access with invalid shortcode', { shortCode, ip: req.ip });
        httpRequestsTotal.inc({ method: 'GET', route: '/:shortCode', status_code: 404 });
        endTimer({ method: 'GET', route: '/:shortCode', code: 404 });
        return res.status(404).send('URL not found');
    }

    logger.info('Redirecting user', { shortCode, longUrl });
    httpRequestsTotal.inc({ method: 'GET', route: '/:shortCode', status_code: 302 });
    endTimer({ method: 'GET', route: '/:shortCode', code: 302 });
    res.redirect(302, longUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`URL Shortener service running on port ${PORT}`);
});