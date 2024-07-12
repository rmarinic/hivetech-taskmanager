export interface Task {
    id?: number;
    title: string;
    description: string;
    status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
    createdAt: Date;
    dueDate: Date;
  }