export interface User {
    username: string;
    password: string;
    email?: string;  // Email je opcionalan jer nije potreban za login
  }