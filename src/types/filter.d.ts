declare type ShortHandEqualType = string | number | boolean | Date;

declare type AnyObject = Record<string, ShortHandEqualType>;

declare type Operators =
  'eq' |
  'neq' |
  'gt' |
  'gte' |
  'lt' |
  'lte' |
  'inq' |
  'nin' |
  'between' |
  'exists' |
  'and' |
  'or' |
  'like' |
  'nlike' |
  'ilike' |
  'nilike' |
  'regexp';

declare type PredicateComparison<PT> = {
  eq?: PT;
  neq?: PT;
  gt?: PT;
  gte?: PT;
  lt?: PT;
  lte?: PT;
  inq?: PT[];
  nin?: PT[];
  between?: [PT, PT];
  exists?: boolean;
  like?: PT;
  nlike?: PT;
  ilike?: PT;
  nilike?: PT;
  regexp?: string | RegExp;
};

declare type KeyOf<MT extends object> = Exclude<Extract<keyof MT, string>, Operators>;

declare type Condition<MT extends object> = {
  [P in KeyOf<MT>]?: PredicateComparison<MT[P]> | (MT[P] & ShortHandEqualType);
};

declare type Where<MT extends object = AnyObject> = Condition<MT> | AndClause<MT> | OrClause<MT>;

interface AndClause<MT extends object> {
  and: Where<MT>[];
}

interface OrClause<MT extends object> {
  or: Where<MT>[];
}

declare type Direction = 'ASC' | 'DESC';

declare type Order<MT = AnyObject> = {
  [P in keyof MT]: Direction;
};

declare type Fields<MT = AnyObject> = {
  [P in keyof MT]?: boolean;
} | Extract<keyof MT, string>[];

interface Inclusion {
  relation: string;
  scope?: Filter<AnyObject>;
}

declare interface Filter<MT extends object = AnyObject> {

  where?: Where<MT>;

  fields?: Fields<MT>;

  order?: string[];

  limit?: number;

  skip?: number;

  offset?: number;

  include?: InclusionFilter[];
}

declare type InclusionFilter = string | Inclusion;
