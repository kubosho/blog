import { isNull } from 'option-t/lib/Nullable/Nullable';
import { EntryContext } from './entryContext';

export async function getEntries(context: EntryContext): Promise<void> {
  const { gateway: entryGateway, store: entryStore } = context;

  let entries = entryStore.getEntries();

  if (isNull(entries)) {
    try {
      entries = await entryGateway.fetchAllEntries();
      entryStore.setEntries(entries);
    } catch (err) {
      throw new Error(err);
    }
  }
}
