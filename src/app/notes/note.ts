export class SimpleNote {
  state: string;
  priority: string;
  title: string;
  content: any[];
}

export class Note {
  topic: string;
  priority: string;
  notes: SimpleNote[];
  id?: any;
}