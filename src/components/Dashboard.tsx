import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const mockData = {
  departments: [
    { id: 1, name: "Công nghệ thông tin" },
    { id: 2, name: "Điện tử viễn thông" },
    { id: 3, name: "Kinh tế" },
    { id: 4, name: "Kế toán" },
    { id: 5, name: "Marketing" },
  ],
  classes: [
    { id: 1, name: "CNTT01", departmentId: 1 },
    { id: 2, name: "CNTT02", departmentId: 1 },
    { id: 3, name: "DTVT01", departmentId: 2 },
    { id: 4, name: "DTVT02", departmentId: 2 },
    { id: 5, name: "KT01", departmentId: 3 },
    { id: 6, name: "KT02", departmentId: 4 },
    { id: 7, name: "MKT01", departmentId: 5 },
  ],
  students: [
    {
      id: "B24DCCC016",
      name: "Nguyễn Đức Anh",
      dateOfBirth: "2006-05-15",
      gender: "Nam",
      major: "Công nghệ thông tin",
      email: "anh.nd@student.ptit.edu.vn",
      phone: "0123456789",
      classId: 1,
    },
    {
      id: "B24DCCC148",
      name: "Phạm Quốc Huy",
      dateOfBirth: "2006-08-20",
      gender: "Nam",
      major: "Công nghệ thông tin",
      email: "huy.pq@student.ptit.edu.vn",
      phone: "0987654321",
      classId: 1,
    },
    {
      id: "B24DCC215",
      name: "Bùi Phương Ngọc",
      dateOfBirth: "2006-03-10",
      gender: "Nữ",
      major: "Công nghệ thông tin",
      email: "ngoc.bp@student.ptit.edu.vn",
      phone: "0456789123",
      classId: 2,
    },
    {
      id: "B24DCVT125",
      name: "Trần Văn Nam",
      dateOfBirth: "2006-07-12",
      gender: "Nam",
      major: "Điện tử viễn thông",
      email: "nam.tv@student.ptit.edu.vn",
      phone: "0321654987",
      classId: 3,
    },
    {
      id: "B24DCKT087",
      name: "Lê Thị Hoa",
      dateOfBirth: "2006-04-22",
      gender: "Nữ",
      major: "Kinh tế",
      email: "hoa.lt@student.ptit.edu.vn",
      phone: "0789123456",
      classId: 5,
    },
  ],
  subjects: [
    { id: 1, name: "Cơ sở dữ liệu", credits: 3 },
    { id: 2, name: "Lập trình hướng đối tượng", credits: 4 },
    { id: 3, name: "Cấu trúc dữ liệu và giải thuật", credits: 4 },
    { id: 4, name: "Mạng máy tính", credits: 3 },
    { id: 5, name: "Xử lý tín hiệu số", credits: 3 },
    { id: 6, name: "Kinh tế vi mô", credits: 3 },
    { id: 7, name: "Kế toán tài chính", credits: 4 },
  ],
  teachers: [
    {
      id: 1,
      name: "Đặng Anh Tuấn",
      major: "Công nghệ thông tin",
      email: "tuan.da@ptit.edu.vn",
      phone: "0111222333",
      subjectId: 1,
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      major: "Công nghệ thông tin",
      email: "a.nv@ptit.edu.vn",
      phone: "0222333444",
      subjectId: 2,
    },
    {
      id: 3,
      name: "Trần Thị B",
      major: "Công nghệ thông tin",
      email: "b.tt@ptit.edu.vn",
      phone: "0333444555",
      subjectId: 3,
    },
    {
      id: 4,
      name: "Phạm Văn C",
      major: "Điện tử viễn thông",
      email: "c.pv@ptit.edu.vn",
      phone: "0444555666",
      subjectId: 5,
    },
    {
      id: 5,
      name: "Lê Thị D",
      major: "Kinh tế",
      email: "d.lt@ptit.edu.vn",
      phone: "0555666777",
      subjectId: 6,
    },
    {
      id: 6,
      name: "Hoàng Văn E",
      major: "Kế toán",
      email: "e.hv@ptit.edu.vn",
      phone: "0666777888",
      subjectId: 7,
    },
  ],
  grades: [
    {
      id: 1,
      score: 8.5,
      semester: "HK1",
      academicYear: "2024-2025",
      studentId: "B24DCCC016",
      subjectId: 1,
    },
    {
      id: 2,
      score: 9.0,
      semester: "HK1",
      academicYear: "2024-2025",
      studentId: "B24DCCC148",
      subjectId: 1,
    },
    {
      id: 3,
      score: 7.5,
      semester: "HK1",
      academicYear: "2024-2025",
      studentId: "B24DCC215",
      subjectId: 2,
    },
    {
      id: 4,
      score: 8.0,
      semester: "HK1",
      academicYear: "2024-2025",
      studentId: "B24DCCC016",
      subjectId: 2,
    },
    {
      id: 5,
      score: 8.7,
      semester: "HK1",
      academicYear: "2024-2025",
      studentId: "B24DCVT125",
      subjectId: 5,
    },
    {
      id: 6,
      score: 7.8,
      semester: "HK1",
      academicYear: "2024-2025",
      studentId: "B24DCKT087",
      subjectId: 6,
    },
  ],
};

const Dashboard = () => {
  const totalStudents = mockData.students.length;
  const totalSubjects = mockData.subjects.length;
  const totalTeachers = mockData.teachers.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng sinh viên
            </CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-blue-100">Đang học tại trường</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Môn học</CardTitle>
            <BookOpen className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubjects}</div>
            <p className="text-xs text-green-100">Đang giảng dạy</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giảng viên</CardTitle>
            <GraduationCap className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-purple-100">Đang giảng dạy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thống kê theo khoa</CardTitle>
            <CardDescription>Số lượng sinh viên theo từng khoa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.departments.map((dept) => {
                const classCount = mockData.classes.filter(
                  (c) => c.departmentId === dept.id
                ).length;
                const studentCount = mockData.students.filter((s) => {
                  const studentClass = mockData.classes.find(
                    (c) => c.id === s.classId
                  );
                  return studentClass?.departmentId === dept.id;
                }).length;

                return (
                  <div
                    key={dept.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-gray-500">{classCount} lớp</p>
                    </div>
                    <Badge variant="secondary">{studentCount} SV</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
