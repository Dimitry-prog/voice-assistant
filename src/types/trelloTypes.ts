export type TrelloCard = {
  id: string;
};
export type LabelsIds = {
  [role: string]: string;
};
export type LabelType = {
  id: string;
  idBoard: string;
  color: string;
  name: string;
  uses: number;
};
export type ListType = {
  closed: boolean;
  id: string;
  idBoard: string;
  name: string;
  pos: number;
  softLimit: null;
  status: null;
  subscribed: boolean;
};
