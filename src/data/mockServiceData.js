export const mockAppointments = [
  {
    id: 1,
    service: 'Refrigerator Repair',
    date: '2024-01-25',
    time: '10:00 AM',
    status: 'scheduled',
    technician: 'John Smith',
    address: '123 Main St, Miami, FL 33101',
    estimatedCost: '$150 - $300',
  },
  {
    id: 2,
    service: 'Washer Repair',
    date: '2024-01-15',
    time: '2:00 PM',
    status: 'completed',
    technician: 'Maria Garcia',
    address: '123 Main St, Miami, FL 33101',
    actualCost: '$200',
  },
  {
    id: 3,
    service: 'Dishwasher Maintenance',
    date: '2024-01-05',
    time: '9:00 AM',
    status: 'completed',
    technician: 'Mike Johnson',
    address: '123 Main St, Miami, FL 33101',
    actualCost: '$85',
  },
];

export const getAppointmentById = (id) => {
  return mockAppointments.find(apt => apt.id === id);
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#4CAF50';
    case 'scheduled':
      return '#2196F3';
    case 'cancelled':
      return '#f44336';
    default:
      return '#999';
  }
};

export const getStatusLabel = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
