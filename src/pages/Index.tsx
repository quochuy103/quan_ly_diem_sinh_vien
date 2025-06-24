import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, GraduationCap, TrendingUp, Search, Plus, Edit, Trash2, School, Building, UserCheck } from "lucide-react";

// Mock data based on the database schema
const mockData = {
  departments: [
    { id: 1, name: "Công nghệ thông tin" },
    { id: 2, name: "Điện tử viễn thông" },
    { id: 3, name: "Kinh tế" },
    { id: 4, name: "Kế toán" },
    { id: 5, name: "Marketing" }
  ],
  classes: [
    { id: 1, name: "CNTT01", departmentId: 1 },
    { id: 2, name: "CNTT02", departmentId: 1 },
    { id: 3, name: "DTVT01", departmentId: 2 },
    { id: 4, name: "DTVT02", departmentId: 2 },
    { id: 5, name: "KT01", departmentId: 3 },
    { id: 6, name: "KT02", departmentId: 4 },
    { id: 7, name: "MKT01", departmentId: 5 }
  ],
  students: [
    { id: "B24DCCC016", name: "Nguyễn Đức Anh", dateOfBirth: "2006-05-15", gender: "Nam", major: "Công nghệ thông tin", email: "anh.nd@student.ptit.edu.vn", phone: "0123456789", classId: 1 },
    { id: "B24DCCC148", name: "Phạm Quốc Huy", dateOfBirth: "2006-08-20", gender: "Nam", major: "Công nghệ thông tin", email: "huy.pq@student.ptit.edu.vn", phone: "0987654321", classId: 1 },
    { id: "B24DCC215", name: "Bùi Phương Ngọc", dateOfBirth: "2006-03-10", gender: "Nữ", major: "Công nghệ thông tin", email: "ngoc.bp@student.ptit.edu.vn", phone: "0456789123", classId: 2 },
    { id: "B24DCVT125", name: "Trần Văn Nam", dateOfBirth: "2006-07-12", gender: "Nam", major: "Điện tử viễn thông", email: "nam.tv@student.ptit.edu.vn", phone: "0321654987", classId: 3 },
    { id: "B24DCKT087", name: "Lê Thị Hoa", dateOfBirth: "2006-04-22", gender: "Nữ", major: "Kinh tế", email: "hoa.lt@student.ptit.edu.vn", phone: "0789123456", classId: 5 }
  ],
  subjects: [
    { id: 1, name: "Cơ sở dữ liệu", credits: 3 },
    { id: 2, name: "Lập trình hướng đối tượng", credits: 4 },
    { id: 3, name: "Cấu trúc dữ liệu và giải thuật", credits: 4 },
    { id: 4, name: "Mạng máy tính", credits: 3 },
    { id: 5, name: "Xử lý tín hiệu số", credits: 3 },
    { id: 6, name: "Kinh tế vi mô", credits: 3 },
    { id: 7, name: "Kế toán tài chính", credits: 4 }
  ],
  teachers: [
    { id: 1, name: "Đặng Anh Tuấn", major: "Công nghệ thông tin", email: "tuan.da@ptit.edu.vn", phone: "0111222333", subjectId: 1 },
    { id: 2, name: "Nguyễn Văn A", major: "Công nghệ thông tin", email: "a.nv@ptit.edu.vn", phone: "0222333444", subjectId: 2 },
    { id: 3, name: "Trần Thị B", major: "Công nghệ thông tin", email: "b.tt@ptit.edu.vn", phone: "0333444555", subjectId: 3 },
    { id: 4, name: "Phạm Văn C", major: "Điện tử viễn thông", email: "c.pv@ptit.edu.vn", phone: "0444555666", subjectId: 5 },
    { id: 5, name: "Lê Thị D", major: "Kinh tế", email: "d.lt@ptit.edu.vn", phone: "0555666777", subjectId: 6 },
    { id: 6, name: "Hoàng Văn E", major: "Kế toán", email: "e.hv@ptit.edu.vn", phone: "0666777888", subjectId: 7 }
  ],
  grades: [
    { id: 1, score: 8.5, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCCC016", subjectId: 1 },
    { id: 2, score: 9.0, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCCC148", subjectId: 1 },
    { id: 3, score: 7.5, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCC215", subjectId: 2 },
    { id: 4, score: 8.0, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCCC016", subjectId: 2 },
    { id: 5, score: 8.7, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCVT125", subjectId: 5 },
    { id: 6, score: 7.8, semester: "HK1", academicYear: "2024-2025", studentId: "B24DCKT087", subjectId: 6 }
  ]
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Calculate statistics
  const totalStudents = mockData.students.length;
  const totalSubjects = mockData.subjects.length;
  const totalTeachers = mockData.teachers.length;
  const averageGrade = mockData.grades.reduce((sum, grade) => sum + grade.score, 0) / mockData.grades.length;

  // Filter students based on search and class
  const filteredStudents = mockData.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.classId.toString() === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Filter teachers based on search and department
  const filteredTeachers = mockData.teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || teacher.major.includes(selectedDepartment);
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hệ thống quản lý điểm sinh viên</h1>
              <p className="text-gray-600 mt-1">Học viện Công nghệ Bưu chính Viễn thông</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-3 py-1">
                Năm học 2024-2025
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Học kỳ 1
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Sinh viên
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Giảng viên
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Khoa
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <School className="w-4 h-4" />
              Lớp HC
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Môn học
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Điểm số
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng sinh viên</CardTitle>
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

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Điểm TB</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageGrade.toFixed(1)}</div>
                  <p className="text-xs text-orange-100">Điểm trung bình chung</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê theo khoa</CardTitle>
                  <CardDescription>Số lượng sinh viên theo từng khoa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.departments.map(dept => {
                      const classCount = mockData.classes.filter(c => c.departmentId === dept.id).length;
                      const studentCount = mockData.students.filter(s => {
                        const studentClass = mockData.classes.find(c => c.id === s.classId);
                        return studentClass?.departmentId === dept.id;
                      }).length;
                      
                      return (
                        <div key={dept.id} className="flex items-center justify-between">
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

              <Card>
                <CardHeader>
                  <CardTitle>Điểm số gần đây</CardTitle>
                  <CardDescription>Các điểm vừa nhập gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.grades.slice(0, 4).map(grade => {
                      const student = mockData.students.find(s => s.id === grade.studentId);
                      const subject = mockData.subjects.find(s => s.id === grade.subjectId);
                      
                      return (
                        <div key={grade.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{student?.name}</p>
                            <p className="text-sm text-gray-500">{subject?.name}</p>
                          </div>
                          <Badge variant={grade.score >= 8 ? "default" : grade.score >= 6.5 ? "secondary" : "destructive"}>
                            {grade.score}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý sinh viên</CardTitle>
                    <CardDescription>Danh sách tất cả sinh viên trong hệ thống</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sinh viên
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm sinh viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Chọn lớp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả lớp</SelectItem>
                      {mockData.classes.map(cls => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SV</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Ngày sinh</TableHead>
                        <TableHead>Giới tính</TableHead>
                        <TableHead>Lớp</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => {
                        const studentClass = mockData.classes.find(c => c.id === student.classId);
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.dateOfBirth}</TableCell>
                            <TableCell>{student.gender}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{studentClass?.name}</Badge>
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý giảng viên</CardTitle>
                    <CardDescription>Danh sách tất cả giảng viên trong hệ thống</CardDescription>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm giảng viên
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm giảng viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Chọn khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả khoa</SelectItem>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Điện tử viễn thông">Điện tử viễn thông</SelectItem>
                      <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                      <SelectItem value="Kế toán">Kế toán</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã GV</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Chuyên ngành</TableHead>
                        <TableHead>Môn giảng dạy</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Điện thoại</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeachers.map(teacher => {
                        const subject = mockData.subjects.find(s => s.id === teacher.subjectId);
                        return (
                          <TableRow key={teacher.id}>
                            <TableCell className="font-medium">GV{teacher.id.toString().padStart(3, '0')}</TableCell>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{teacher.major}</Badge>
                            </TableCell>
                            <TableCell>{subject?.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.phone}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý khoa</CardTitle>
                    <CardDescription>Danh sách các khoa trong trường</CardDescription>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm khoa
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã khoa</TableHead>
                        <TableHead>Tên khoa</TableHead>
                        <TableHead>Số lớp</TableHead>
                        <TableHead>Số sinh viên</TableHead>
                        <TableHead>Số giảng viên</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.departments.map(dept => {
                        const classCount = mockData.classes.filter(c => c.departmentId === dept.id).length;
                        const studentCount = mockData.students.filter(s => {
                          const studentClass = mockData.classes.find(c => c.id === s.classId);
                          return studentClass?.departmentId === dept.id;
                        }).length;
                        const teacherCount = mockData.teachers.filter(t => t.major.includes(dept.name.split(' ')[0])).length;
                        
                        return (
                          <TableRow key={dept.id}>
                            <TableCell className="font-medium">KHOA{dept.id.toString().padStart(2, '0')}</TableCell>
                            <TableCell>{dept.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{classCount} lớp</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{studentCount} SV</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">{teacherCount} GV</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý lớp hành chính</CardTitle>
                    <CardDescription>Danh sách các lớp hành chính trong trường</CardDescription>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm lớp
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã lớp</TableHead>
                        <TableHead>Tên lớp</TableHead>
                        <TableHead>Thuộc khoa</TableHead>
                        <TableHead>Số sinh viên</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.classes.map(cls => {
                        const department = mockData.departments.find(d => d.id === cls.departmentId);
                        const studentCount = mockData.students.filter(s => s.classId === cls.id).length;
                        
                        return (
                          <TableRow key={cls.id}>
                            <TableCell className="font-medium">LOP{cls.id.toString().padStart(3, '0')}</TableCell>
                            <TableCell>{cls.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{department?.name}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{studentCount} SV</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý môn học</CardTitle>
                    <CardDescription>Danh sách các môn học và giảng viên phụ trách</CardDescription>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm môn học
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã MH</TableHead>
                        <TableHead>Tên môn học</TableHead>
                        <TableHead>Số tín chỉ</TableHead>
                        <TableHead>Giảng viên</TableHead>
                        <TableHead>Email GV</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.subjects.map(subject => {
                        const teacher = mockData.teachers.find(t => t.subjectId === subject.id);
                        return (
                          <TableRow key={subject.id}>
                            <TableCell className="font-medium">{subject.id}</TableCell>
                            <TableCell>{subject.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{subject.credits} TC</Badge>
                            </TableCell>
                            <TableCell>{teacher?.name || "Chưa phân công"}</TableCell>
                            <TableCell>{teacher?.email || "-"}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Quản lý điểm số</CardTitle>
                    <CardDescription>Điểm số của sinh viên theo từng môn học</CardDescription>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nhập điểm
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SV</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Môn học</TableHead>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Học kỳ</TableHead>
                        <TableHead>Năm học</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.grades.map(grade => {
                        const student = mockData.students.find(s => s.id === grade.studentId);
                        const subject = mockData.subjects.find(s => s.id === grade.subjectId);
                        return (
                          <TableRow key={grade.id}>
                            <TableCell className="font-medium">{grade.studentId}</TableCell>
                            <TableCell>{student?.name}</TableCell>
                            <TableCell>{subject?.name}</TableCell>
                            <TableCell>
                              <Badge variant={grade.score >= 8 ? "default" : grade.score >= 6.5 ? "secondary" : "destructive"}>
                                {grade.score}
                              </Badge>
                            </TableCell>
                            <TableCell>{grade.semester}</TableCell>
                            <TableCell>{grade.academicYear}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
