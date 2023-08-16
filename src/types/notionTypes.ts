export type NotionCardType = {
  role: string;
  date: Omit<Date2, 'time_zone'>;
  title: string;
};

export type ResponseNotionType = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: string | null;
  icon: string | null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: string;
  developer_survey: string;
};

export type CreatedBy = {
  object: string;
  id: string;
};

export type LastEditedBy = {
  object: string;
  id: string;
};

export type Parent = {
  type: string;
  database_id: string;
};

export type Properties = {
  Role: Role;
  Date: Date;
  Assign: Assign;
  Status: Status;
  Name: Name;
};

export type Role = {
  id: string;
  type: string;
  rich_text: RichText[];
};

export type RichText = {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};

export type Text = {
  content: string;
  link: string | null;
};

export type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

export type Date = {
  id: string;
  type: string;
  date: Date2;
};

export type Date2 = {
  start: string;
  end: string | null;
  time_zone: string | null;
};

export type Assign = {
  id: string;
  type: string;
  people: string[];
};

export type Status = {
  id: string;
  type: string;
  status: Status2;
};

export type Status2 = {
  id: string;
  name: string;
  color: string;
};

export type Name = {
  id: string;
  type: string;
  title: Title[];
};

export type Title = {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: string | null;
};

export type Text2 = {
  content: string;
  link: string | null;
};

export type Annotations2 = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

export interface RequestNotionType {
  parent: Parent;
  properties: Pick<Properties, 'Name' | 'Date' | 'Role'>;
}
