'use strict'

const cron = require('node-schedule');
const { build } = require('../src/app');
const app = build();
const log = require('../src/utils/logUtils');
const CRON = process.env.CRON || '*/5 * * * *';

const runCron = () => {
    return cron.scheduleJob(CRON, () => {
        callProcessarFila().then(r => log.info('Fila de cobranças processada')).catch(err => console.log(err));
    });
};

const callProcessarFila = async () => {
    return await app.inject({
        method: 'POST',
        url: '/processaCobrancasEmFila'
    })
};


module.exports = { runCron };
