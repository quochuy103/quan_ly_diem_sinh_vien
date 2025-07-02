
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, LogOut, BookOpen, Bell } from "lucide-react";
import SubjectDetailDialog from "@/components/SubjectDetailDialog";
import NotificationPopup from "@/components/NotificationPopup";

const mockStudentData = {
  profile: {
    id: "B24DCCC016",
    name: "Nguyễn Đức Anh",
    class: "CNTT01",
    major: "Công nghệ thông tin",
    email: "anh.nd@student.ptit.edu.vn"
  },
  grades: [
    { id: 1, subjectName: "Cơ sở dữ liệu", score: 8.5, credits: 3, semester: "HK1", year: "2024-2025" },
    { id: 2, subjectName: "Lập trình hướng đối tượng", score: 8.0, credits: 4, semester: "HK1", year: "2024-2025" },
    { id: 3, subjectName: "Cấu trúc dữ liệu", score: 7.5, credits: 4, semester: "HK1", year: "2024-2025" }
  ],
  notifications: [
    { id: 1, title: "Thông báo điểm giữa kỳ", content: "Điểm giữa kỳ môn Cơ sở dữ liệu đã được cập nhật", date: "20/12/2024", read: false },
    { id: 2, title: "Lịch thi cuối kỳ", content: "Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công bố", date: "18/12/2024", read: true }
  ]
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockStudentData.notifications);
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedSemester, setSelectedSemester] = useState("HK1");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại!"
    });
    navigate("/login");
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setIsDetailDialogOpen(true);
  };

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    toast({
      title: "Đã đánh dấu đã đọc",
      description: "Thông báo đã được đánh dấu là đã đọc"
    });
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    toast({
      title: "Đã thay đổi năm học",
      description: `Năm học hiện tại: ${year}`
    });
  };

  const handleSemesterChange = (semester: string) => {
    setSelectedSemester(semester);
    toast({
      title: "Đã thay đổi học kỳ",
      description: `Học kỳ hiện tại: ${semester}`
    });
  };

  const totalCredits = mockStudentData.grades.reduce((sum, grade) => sum + grade.credits, 0);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hệ thống quản lý điểm sinh viên</h1>
              <p className="text-gray-600 mt-1">Học viện Công nghệ Bưu chính Viễn thông - Sinh viên</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Select value={selectedYear} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSemester} onValueChange={handleSemesterChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HK1">HK1</SelectItem>
                    <SelectItem value="HK2">HK2</SelectItem>
                    <SelectItem value="HK3">HK3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsNotificationOpen(true)}
                  className="relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 text-xs p-0 flex items-center justify-center">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
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
        <div className="space-y-6">
          {/* Profile and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Mã sinh viên:</span> {mockStudentData.profile.id}</p>
                  <p><span className="font-medium">Họ tên:</span> {mockStudentData.profile.name}</p>
                  <p><span className="font-medium">Lớp:</span> {mockStudentData.profile.class}</p>
                  <p><span className="font-medium">Ngành:</span> {mockStudentData.profile.major}</p>
                  <p><span className="font-medium">Email:</span> {mockStudentData.profile.email}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng tín chỉ đã học</CardTitle>
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
              <CardDescription>Click vào môn học để xem chi tiết điểm số</CardDescription>
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
                  </TableHead>
                  <TableBody>
                    {mockStudentData.grades.map(grade => (
                      <TableRow 
                        key={grade.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSubjectClick(grade)}
                      >
                        <TableCell className="font-medium">{grade.subjectName}</TableCell>
                        <TableCell>{grade.credits}</TableCell>
                        <TableCell>
                          <Badge variant={grade.score >= 8 ? "default" : grade.score >= 6.5 ? "secondary" : "destructive"}>
                            {grade.score}
                          </Badge>
                        </TableCell>
                        <TableCell>{grade.semester}</TableCell>
                        <TableCell>{grade.year}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {grade.score >= 8.5 ? "Giỏi" : 
                             grade.score >= 7 ? "Khá" : 
                             grade.score >= 5.5 ? "Trung bình" : "Yếu"}
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

      <NotificationPopup
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default StudentDashboard;
