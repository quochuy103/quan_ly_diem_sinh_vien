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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  Edit,
  Plus,
  LogOut,
  Send,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import TeacherCreditClasses from "@/components/TeacherCreditClasses";
import GradeStatistics from "@/components/GradeStatistics";

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
  {
    id: 1,
    score: 8.5,
    semester: "HK1",
    academicYear: "2024-2025",
    studentId: "B24DCCC016",
    subjectId: 1,
    studentName: "Nguyễn Đức Anh",
  },
  {
    id: 2,
    score: 9.0,
    semester: "HK1",
    academicYear: "2024-2025",
    studentId: "B24DCCC148",
    subjectId: 1,
    studentName: "Phạm Quốc Huy",
  },
  {
    id: 3,
    score: 7.5,
    semester: "HK1",
    academicYear: "2024-2025",
    studentId: "B24DCC215",
    subjectId: 1,
    studentName: "Bùi Phương Ngọc",
  },
];

const mockStudents = [
  { id: "B24DCCC016", name: "Nguyễn Đức Anh" },
  { id: "B24DCCC148", name: "Phạm Quốc Huy" },
  { id: "B24DCC215", name: "Bùi Phương Ngọc" },
];

const TeacherDashboard = () => {
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] =
    useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [selectedCreditClass, setSelectedCreditClass] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [semester, setSemester] = useState("1");
  const academicYears = ["2022-2023", "2023-2024", "2024-2025", "2025-2026"];
  const semesters = ["1", "2", "Hè"];

  const gradeForm = useForm<GradeForm>({
    defaultValues: {
      studentId: "",
      score: 0,
      semester: "HK1",
      academicYear: "2024-2025",
    },
  });

  const notificationForm = useForm<NotificationForm>({
    defaultValues: {
      title: "",
      content: "",
      recipients: "all",
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại!",
    });
    navigate("/login");
  };

  const onSubmitGrade = (data: GradeForm) => {
    const student = mockStudents.find((s) => s.id === data.studentId);

    if (editingGrade) {
      setGrades((prev) =>
        prev.map((grade) =>
          grade.id === editingGrade.id
            ? { ...grade, ...data, studentName: student?.name }
            : grade
        )
      );
      toast({
        title: "Cập nhật điểm thành công",
        description: "Điểm số đã được cập nhật!",
      });
    } else {
      const newGrade: Grade = {
        id: Date.now(),
        ...data,
        subjectId: 1, // Giả sử giảng viên dạy môn 1
        studentName: student?.name,
      };
      setGrades((prev) => [...prev, newGrade]);
      toast({
        title: "Nhập điểm thành công",
        description: "Điểm số đã được lưu!",
      });
    }

    setIsGradeDialogOpen(false);
    setEditingGrade(null);
    gradeForm.reset();
  };

  const onSubmitNotification = (data: NotificationForm) => {
    toast({
      title: "Gửi thông báo thành công",
      description: "Thông báo đã được gửi đến sinh viên!",
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
      academicYear: grade.academicYear,
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
              <h1 className="text-3xl font-bold text-gray-900">
                Hệ thống quản lý điểm sinh viên
              </h1>
              <p className="text-gray-600 mt-1">
                Học viện Công nghệ Bưu chính Viễn thông - Giảng viên
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
        <Tabs defaultValue="credit-classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger
              value="credit-classes"
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Lớp tín chỉ
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Thống kê
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Thông báo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-classes">
            <TeacherCreditClasses onlyStudentList />
          </TabsContent>

          <TabsContent value="statistics">
            <GradeStatistics />
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gửi thông báo</CardTitle>
                    <CardDescription>
                      Thông báo điểm và tin tức đến sinh viên
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isNotificationDialogOpen}
                    onOpenChange={setIsNotificationDialogOpen}
                  >
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
                        <form
                          onSubmit={notificationForm.handleSubmit(
                            onSubmitNotification
                          )}
                          className="space-y-4"
                        >
                          <FormField
                            control={notificationForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tiêu đề</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập tiêu đề thông báo"
                                    {...field}
                                  />
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn đối tượng" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="all">
                                      Tất cả sinh viên
                                    </SelectItem>
                                    <SelectItem value="class">
                                      Sinh viên trong lớp
                                    </SelectItem>
                                    <SelectItem value="individual">
                                      Sinh viên cụ thể
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsNotificationDialogOpen(false)}
                            >
                              Hủy
                            </Button>
                            <Button type="submit">Gửi thông báo</Button>
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
                    <h4 className="font-medium text-blue-900">
                      Thông báo điểm giữa kỳ
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Đã gửi lúc 14:30 - 20/12/2024
                    </p>
                    <p className="text-blue-800 mt-2">
                      Điểm giữa kỳ môn Cơ sở dữ liệu đã được cập nhật. Sinh viên
                      vui lòng kiểm tra.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border">
                    <h4 className="font-medium text-green-900">
                      Lịch thi cuối kỳ
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Đã gửi lúc 09:15 - 18/12/2024
                    </p>
                    <p className="text-green-800 mt-2">
                      Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công
                      bố.
                    </p>
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
