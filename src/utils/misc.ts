export const stringifyArray = (arr: any[]) => {
  return arr.map(item => typeof item === 'string' ? item : JSON.stringify(item));
}

export const formatUserIDsForCreation = (user_ids: string[]) => {
  return user_ids.map(item => {return {id: item}});
}
