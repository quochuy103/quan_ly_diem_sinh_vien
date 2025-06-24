
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Edit, Plus, LogOut, Send, BookOpen } from "lucide-react";

interface Grade {
  id: number;
  score: number;
  semester: string;
  academicYear: string;
  studentId: string;
  subjectId: number;
  studentName?: string;
}

interface GradeForm {
  studentId: string;
  score: number;
  semester: string;
  academicYear: string;
}

interface NotificationForm {
  title: string;
  content: string;
  recipients: string;
}

const mockGrades: Grade[] = [
  { id: 1, score: 8.5, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCCC016", subjectId: 1, studentName: "Nguyễn Đức Anh" },
  { id: 2, score: 9.0, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCCC148", subjectId: 1, studentName: "Phạm Quốc Huy" },
  { id: 3, score: 7.5, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCC215", subjectId: 1, studentName: "Bùi Phương Ngọc" }
];

const mockStudents = [
  { id: "B24DCCC016", name: "Nguyễn Đức Anh" },
  { id: "B24DCCC148", name: "Phạm Quốc Huy" },
  { id: "B24DCC215", name: "Bùi Phương Ngọc" }
];

const TeacherDashboard = () => {
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const gradeForm = useForm<GradeForm>({
    defaultValues: {
      studentId: "",
      score: 0,
      semester: "HK1",
      academicYear: "2024-2025"
    }
  });

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

  const onSubmitGrade = (data: GradeForm) => {
    const student = mockStudents.find(s => s.id === data.studentId);
    
    if (editingGrade) {
      setGrades(prev => prev.map(grade => 
        grade.id === editingGrade.id 
          ? { ...grade, ...data, studentName: student?.name }
          : grade
      ));
      toast({
        title: "Cập nhật điểm thành công",
        description: "Điểm số đã được cập nhật!"
      });
    } else {
      const newGrade: Grade = {
        id: Date.now(),
        ...data,
        subjectId: 1, // Giả sử giảng viên dạy môn 1
        studentName: student?.name
      };
      setGrades(prev => [...prev, newGrade]);
      toast({
        title: "Nhập điểm thành công",
        description: "Điểm số đã được lưu!"
      });
    }
    
    setIsGradeDialogOpen(false);
    setEditingGrade(null);
    gradeForm.reset();
  };

  const onSubmitNotification = (data: NotificationForm) => {
    toast({
      title: "Gửi thông báo thành công",
      description: "Thông báo đã được gửi đến sinh viên!"
    });
    setIsNotificationDialogOpen(false);
    notificationForm.reset();
  };

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    gradeForm.reset({
      studentId: grade.studentId,
      score: grade.score,
      semester: grade.semester,
      academicYear: grade.academicYear
    });
    setIsGradeDialogOpen(true);
  };

  const handleAddGrade = () => {
    setEditingGrade(null);
    gradeForm.reset();
    setIsGradeDialogOpen(true);
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
        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Quản lý điểm
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Thông báo
            </TabsTrigger>
            <TabsTrigger value="subject" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Môn học
            </TabsTrigger>
          </TabsList>

          {/* Grades Management Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý điểm số</CardTitle>
                    <CardDescription>Nhập và chỉnh sửa điểm cho sinh viên</CardDescription>
                  </div>
                  <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddGrade} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Nhập điểm
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingGrade ? "Chỉnh sửa điểm" : "Nhập điểm mới"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingGrade ? "Cập nhật điểm cho sinh viên" : "Nhập điểm cho sinh viên"}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...gradeForm}>
                        <form onSubmit={gradeForm.handleSubmit(onSubmitGrade)} className="space-y-4">
                          <FormField
                            control={gradeForm.control}
                            name="studentId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sinh viên</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn sinh viên" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {mockStudents.map(student => (
                                      <SelectItem key={student.id} value={student.id}>
                                        {student.id} - {student.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={gradeForm.control}
                            name="score"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Điểm (0-10)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="0" 
                                    max="10" 
                                    step="0.1"
                                    placeholder="Nhập điểm" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={gradeForm.control}
                            name="semester"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Học kỳ</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn học kỳ" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="HK1">Học kỳ 1</SelectItem>
                                    <SelectItem value="HK2">Học kỳ 2</SelectItem>
                                    <SelectItem value="HK3">Học kỳ hè</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
                              Hủy
                            </Button>
                            <Button type="submit">
                              {editingGrade ? "Cập nhật" : "Lưu điểm"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SV</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Học kỳ</TableHead>
                        <TableHead>Năm học</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.map(grade => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">{grade.studentId}</TableCell>
                          <TableCell>{grade.studentName}</TableCell>
                          <TableCell>
                            <Badge variant={grade.score >= 8 ? "default" : grade.score >= 6.5 ? "secondary" : "destructive"}>
                              {grade.score}
                            </Badge>
                          </TableCell>
                          <TableCell>{grade.semester}</TableCell>
                          <TableCell>{grade.academicYear}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleEditGrade(grade)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
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
                                    <SelectItem value="individual">Sinh viên cụ thể</SelectItem>
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

          {/* Subject Tab */}
          <TabsContent value="subject" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Môn học phụ trách</CardTitle>
                <CardDescription>Thông tin về môn học bạn đang giảng dạy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900">Cơ sở dữ liệu</h3>
                    <p className="text-sm text-blue-700 mt-1">Mã môn: CSDL001</p>
                    <p className="text-sm text-blue-700">Số tín chỉ: 3</p>
                    <p className="text-sm text-blue-700">Số sinh viên: {mockStudents.length}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Thống kê điểm</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">Điểm trung bình: {(grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(1)}</p>
                      <p className="text-sm">Điểm cao nhất: {Math.max(...grades.map(g => g.score))}</p>
                      <p className="text-sm">Điểm thấp nhất: {Math.min(...grades.map(g => g.score))}</p>
                    </div>
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
