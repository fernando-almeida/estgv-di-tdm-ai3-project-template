import app from '@server';
import { logger } from '@shared';

var cors = require('cors');

// Start the server
const port = Number(process.env.PORT || 3000);

app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
