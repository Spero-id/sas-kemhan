export type ResponseAllLayout = {
  status: boolean;
  data: Layout[];
};

export type ResponseUserLayout = {
  status: boolean;
   data: {
    layout: UserLayout[];
  };
};


export type ResponseDetailLayout = {
  status: boolean;
  data: {
    data: LayoutEdit[];
    layout: Layout;
  };
};

export type ResponseUpdateLayout = {
  message: string;
};

export type Layout = Partial<{
  id: string;
  name: string;
  layout: string;
  created_at: string;
  updated_at: string;
}>;

export type UserLayout = Partial<{
  id: string;
  name: string;
}>;


export type LayoutEdit = Partial<{
  path_slug: string;
  name: string;
}>;