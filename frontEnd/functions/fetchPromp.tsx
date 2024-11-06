// Return an object whos contents are from a fold or an object whos content property is undefined

export const fetchPrompt = async (pb) => {
  let result: any = { content: undefined }
  const rng = Math.floor(Math.random() * 4);
  switch (rng) {
    case 0:
      break;
    case 1:
      result = await pb.collection('foldFirst').getList(1, 1, { sort: "@random" })
        .then((response) => { return response.items[0] });
      break;
    case 2:
      result = await pb.collection('foldSecond').getList(1, 1, { sort: "@random" })
        .then((response) => { return response.items[0] });
      break;
    case 3:
      result = await pb.collection('foldThird').getList(1, 1, { sort: "@random" })
        .then((response) => { return response.items[0] });
      break;
    default:
      break;
  }
  if (result.content != undefined) {
    result.content = `...${result.content.slice(-100)}`;
  }
  return result;
}
