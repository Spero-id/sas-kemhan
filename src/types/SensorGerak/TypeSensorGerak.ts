export type SensorGerak = {
  user_id: string;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type ResponseAllSensorGerak = {
  status: boolean;
  data: SensorGerak[];
}