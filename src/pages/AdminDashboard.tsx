import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  School,
  Building,
  UserCheck,
  LogOut,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Dashboard from "@/components/Dashboard";
import AccountManagement from "@/components/AccountManagement";
import CreditClassManagement from "@/components/CreditClassManagement";
import StudentEnrollment from "@/components/StudentEnrollment";
import TeacherManagement from "@/components/TeacherManagement";
import AdministrativeClassManagement from "@/components/AdministrativeClassManagement";
import SubjectManagement from "@/components/SubjectManagement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DepartmentManagement from "@/components/DepartmentManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [semester, setSemester] = useState("1");
  const academicYears = ["2022-2023", "2023-2024", "2024-2025", "2025-2026"];
  const semesters = ["1", "2", "Hè"];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại!",
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
              <h1 className="text-3xl font-bold text-gray-900">
                Hệ thống quản lý điểm sinh viên
              </h1>
              <p className="text-gray-600 mt-1">
                Học viện Công nghệ Bưu chính Viễn thông - Quản trị viên
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Năm học" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Học kỳ" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem === "1"
                        ? "Học kỳ 1"
                        : sem === "2"
                        ? "Học kỳ 2"
                        : "Học kỳ hè"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Xin chào, {currentUser.name}
                </span>
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
          <TabsList className="grid w-full grid-cols-8 bg-white shadow-sm">
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
            <TabsTrigger
              value="departments"
              className="flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              Khoa
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <School className="w-4 h-4" />
              Lớp HC
            </TabsTrigger>
            <TabsTrigger
              value="credit-classes"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Lớp TC
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Môn học
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountManagement />
          </TabsContent>

          <TabsContent value="students">
            <StudentEnrollment />
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherManagement />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentManagement />
          </TabsContent>

          <TabsContent value="classes">
            <AdministrativeClassManagement />
          </TabsContent>

          <TabsContent value="credit-classes">
            <CreditClassManagement />
          </TabsContent>

          <TabsContent value="subjects">
            <SubjectManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
