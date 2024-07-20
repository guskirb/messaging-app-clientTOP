export type Credentials = {
  data: {
    username: string;
    password: string;
  };
};

export type User = {
  id: string;
  _id: string;
  join_date: string;
  last_online: string;
  last_online_formatted: string;
  username: string;
  friend_count: number;
  image: string;
};

export type Chatroom = {
  id: string;
  _id: string;
  last_active: string;
  last_active_formatted: string;
  pinned: boolean;
  users: Array<User>;
  name?: string;
  last_message: string;
};

export type Message = {
  id: string;
  _id: string;
  date: string;
  date_formatted: {
    date: string;
    time: string;
  };
  message: string;
  user: User;
  image: string;
};
