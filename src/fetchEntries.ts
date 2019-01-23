import { EntriesGateway } from './entriesGateway';
import { EntryValue } from './entryValue';
import { createContentfulClient } from './contentfulClient';

export async function fetchEntries(): Promise<EntryValue[]> {
  const client = createContentfulClient(process.env.SPACE, process.env.ACCESS_TOKEN);
  const gateway = new EntriesGateway(client);

  let entries = null;

  try {
    entries = await gateway.fetch();
  } catch (err) {
    throw new Error(err);
  }

  return entries;
}
