import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap, TrendingUp, School, Building, UserCheck, LogOut, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Dashboard from "@/components/Dashboard";
import AccountManagement from "@/components/AccountManagement";
import CreditClassManagement from "@/components/CreditClassManagement";
import StudentEnrollment from "@/components/StudentEnrollment";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại!"
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hệ thống quản lý điểm sinh viên</h1>
              <p className="text-gray-600 mt-1">Học viện Công nghệ Bưu chính Viễn thông - Quản trị viên</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1">
                Năm học 2024-2025
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Học kỳ 1
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Xin chào, {currentUser.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Sinh viên
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Giảng viên
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Khoa
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <School className="w-4 h-4" />
              Lớp HC
            </TabsTrigger>
            <TabsTrigger value="credit-classes" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Lớp TC
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Môn học
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Điểm số
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>

          <TabsContent value="credit-classes">
            <CreditClassManagement />
          </TabsContent>

          {/* Other tabs will be implemented as separate components */}
          <TabsContent value="students">
            <StudentEnrollment />
          </TabsContent>

          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý giảng viên</CardTitle>
                <CardDescription>Chức năng này sẽ được triển khai sau</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý khoa</CardTitle>
                <CardDescription>Chức năng này sẽ được triển khai sau</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý lớp hành chính</CardTitle>
                <CardDescription>Chức năng này sẽ được triển khai sau</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý môn học</CardTitle>
                <CardDescription>Chức năng này sẽ được triển khai sau</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý điểm số</CardTitle>
                <CardDescription>Chức năng này sẽ được triển khai sau</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
