export type People = {
  id: number;
  device_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  data: {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    temperature: number;
    humidity: number;
    pressure: number;
    altitude: number;
    created_at: string;
    updated_at: string;
  }
};

export type ResponseAllPeople = People[];