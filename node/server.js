import makeApp from './app.js';
import * as database from './database.js';

const app = makeApp(database);

app.listen(4200);

