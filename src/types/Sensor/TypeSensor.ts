export type Sensor = {
  user_id: string;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type ResponseAllSensor = {
  status: boolean;
  data: Sensor[];
}