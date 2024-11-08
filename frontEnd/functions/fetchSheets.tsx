import PocketBase from 'pocketbase';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;

const pb = new PocketBase(URL)

// Return an array of the 5 most recent pages
// Sheets are a finalFold and its ancestors
export const fetchSheets = async () => {
  const queryAnyFinalFold = await pb.collection('foldFinal').getList(1, 1, { sort: "@random", expand: "parent.parent.parent" });
  const firstFoldDetail = queryAnyFinalFold.items[0].expand.parent.expand.parent.expand.parent;
  const secondFoldDetail = queryAnyFinalFold.items[0].expand.parent.expand.parent;
  const thirdFoldDetail = queryAnyFinalFold.items[0].expand.parent;
  const finalFoldDetail = queryAnyFinalFold.items[0];
  const result = [firstFoldDetail, secondFoldDetail, thirdFoldDetail, finalFoldDetail];
  result.forEach((elem) => { delete elem.expand });
  result.forEach((elem, index) => {
    console.log(`Sheet no. ${index}`, elem);
  });
  return result;
}
