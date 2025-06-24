
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Search, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for enrollments
const mockEnrollments = [
  {
    id: 1,
    studentId: "B24DCCC016",
    studentName: "Nguyễn Đức Anh",
    className: "D24CQCN01-B",
    creditClassId: 1,
    creditClassName: "IT3020.001 - Lập trình hướng đối tượng",
    enrollDate: "2024-08-15",
    status: "active"
  },
  {
    id: 2,
    studentId: "B24DCCC148",
    studentName: "Phạm Quốc Huy",
    className: "D24CQCN02-B",
    creditClassId: 1,
    creditClassName: "IT3020.001 - Lập trình hướng đối tượng",
    enrollDate: "2024-08-16",
    status: "active"
  }
];

const mockCreditClasses = [
  { id: 1, code: "IT3020.001", name: "Lập trình hướng đối tượng", currentStudents: 45, maxStudents: 50 },
  { id: 2, code: "IT4020.002", name: "Cơ sở dữ liệu", currentStudents: 35, maxStudents: 40 }
];

const mockStudents = [
  { id: "B24DCCC016", name: "Nguyễn Đức Anh", class: "D24CQCN01-B" },
  { id: "B24DCCC148", name: "Phạm Quốc Huy", class: "D24CQCN02-B" },
  { id: "B24DCCC089", name: "Lê Thị Mai", class: "D24CQCN01-B" }
];

const StudentEnrollment = () => {
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCreditClass, setSelectedCreditClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleEnrollStudent = () => {
    if (!selectedCreditClass || !selectedStudent) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn lớp tín chỉ và sinh viên",
        variant: "destructive"
      });
      return;
    }

    // Check if student is already enrolled
    const isAlreadyEnrolled = enrollments.some(
      e => e.studentId === selectedStudent && e.creditClassId === parseInt(selectedCreditClass)
    );

    if (isAlreadyEnrolled) {
      toast({
        title: "Lỗi",
        description: "Sinh viên đã đăng ký lớp này",
        variant: "destructive"
      });
      return;
    }

    const student = mockStudents.find(s => s.id === selectedStudent);
    const creditClass = mockCreditClasses.find(c => c.id === parseInt(selectedCreditClass));

    const newEnrollment = {
      id: enrollments.length + 1,
      studentId: selectedStudent,
      studentName: student.name,
      className: student.class,
      creditClassId: parseInt(selectedCreditClass),
      creditClassName: `${creditClass.code} - ${creditClass.name}`,
      enrollDate: new Date().toISOString().split('T')[0],
      status: "active"
    };

    setEnrollments([...enrollments, newEnrollment]);
    setIsDialogOpen(false);
    setSelectedCreditClass("");
    setSelectedStudent("");

    toast({
      title: "Thành công",
      description: "Đã thêm sinh viên vào lớp tín chỉ"
    });
  };

  const handleRemoveEnrollment = (enrollmentId) => {
    setEnrollments(enrollments.filter(e => e.id !== enrollmentId));
    toast({
      title: "Thành công",
      description: "Đã xóa sinh viên khỏi lớp"
    });
  };

  const filteredEnrollments = enrollments.filter(enrollment =>
    enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.studentId.includes(searchTerm) ||
    enrollment.creditClassName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Đăng ký lớp tín chỉ</h2>
          <p className="text-gray-600">Quản lý việc đăng ký lớp tín chỉ của sinh viên</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm sinh viên vào lớp
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm sinh viên vào lớp tín chỉ</DialogTitle>
              <DialogDescription>
                Chọn lớp tín chỉ và sinh viên để thêm vào lớp
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="creditClass">Lớp tín chỉ</Label>
                <Select value={selectedCreditClass} onValueChange={setSelectedCreditClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lớp tín chỉ" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCreditClasses.map(creditClass => (
                      <SelectItem key={creditClass.id} value={creditClass.id.toString()}>
                        {creditClass.code} - {creditClass.name} ({creditClass.currentStudents}/{creditClass.maxStudents})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="student">Sinh viên</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sinh viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.id} - {student.name} ({student.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleEnrollStudent}>
                Thêm vào lớp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách đăng ký</CardTitle>
              <CardDescription>
                Tổng số: {enrollments.length} đăng ký
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm sinh viên, lớp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã sinh viên</TableHead>
                <TableHead>Tên sinh viên</TableHead>
                <TableHead>Lớp hành chính</TableHead>
                <TableHead>Lớp tín chỉ</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.studentId}</TableCell>
                  <TableCell>{enrollment.studentName}</TableCell>
                  <TableCell>{enrollment.className}</TableCell>
                  <TableCell>{enrollment.creditClassName}</TableCell>
                  <TableCell>{enrollment.enrollDate}</TableCell>
                  <TableCell>
                    <Badge variant={enrollment.status === "active" ? "default" : "secondary"}>
                      {enrollment.status === "active" ? "Hoạt động" : "Ngừng"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveEnrollment(enrollment.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentEnrollment;
