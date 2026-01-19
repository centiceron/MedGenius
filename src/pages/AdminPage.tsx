import React, { useState } from 'react';
import { 
  Users, 
  UserCog, 
  Activity, 
  Settings, 
  Shield,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';

const mockUsers = [
  { id: 1, name: 'Dr. Sarah Johnson', role: 'Doctor', email: 'sarah.j@healthcare.com', status: 'active', patients: 45 },
  { id: 2, name: 'Mike Chen', role: 'Patient', email: 'mike.chen@email.com', status: 'active', lastVisit: '2024-01-15' },
  { id: 3, name: 'Central Pharmacy', role: 'Pharmacy', email: 'contact@centralpharm.com', status: 'active', medicines: 1200 },
  { id: 4, name: 'Dr. Emily Rodriguez', role: 'Doctor', email: 'emily.r@healthcare.com', status: 'inactive', patients: 32 },
  { id: 5, name: 'Lisa Thompson', role: 'Patient', email: 'lisa.t@email.com', status: 'active', lastVisit: '2024-01-20' },
];

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const stats = [
    { title: 'Total Users', value: '1,247', icon: Users, color: 'primary' },
    { title: 'Active Doctors', value: '89', icon: UserCog, color: 'success' },
    { title: 'System Health', value: '99.9%', icon: Activity, color: 'accent' },
    { title: 'Security Score', value: 'A+', icon: Shield, color: 'warning' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />
      
      <div className="container max-w-screen-2xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, system settings, and monitor platform health</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-gradient-card shadow-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Management */}
        <Card className="bg-gradient-card shadow-medical border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-semibold">User Management</CardTitle>
              <Button variant="medical" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="all">All Roles</option>
                  <option value="doctor">Doctors</option>
                  <option value="patient">Patients</option>
                  <option value="pharmacy">Pharmacies</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Name</th>
                    <th className="text-left p-4 font-semibold text-foreground">Role</th>
                    <th className="text-left p-4 font-semibold text-foreground">Email</th>
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-foreground">Details</th>
                    <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-foreground">{user.name}</div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={user.role === 'Doctor' ? 'default' : user.role === 'Patient' ? 'secondary' : 'outline'}
                          className="capitalize"
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-muted-foreground">{user.email}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground">
                          {user.role === 'Doctor' && `${user.patients} patients`}
                          {user.role === 'Patient' && `Last visit: ${user.lastVisit}`}
                          {user.role === 'Pharmacy' && `${user.medicines} medicines`}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">System Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure platform settings</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Open Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <Activity className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">System Monitor</h3>
                  <p className="text-sm text-muted-foreground">View system performance</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Metrics
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Security Center</h3>
                  <p className="text-sm text-muted-foreground">Manage security settings</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Security Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;