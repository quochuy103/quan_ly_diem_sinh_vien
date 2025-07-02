
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, LogOut, Send, BookOpen, TrendingUp, Users } from "lucide-react";

interface NotificationForm {
  title: string;
  content: string;
  recipients: string;
}

const mockStudents = [
  { id: "B24DCCC016", name: "Nguyễn Đức Anh", class: "CNTT01" },
  { id: "B24DCCC148", name: "Phạm Quốc Huy", class: "CNTT01" },
  { id: "B24DCC215", name: "Bùi Phương Ngọc", class: "CNTT02" },
  { id: "B24DCVT125", name: "Trần Văn Nam", class: "DTVT01" },
  { id: "B24DCKT087", name: "Lê Thị Hoa", class: "KT01" }
];

const TeacherDashboard = () => {
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedSemester, setSelectedSemester] = useState("HK1");
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const notificationForm = useForm<NotificationForm>({
    defaultValues: {
      title: "",
      content: "",
      recipients: "all"
    }
  });

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

  const onSubmitNotification = (data: NotificationForm) => {
    toast({
      title: "Gửi thông báo thành công",
      description: "Thông báo đã được gửi đến sinh viên!"
    });
    setIsNotificationDialogOpen(false);
    notificationForm.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hệ thống quản lý điểm sinh viên</h1>
              <p className="text-gray-600 mt-1">Học viện Công nghệ Bưu chính Viễn thông - Giảng viên</p>
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
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Danh sách sinh viên
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Thông báo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách sinh viên</CardTitle>
                <CardDescription>Sinh viên trong lớp tín chỉ mà bạn phụ trách</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã sinh viên</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Lớp</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <Badge variant="default">Đang học</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gửi thông báo</CardTitle>
                    <CardDescription>Thông báo điểm và tin tức đến sinh viên</CardDescription>
                  </div>
                  <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Send className="w-4 h-4 mr-2" />
                        Tạo thông báo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tạo thông báo mới</DialogTitle>
                        <DialogDescription>
                          Gửi thông báo điểm hoặc tin tức đến sinh viên
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...notificationForm}>
                        <form onSubmit={notificationForm.handleSubmit(onSubmitNotification)} className="space-y-4">
                          <FormField
                            control={notificationForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tiêu đề</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nhập tiêu đề thông báo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationForm.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Nhập nội dung thông báo..."
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationForm.control}
                            name="recipients"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gửi đến</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn đối tượng" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="all">Tất cả sinh viên</SelectItem>
                                    <SelectItem value="class">Sinh viên trong lớp</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsNotificationDialogOpen(false)}>
                              Hủy
                            </Button>
                            <Button type="submit">
                              Gửi thông báo
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border">
                    <h4 className="font-medium text-blue-900">Thông báo điểm giữa kỳ</h4>
                    <p className="text-sm text-blue-700 mt-1">Đã gửi lúc 14:30 - 20/12/2024</p>
                    <p className="text-blue-800 mt-2">Điểm giữa kỳ môn Cơ sở dữ liệu đã được cập nhật. Sinh viên vui lòng kiểm tra.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border">
                    <h4 className="font-medium text-green-900">Lịch thi cuối kỳ</h4>
                    <p className="text-sm text-green-700 mt-1">Đã gửi lúc 09:15 - 18/12/2024</p>
                    <p className="text-green-800 mt-2">Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công bố.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
