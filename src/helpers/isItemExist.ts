export const isItemExist = (id: string, arr: any[]) => {
  return !!arr.find((elem: any) => elem.id === id);
};
