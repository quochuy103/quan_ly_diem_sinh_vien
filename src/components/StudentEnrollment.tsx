import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Search, UserPlus, Edit } from "lucide-react";
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
    status: "active",
  },
  {
    id: 2,
    studentId: "B24DCCC148",
    studentName: "Phạm Quốc Huy",
    className: "D24CQCN02-B",
    creditClassId: 1,
    creditClassName: "IT3020.001 - Lập trình hướng đối tượng",
    enrollDate: "2024-08-16",
    status: "active",
  },
];

const mockCreditClasses = [
  {
    id: 1,
    code: "IT3020.001",
    name: "Lập trình hướng đối tượng",
    currentStudents: 45,
    maxStudents: 50,
  },
  {
    id: 2,
    code: "IT4020.002",
    name: "Cơ sở dữ liệu",
    currentStudents: 35,
    maxStudents: 40,
  },
];

const mockStudents = [
  {
    id: "B24DCCC016",
    name: "Nguyễn Đức Anh",
    class: "D24CQCN01-B",
    dob: "2006-05-15",
    email: "anh.nd@student.ptit.edu.vn",
    gender: "Nam",
    phone: "0123456789",
  },
  {
    id: "B24DCCC148",
    name: "Phạm Quốc Huy",
    class: "D24CQCN02-B",
    dob: "2006-08-20",
    email: "huy.pq@student.ptit.edu.vn",
    gender: "Nam",
    phone: "0987654321",
  },
  {
    id: "B24DCCC089",
    name: "Lê Thị Mai",
    class: "D24CQCN01-B",
    dob: "2006-03-10",
    email: "mai.lt@student.ptit.edu.vn",
    gender: "Nữ",
    phone: "0456789123",
  },
];

const mockStudentGrades = {
  B24DCCC016: [
    {
      id: 1,
      subject: "Cơ sở dữ liệu",
      score: 8.5,
      credits: 3,
      semester: "HK1",
      year: "2024-2025",
    },
    {
      id: 2,
      subject: "Lập trình hướng đối tượng",
      score: 8.0,
      credits: 4,
      semester: "HK1",
      year: "2024-2025",
    },
  ],
  B24DCCC148: [
    {
      id: 1,
      subject: "Cơ sở dữ liệu",
      score: 7.5,
      credits: 3,
      semester: "HK1",
      year: "2024-2025",
    },
  ],
  B24DCCC089: [
    {
      id: 1,
      subject: "Cấu trúc dữ liệu",
      score: 9.0,
      credits: 4,
      semester: "HK1",
      year: "2024-2025",
    },
  ],
};

// Giả lập dữ liệu bảng điểm chi tiết cho từng lớp tín chỉ
const mockTranscripts = [
  {
    TranscriptID: 1,
    StudentID: "B24DCCC016",
    SectionID: "IT3020.001",
    Subject: "Lập trình hướng đối tượng",
    MidtermScore: 7.5,
    FinalScore: 8.5,
    TotalScore: 8.0,
    Result: "Đạt",
  },
  {
    TranscriptID: 2,
    StudentID: "B24DCCC016",
    SectionID: "IT4020.002",
    Subject: "Cơ sở dữ liệu",
    MidtermScore: 8.0,
    FinalScore: 9.0,
    TotalScore: 8.5,
    Result: "Đạt",
  },
  {
    TranscriptID: 3,
    StudentID: "B24DCCC148",
    SectionID: "IT3020.001",
    Subject: "Lập trình hướng đối tượng",
    MidtermScore: 6.5,
    FinalScore: 7.0,
    TotalScore: 6.8,
    Result: "Đạt",
  },
];

const StudentEnrollment = () => {
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCreditClass, setSelectedCreditClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    class: "",
    dob: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { toast } = useToast();

  const handleEnrollStudent = () => {
    if (!selectedCreditClass || !selectedStudent) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn lớp tín chỉ và sinh viên",
        variant: "destructive",
      });
      return;
    }

    // Check if student is already enrolled
    const isAlreadyEnrolled = enrollments.some(
      (e) =>
        e.studentId === selectedStudent &&
        e.creditClassId === parseInt(selectedCreditClass)
    );

    if (isAlreadyEnrolled) {
      toast({
        title: "Lỗi",
        description: "Sinh viên đã đăng ký lớp này",
        variant: "destructive",
      });
      return;
    }

    const student = mockStudents.find((s) => s.id === selectedStudent);
    const creditClass = mockCreditClasses.find(
      (c) => c.id === parseInt(selectedCreditClass)
    );

    const newEnrollment = {
      id: enrollments.length + 1,
      studentId: selectedStudent,
      studentName: student.name,
      className: student.class,
      creditClassId: parseInt(selectedCreditClass),
      creditClassName: `${creditClass.code} - ${creditClass.name}`,
      enrollDate: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setEnrollments([...enrollments, newEnrollment]);
    setIsDialogOpen(false);
    setSelectedCreditClass("");
    setSelectedStudent("");

    toast({
      title: "Thành công",
      description: "Đã thêm sinh viên vào lớp tín chỉ",
    });
  };

  const handleRemoveEnrollment = (enrollmentId) => {
    setEnrollments(enrollments.filter((e) => e.id !== enrollmentId));
    toast({
      title: "Thành công",
      description: "Đã xóa sinh viên khỏi lớp",
    });
  };

  const handleEditStudent = (studentId) => {
    const student = mockStudents.find((s) => s.id === studentId);
    if (student) {
      setEditingStudent(studentId);
      setEditFormData({ ...student });
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEditStudent = () => {
    const idx = mockStudents.findIndex((s) => s.id === editingStudent);
    if (idx !== -1) {
      mockStudents[idx] = { ...editFormData };
      setIsEditDialogOpen(false);
      setEditingStudent(null);
    }
  };

  const handleShowGrades = (studentId, sectionId) => {
    setSelectedStudentId(studentId);
    setSelectedSectionId(sectionId);
    // Nếu chưa có transcript thì tự động thêm transcript mẫu
    const exists = mockTranscripts.find(
      (t) => t.StudentID === studentId && t.SectionID === String(sectionId)
    );
    if (!exists) {
      // Lấy tên môn học từ creditClassName
      const enrollment = enrollments.find(
        (e) => e.studentId === studentId && e.creditClassId === sectionId
      );
      let subject = enrollment
        ? enrollment.creditClassName.split(" - ")[1] || "Môn học"
        : "Môn học";
      // Tạo điểm ngẫu nhiên
      const mid = +(Math.random() * 4 + 6).toFixed(1);
      const fin = +(Math.random() * 4 + 6).toFixed(1);
      const total = +((mid + fin) / 2).toFixed(1);
      const result = total >= 5 ? "Đạt" : "Không đạt";
      mockTranscripts.push({
        TranscriptID: mockTranscripts.length + 1,
        StudentID: studentId,
        SectionID: String(sectionId),
        Subject: subject,
        MidtermScore: mid,
        FinalScore: fin,
        TotalScore: total,
        Result: result,
      });
    }
    setIsGradeDialogOpen(true);
  };

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentId.includes(searchTerm) ||
      enrollment.creditClassName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Đăng ký lớp tín chỉ</h2>
          <p className="text-gray-600">
            Quản lý việc đăng ký lớp tín chỉ của sinh viên
          </p>
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
                <Select
                  value={selectedCreditClass}
                  onValueChange={setSelectedCreditClass}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lớp tín chỉ" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCreditClasses.map((creditClass) => (
                      <SelectItem
                        key={creditClass.id}
                        value={creditClass.id.toString()}
                      >
                        {creditClass.code} - {creditClass.name} (
                        {creditClass.currentStudents}/{creditClass.maxStudents})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="student">Sinh viên</Label>
                <Select
                  value={selectedStudent}
                  onValueChange={setSelectedStudent}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sinh viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map((student) => (
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
              <Button onClick={handleEnrollStudent}>Thêm vào lớp</Button>
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
                <TableHead className="whitespace-nowrap">Mã SV</TableHead>
                <TableHead className="whitespace-nowrap">Họ tên</TableHead>
                <TableHead className="whitespace-nowrap">Lớp</TableHead>
                <TableHead className="whitespace-nowrap">Ngày sinh</TableHead>
                <TableHead className="whitespace-nowrap">Email</TableHead>
                <TableHead className="whitespace-nowrap">Giới tính</TableHead>
                <TableHead className="whitespace-nowrap">
                  Số điện thoại
                </TableHead>
                <TableHead className="whitespace-nowrap">Lớp tín chỉ</TableHead>
                <TableHead className="whitespace-nowrap">
                  Ngày đăng ký
                </TableHead>
                <TableHead className="whitespace-nowrap">Trạng thái</TableHead>
                <TableHead className="whitespace-nowrap">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => {
                const student = mockStudents.find(
                  (s) => s.id === enrollment.studentId
                );
                return (
                  <TableRow key={enrollment.id}>
                    <TableCell className="whitespace-nowrap">
                      <button
                        className="text-blue-600 underline"
                        onClick={() =>
                          handleShowGrades(
                            enrollment.studentId,
                            enrollment.creditClassId
                          )
                        }
                      >
                        {enrollment.studentId}
                      </button>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {enrollment.studentName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {enrollment.className}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {student?.dob || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {student?.email || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {student?.gender || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {student?.phone || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {enrollment.creditClassName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {enrollment.enrollDate}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        variant={
                          enrollment.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {enrollment.status === "active" ? "Đang học" : "Đã rút"}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleEditStudent(enrollment.studentId)
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveEnrollment(enrollment.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog chỉnh sửa thông tin sinh viên */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin sinh viên</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-id">Mã SV</Label>
                <Input id="edit-id" value={editFormData.id} disabled />
              </div>
              <div>
                <Label htmlFor="edit-name">Họ tên</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-class">Lớp</Label>
                <Input
                  id="edit-class"
                  value={editFormData.class}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, class: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-dob">Ngày sinh</Label>
                <Input
                  id="edit-dob"
                  type="date"
                  value={editFormData.dob}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, dob: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-gender">Giới tính</Label>
                <Select
                  value={editFormData.gender}
                  onValueChange={(value) =>
                    setEditFormData({ ...editFormData, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nam">Nam</SelectItem>
                    <SelectItem value="Nữ">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-phone">Số điện thoại</Label>
              <Input
                id="edit-phone"
                value={editFormData.phone}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleSaveEditStudent}>Lưu</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog hiển thị kết quả học tập */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-center w-full">
              KẾT QUẢ HỌC TẬP
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center py-4">
            {selectedStudentId && selectedSectionId
              ? (() => {
                  const transcript = mockTranscripts.find(
                    (t) =>
                      t.StudentID === selectedStudentId &&
                      t.SectionID === String(selectedSectionId)
                  );
                  return transcript ? (
                    <Table className="border rounded-lg overflow-hidden w-full text-base">
                      <TableHeader>
                        <TableRow className="bg-blue-100">
                          <TableHead className="text-center px-6 py-3 whitespace-nowrap">
                            Mã sinh viên
                          </TableHead>
                          <TableHead className="text-center px-6 py-3 whitespace-nowrap">
                            Điểm giữa kỳ
                          </TableHead>
                          <TableHead className="text-center px-6 py-3 whitespace-nowrap">
                            Điểm cuối kỳ
                          </TableHead>
                          <TableHead className="text-center px-6 py-3 whitespace-nowrap">
                            Điểm tổng kết
                          </TableHead>
                          <TableHead className="text-center px-6 py-3 whitespace-nowrap">
                            Kết quả
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-center px-6 py-3 font-semibold whitespace-nowrap">
                            {transcript.StudentID}
                          </TableCell>
                          <TableCell className="text-center px-6 py-3 whitespace-nowrap">
                            {transcript.MidtermScore}
                          </TableCell>
                          <TableCell className="text-center px-6 py-3 whitespace-nowrap">
                            {transcript.FinalScore}
                          </TableCell>
                          <TableCell className="text-center px-6 py-3 font-bold text-blue-700 whitespace-nowrap">
                            {transcript.TotalScore}
                          </TableCell>
                          <TableCell
                            className={
                              "text-center px-6 py-3 font-bold whitespace-nowrap " +
                              (transcript.Result === "Đạt"
                                ? "text-green-600"
                                : "text-red-600")
                            }
                          >
                            {transcript.Result}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : null;
                })()
              : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentEnrollment;
