// fetchPrompt
// Returns a writing prompt from the backend
// OR
// returns undefined, signaling the first fold of a new sheet

import PocketBase from 'pocketbase';
const foldCollections: Array<string> = [null, 'foldFirst', 'foldSecond', 'foldThird'];

export const fetchPrompt = async (pb: PocketBase) => {
  let result: any = { content: undefined };
  const userId: string = pb.authStore.model?.id || "";
  const foldSelector: number = Math.floor(Math.random() * 4);

  if (foldSelector != 0) {
    let query = await pb.collection(foldCollections[foldSelector]).getList(1, 1, { filter: `owner != "${userId}"`, sort: "@random", })
      .then((response) => { return response.items[0] });
    result.content = `...${query.content.slice(-100)}`;
  }
  return result;
}
