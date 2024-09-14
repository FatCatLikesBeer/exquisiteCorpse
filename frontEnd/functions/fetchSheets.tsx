import PocketBase from 'pocketbase';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;

const pb = new PocketBase(URL)

// Return an array of the 5 most recent pages
// Sheets are a finalFold and its ancestors
export const fetchSheets = async () => {
  const queryAnyFinalFold = await pb.collection('foldFinal').getList(1, 1, { sort: "@random" });
  const finalFoldDetail = await pb.collection('foldFinal').getOne(queryAnyFinalFold.items[0].id);
  const thirdFoldDetail = await pb.collection('foldThird').getOne(finalFoldDetail.parent);
  const secondFoldDetail = await pb.collection('foldSecond').getOne(thirdFoldDetail.parent);
  const firstFoldDetail = await pb.collection('foldFirst').getOne(secondFoldDetail.parent);
  const result = [firstFoldDetail, secondFoldDetail, thirdFoldDetail, finalFoldDetail];
  return result;
}
