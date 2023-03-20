export type School = {
  /** Unique identifier of the school */
  id: string;
  /** Name of the school */
  name: string;
};

export type SchoolList = School[];

export type SchoolInput = {
  /** New or updated name of the school */
  name: string;
};
