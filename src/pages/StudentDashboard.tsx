import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  LogOut,
  BookOpen,
  TrendingUp,
  Bell,
} from "lucide-react";
import SubjectDetailDialog from "@/components/SubjectDetailDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockStudentData = {
  profile: {
    id: "B24DCCC016",
    name: "Nguyễn Đức Anh",
    class: "CNTT01",
    major: "Công nghệ thông tin",
    email: "anh.nd@student.ptit.edu.vn",
  },
  grades: [
    {
      id: 1,
      subjectName: "Cơ sở dữ liệu",
      score: 8.5,
      credits: 3,
      semester: "HK1",
      year: "2024-2025",
    },
    {
      id: 2,
      subjectName: "Lập trình hướng đối tượng",
      score: 8.0,
      credits: 4,
      semester: "HK1",
      year: "2024-2025",
    },
    {
      id: 3,
      subjectName: "Cấu trúc dữ liệu",
      score: 7.5,
      credits: 4,
      semester: "HK1",
      year: "2024-2025",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Thông báo điểm giữa kỳ",
      content: "Điểm giữa kỳ môn Cơ sở dữ liệu đã được cập nhật",
      date: "20/12/2024",
      read: false,
    },
    {
      id: 2,
      title: "Lịch thi cuối kỳ",
      content: "Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công bố",
      date: "18/12/2024",
      read: true,
    },
  ],
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [semester, setSemester] = useState("1");
  const academicYears = ["2022-2023", "2023-2024", "2024-2025", "2025-2026"];
  const semesters = ["1", "2", "Hè"];
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại!",
    });
    navigate("/login");
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setIsDetailDialogOpen(true);
  };

  const totalCredits = mockStudentData.grades.reduce(
    (sum, grade) => sum + grade.credits,
    0
  );
  const unreadNotifications = mockStudentData.notifications.filter(
    (n) => !n.read
  ).length;

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
                Học viện Công nghệ Bưu chính Viễn thông - Sinh viên
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
              <span className="text-sm text-gray-600">
                Xin chào, {currentUser.name}
              </span>
              <div className="flex items-center space-x-2">
                <Dialog
                  open={isNotificationDialogOpen}
                  onOpenChange={setIsNotificationDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Thông báo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {mockStudentData.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            !notification.read
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4
                                className={`font-medium ${
                                  !notification.read
                                    ? "text-blue-900"
                                    : "text-gray-900"
                                }`}
                              >
                                {notification.title}
                                {!notification.read && (
                                  <Badge
                                    variant="destructive"
                                    className="ml-2 text-xs"
                                  >
                                    Mới
                                  </Badge>
                                )}
                              </h4>
                              <p
                                className={`text-sm mt-1 ${
                                  !notification.read
                                    ? "text-blue-700"
                                    : "text-gray-600"
                                }`}
                              >
                                {notification.content}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
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
        <div className="space-y-6">
          {/* Profile and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Mã sinh viên:</span>{" "}
                    {mockStudentData.profile.id}
                  </p>
                  <p>
                    <span className="font-medium">Họ tên:</span>{" "}
                    {mockStudentData.profile.name}
                  </p>
                  <p>
                    <span className="font-medium">Lớp:</span>{" "}
                    {mockStudentData.profile.class}
                  </p>
                  <p>
                    <span className="font-medium">Ngành:</span>{" "}
                    {mockStudentData.profile.major}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {mockStudentData.profile.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng tín chỉ đã học
                </CardTitle>
                <BookOpen className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCredits}</div>
                <p className="text-xs text-blue-100">Tín chỉ tích lũy</p>
              </CardContent>
            </Card>
          </div>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bảng điểm</CardTitle>
              <CardDescription>
                Click vào môn học để xem chi tiết điểm số
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Môn học</TableHead>
                      <TableHead>Số tín chỉ</TableHead>
                      <TableHead>Điểm</TableHead>
                      <TableHead>Học kỳ</TableHead>
                      <TableHead>Năm học</TableHead>
                      <TableHead>Xếp loại</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudentData.grades.map((grade) => (
                      <TableRow
                        key={grade.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSubjectClick(grade)}
                      >
                        <TableCell className="font-medium">
                          {grade.subjectName}
                        </TableCell>
                        <TableCell>{grade.credits}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              grade.score >= 8
                                ? "default"
                                : grade.score >= 6.5
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {grade.score}
                          </Badge>
                        </TableCell>
                        <TableCell>{grade.semester}</TableCell>
                        <TableCell>{grade.year}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {grade.score >= 8.5
                              ? "Giỏi"
                              : grade.score >= 7
                              ? "Khá"
                              : grade.score >= 5.5
                              ? "Trung bình"
                              : "Yếu"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SubjectDetailDialog
        subject={selectedSubject}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;
