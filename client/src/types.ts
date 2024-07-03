/**
 * shape of the data that's sent to the backend
 */
export type WalkingDataPayload = {
  /**
   * how long you walked for, in seconds
   */
  duration: number;
  /**
   * how far you walked, in miles
   */
  distance: number;
  /**
   * _optional_ how many calories you burned
   */
  calories?: number;
  /**
   * _optional_ a note, if you'd like
   */
  note?: string;
};
