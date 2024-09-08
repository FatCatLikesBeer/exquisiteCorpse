// Return an array of folds where fold.owner == requester's id
export const fetchUsersFolds = async (pb) => {
  let result = [];
  result.push(...await pb.collection('foldFirst').getFullList());
  result.push(...await pb.collection('foldSecond').getFullList());
  result.push(...await pb.collection('foldThird').getFullList());
  result.push(...await pb.collection('foldFinal').getFullList());
  return result;
}
