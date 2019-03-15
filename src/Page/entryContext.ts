import { config as dotenvConfig } from 'dotenv';
import { createContentfulClient } from '../contentfulClient';
import { createMemoization } from '../Application/memoization';
import { createEntryGateway } from '../Entry/entryGateway';

dotenvConfig();

const client = createContentfulClient(process.env.SPACE, process.env.ACCESS_TOKEN);
const memoize = createMemoization();

export const entryGateway = createEntryGateway(client, memoize);
