import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, LogOut, Bell, User, GraduationCap, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SubjectDetailDialog from "@/components/SubjectDetailDialog";
import NotificationPopup from "@/components/NotificationPopup";

const mockNotifications = [
  {
    id: 1,
    title: "Thông báo về lịch thi cuối kỳ",
    content: "Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được cập nhật. Sinh viên vui lòng kiểm tra lịch thi của mình.",
    date: "2024-01-15",
    read: false
  },
  {
    id: 2,
    title: "Nghỉ lễ Tết Nguyên Đán",
    content: "Trường thông báo lịch nghỉ Tết Nguyên Đán từ ngày 8/2 đến 17/2/2024.",
    date: "2024-01-10",
    read: true
  }
];

const mockSubjects = [
  {
    id: 1,
    code: "IT3020",
    name: "Lập trình hướng đối tượng",
    credits: 3,
    teacher: "Đặng Anh Tuấn",
    schedule: "Thứ 2, 7:30-9:15",
    room: "TC-201",
    grades: {
      attendance: 8.5,
      midterm: 7.0,
      final: 8.0,
      overall: 7.8,
      gpa4: 3.1
    },
    status: "Đang học"
  },
  {
    id: 2,
    code: "IT4020",
    name: "Cơ sở dữ liệu",
    credits: 3,
    teacher: "Nguyễn Văn A",
    schedule: "Thứ 3, 13:30-15:15",
    room: "TC-102",
    grades: {
      attendance: 9.0,
      midterm: 8.5,
      final: 8.8,
      overall: 8.7,
      gpa4: 3.7
    },
    status: "Đã hoàn thành"
  },
  {
    id: 3,
    code: "IT2020",
    name: "Cấu trúc dữ liệu và giải thuật",
    credits: 4,
    teacher: "Trần Thị B",
    schedule: "Thứ 5, 9:30-11:15",
    room: "TC-305",
    grades: {
      attendance: 7.5,
      midterm: 6.5,
      final: 7.2,
      overall: 7.0,
      gpa4: 2.7
    },
    status: "Đang học"
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedSemester, setSelectedSemester] = useState("HK1");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const totalCredits = mockSubjects.reduce((sum, subject) => sum + subject.credits, 0);
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại!"
    });
    navigate("/login");
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

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setIsSubjectDialogOpen(true);
  };

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    toast({
      title: "Đã đánh dấu đã đọc",
      description: "Thông báo đã được đánh dấu là đã đọc"
    });
  };

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="relative"
                  onClick={() => setIsNotificationOpen(true)}
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {unreadNotificationCount}
                    </Badge>
                  )}
                </Button>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Môn học
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Thời khóa biểu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng số tín chỉ</CardTitle>
                  <GraduationCap className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCredits}</div>
                  <p className="text-xs text-blue-100">Tín chỉ đã đăng ký</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Môn học</CardTitle>
                  <BookOpen className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSubjects.length}</div>
                  <p className="text-xs text-green-100">Môn đã đăng ký</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Học kỳ</CardTitle>
                  <Calendar className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedSemester}</div>
                  <p className="text-xs text-purple-100">{selectedYear}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách môn học</CardTitle>
                <CardDescription>
                  Các môn học đã đăng ký trong {selectedSemester} - {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã môn</TableHead>
                      <TableHead>Tên môn học</TableHead>
                      <TableHead>Tín chỉ</TableHead>
                      <TableHead>Giảng viên</TableHead>
                      <TableHead>Lịch học</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell className="font-medium">{subject.code}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{subject.credits} TC</Badge>
                        </TableCell>
                        <TableCell>{subject.teacher}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{subject.schedule}</span>
                            </div>
                            <div className="text-gray-500">Phòng {subject.room}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={subject.status === 'Đang học' ? 'default' : 'secondary'}>
                            {subject.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSubjectClick(subject)}
                          >
                            Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Thời khóa biểu</CardTitle>
                <CardDescription>Lịch học trong tuần</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day) => (
                    <div key={day} className="border rounded-lg p-4">
                      <h3 className="font-medium text-center mb-2">{day}</h3>
                      <div className="space-y-2">
                        {mockSubjects
                          .filter(subject => subject.schedule.includes(day.replace('Thứ ', '')))
                          .map(subject => (
                            <div key={subject.id} className="bg-blue-100 p-2 rounded text-xs">
                              <div className="font-medium">{subject.code}</div>
                              <div className="text-gray-600">{subject.schedule.split(', ')[1]}</div>
                              <div className="text-gray-500">P.{subject.room}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <SubjectDetailDialog 
        subject={selectedSubject}
        isOpen={isSubjectDialogOpen}
        onClose={() => setIsSubjectDialogOpen(false)}
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
