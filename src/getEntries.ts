import { isNull } from 'option-t/lib/Nullable/Nullable';
import { EntryContext } from './entryContext';
import { EntryValue } from './entryValue';

export async function getEntries(context: EntryContext): Promise<EntryValue[]> {
  const { gateway: entryGateway, store: entryStore } = context;

  let entries = entryStore.getEntries();

  if (isNull(entries)) {
    try {
      entries = await entryGateway.fetchAllEntries();
    } catch (err) {
      throw new Error(err);
    }
  }

  return entries;
}
