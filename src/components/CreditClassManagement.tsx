
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Users, Calendar, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for credit classes
const mockCreditClasses = [
  {
    id: 1,
    code: "IT3020.001",
    name: "Lập trình hướng đối tượng",
    subjectId: 1,
    subjectName: "Lập trình hướng đối tượng",
    semester: "2024-1",
    credits: 3,
    maxStudents: 50,
    currentStudents: 45,
    teachers: [
      { id: 1, name: "Đặng Anh Tuấn" },
      { id: 2, name: "Nguyễn Văn A" }
    ],
    schedule: {
      dayOfWeek: "Thứ 2",
      startTime: "07:30",
      endTime: "09:15",
      room: "TC-201",
      building: "Tòa TC"
    },
    status: "active"
  },
  {
    id: 2,
    code: "IT4020.002",
    name: "Cơ sở dữ liệu",
    subjectId: 2,
    subjectName: "Cơ sở dữ liệu",
    semester: "2024-1",
    credits: 3,
    maxStudents: 40,
    currentStudents: 35,
    teachers: [
      { id: 1, name: "Đặng Anh Tuấn" }
    ],
    schedule: {
      dayOfWeek: "Thứ 4",
      startTime: "13:30",
      endTime: "15:15",
      room: "TC-301",
      building: "Tòa TC"
    },
    status: "active"
  }
];

const mockSubjects = [
  { id: 1, code: "IT3020", name: "Lập trình hướng đối tượng", credits: 3 },
  { id: 2, code: "IT4020", name: "Cơ sở dữ liệu", credits: 3 },
  { id: 3, code: "IT4010", name: "Cấu trúc dữ liệu và giải thuật", credits: 4 }
];

const mockTeachers = [
  { id: 1, name: "Đặng Anh Tuấn", code: "tuan.da" },
  { id: 2, name: "Nguyễn Văn A", code: "a.nv" },
  { id: 3, name: "Trần Thị B", code: "b.tt" }
];

const mockStudents = [
  { id: "B24DCCC016", name: "Nguyễn Đức Anh", class: "D24CQCN01-B" },
  { id: "B24DCCC148", name: "Phạm Quốc Huy", class: "D24CQCN02-B" },
  { id: "B24DCCC089", name: "Lê Thị Mai", class: "D24CQCN01-B" }
];

const CreditClassManagement = () => {
  const [creditClasses, setCreditClasses] = useState(mockCreditClasses);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    subjectId: "",
    semester: "2024-1",
    credits: 3,
    maxStudents: 50,
    teachers: [],
    schedule: {
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      room: "",
      building: ""
    }
  });

  const handleAddClass = () => {
    const newClass = {
      id: creditClasses.length + 1,
      ...formData,
      subjectId: parseInt(formData.subjectId), // Convert string to number
      currentStudents: 0,
      status: "active",
      subjectName: mockSubjects.find(s => s.id === parseInt(formData.subjectId))?.name || "",
      teachers: formData.teachers.map(tId => mockTeachers.find(t => t.id === parseInt(tId))).filter(Boolean)
    };
    
    setCreditClasses([...creditClasses, newClass]);
    setIsDialogOpen(false);
    setFormData({
      code: "",
      name: "",
      subjectId: "",
      semester: "2024-1",
      credits: 3,
      maxStudents: 50,
      teachers: [],
      schedule: {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        room: "",
        building: ""
      }
    });
    
    toast({
      title: "Thành công",
      description: "Đã thêm lớp tín chỉ mới"
    });
  };

  const getStatusBadge = (status, currentStudents, maxStudents) => {
    if (status === "inactive") return <Badge variant="secondary">Ngừng hoạt động</Badge>;
    if (currentStudents >= maxStudents) return <Badge variant="destructive">Đã đầy</Badge>;
    if (currentStudents / maxStudents > 0.8) return <Badge variant="outline">Sắp đầy</Badge>;
    return <Badge variant="default">Hoạt động</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý lớp tín chỉ</h2>
          <p className="text-gray-600">Quản lý các lớp tín chỉ, giảng viên và sinh viên</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm lớp tín chỉ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm lớp tín chỉ mới</DialogTitle>
              <DialogDescription>
                Tạo lớp tín chỉ mới với thông tin chi tiết
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Mã lớp</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="VD: IT3020.001"
                  />
                </div>
                <div>
                  <Label htmlFor="semester">Học kỳ</Label>
                  <Select value={formData.semester} onValueChange={(value) => setFormData({...formData, semester: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-1">2024-1</SelectItem>
                      <SelectItem value="2024-2">2024-2</SelectItem>
                      <SelectItem value="2024-3">2024-3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Môn học</Label>
                <Select value={formData.subjectId} onValueChange={(value) => setFormData({...formData, subjectId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn môn học" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credits">Số tín chỉ</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="maxStudents">Sĩ số tối đa</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label>Lịch học</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Select value={formData.schedule.dayOfWeek} onValueChange={(value) => setFormData({...formData, schedule: {...formData.schedule, dayOfWeek: value}})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Thử trong tuần" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Thứ 2">Thứ 2</SelectItem>
                      <SelectItem value="Thứ 3">Thứ 3</SelectItem>
                      <SelectItem value="Thứ 4">Thứ 4</SelectItem>
                      <SelectItem value="Thứ 5">Thứ 5</SelectItem>
                      <SelectItem value="Thứ 6">Thứ 6</SelectItem>
                      <SelectItem value="Thứ 7">Thứ 7</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Input
                      type="time"
                      value={formData.schedule.startTime}
                      onChange={(e) => setFormData({...formData, schedule: {...formData.schedule, startTime: e.target.value}})}
                    />
                    <Input
                      type="time"
                      value={formData.schedule.endTime}
                      onChange={(e) => setFormData({...formData, schedule: {...formData.schedule, endTime: e.target.value}})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Input
                    placeholder="Phòng học"
                    value={formData.schedule.room}
                    onChange={(e) => setFormData({...formData, schedule: {...formData.schedule, room: e.target.value}})}
                  />
                  <Input
                    placeholder="Tòa nhà"
                    value={formData.schedule.building}
                    onChange={(e) => setFormData({...formData, schedule: {...formData.schedule, building: e.target.value}})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddClass}>
                Thêm lớp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">Danh sách lớp</TabsTrigger>
          <TabsTrigger value="schedule">Lịch học</TabsTrigger>
          <TabsTrigger value="statistics">Thống kê</TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách lớp tín chỉ</CardTitle>
              <CardDescription>
                Tổng số: {creditClasses.length} lớp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã lớp</TableHead>
                    <TableHead>Môn học</TableHead>
                    <TableHead>Học kỳ</TableHead>
                    <TableHead>Giảng viên</TableHead>
                    <TableHead>Sĩ số</TableHead>
                    <TableHead>Lịch học</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditClasses.map((creditClass) => (
                    <TableRow key={creditClass.id}>
                      <TableCell className="font-medium">{creditClass.code}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{creditClass.subjectName}</p>
                          <p className="text-sm text-gray-500">{creditClass.credits} tín chỉ</p>
                        </div>
                      </TableCell>
                      <TableCell>{creditClass.semester}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {creditClass.teachers.map(teacher => (
                            <Badge key={teacher.id} variant="secondary" className="text-xs">
                              {teacher.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className="font-medium">{creditClass.currentStudents}</span>
                          <span className="text-gray-500">/{creditClass.maxStudents}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{creditClass.schedule.dayOfWeek}</p>
                          <p>{creditClass.schedule.startTime} - {creditClass.schedule.endTime}</p>
                          <p className="text-gray-500">{creditClass.schedule.room}, {creditClass.schedule.building}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(creditClass.status, creditClass.currentStudents, creditClass.maxStudents)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Users className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
              <CardTitle>Lịch học các lớp</CardTitle>
              <CardDescription>Xem lịch học theo tuần</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"].map(day => (
                  <div key={day} className="space-y-2">
                    <h3 className="font-semibold text-center p-2 bg-gray-100 rounded">{day}</h3>
                    <div className="space-y-2">
                      {creditClasses
                        .filter(c => c.schedule.dayOfWeek === day)
                        .map(c => (
                          <div key={c.id} className="p-2 bg-blue-50 rounded border border-blue-200">
                            <p className="font-medium text-sm">{c.code}</p>
                            <p className="text-xs text-gray-600">{c.schedule.startTime} - {c.schedule.endTime}</p>
                            <p className="text-xs text-gray-600">{c.schedule.room}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng số lớp</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{creditClasses.length}</div>
                <p className="text-xs text-muted-foreground">Học kỳ 2024-1</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng sinh viên</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {creditClasses.reduce((sum, c) => sum + c.currentStudents, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sĩ số trung bình: {Math.round(creditClasses.reduce((sum, c) => sum + c.currentStudents, 0) / creditClasses.length)} SV/lớp
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lớp đầy</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {creditClasses.filter(c => c.currentStudents >= c.maxStudents).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((creditClasses.filter(c => c.currentStudents >= c.maxStudents).length / creditClasses.length) * 100)}% tổng số lớp
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditClassManagement;
