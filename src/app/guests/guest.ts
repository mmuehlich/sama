export class Guest {
  greeting: string;
  name: string;
  adults: Adult[];
  children: Child[];
  civil: boolean;
  state: string;
  loginToken: string;
  address?: string;
  remarks?: number;
  id?: string;
}

export class Adult {
  name: string;
  email?: string;
  phone?: string
}

export class Child {
  name: string;
}