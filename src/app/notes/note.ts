export class SimpleNote {
  topic: string;
  state: string;
  priority: string;
  title: string;
  content: any[];
  id?: any;
}

export class Note {
  topic: string;
  notes: SimpleNote[];
  id?: any;
}