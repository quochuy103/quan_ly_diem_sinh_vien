
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockSubjects = [
  {
    id: 1,
    code: "IT3020",
    name: "Lập trình hướng đối tượng",
    credits: 3,
    department: "Công nghệ thông tin",
    description: "Môn học về lập trình hướng đối tượng với Java",
    prerequisites: ["IT1010", "IT2020"],
    teacher: { id: 1, name: "Đặng Anh Tuấn", code: "GV001" },
    startTime: "07:30",
    endTime: "09:15",
    dayOfWeek: "Thứ 2",
    room: "TC-201",
    status: "active"
  },
  {
    id: 2,
    code: "IT4020",
    name: "Cơ sở dữ liệu",
    credits: 3,
    department: "Công nghệ thông tin",
    description: "Môn học về thiết kế và quản lý cơ sở dữ liệu",
    prerequisites: ["IT3020"],
    teacher: { id: 2, name: "Nguyễn Văn A", code: "GV002" },
    startTime: "13:30",
    endTime: "15:15",
    dayOfWeek: "Thứ 3",
    room: "TC-102",
    status: "active"
  }
];

const mockTeachers = [
  { id: 1, name: "Đặng Anh Tuấn", code: "GV001" },
  { id: 2, name: "Nguyễn Văn A", code: "GV002" },
  { id: 3, name: "Trần Thị B", code: "GV003" }
];

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: 3,
    department: "",
    description: "",
    prerequisites: [],
    teacher: "",
    startTime: "07:30",
    endTime: "09:15",
    dayOfWeek: "Thứ 2",
    room: ""
  });

  const handleSubmit = () => {
    const selectedTeacher = mockTeachers.find(t => t.id === parseInt(formData.teacher));
    
    if (editingSubject) {
      setSubjects(prev => prev.map(subject => 
        subject.id === editingSubject.id 
          ? { 
              ...subject, 
              ...formData,
              teacher: selectedTeacher
            }
          : subject
      ));
      toast({
        title: "Cập nhật thành công",
        description: "Môn học đã được cập nhật"
      });
    } else {
      const newSubject = {
        id: subjects.length + 1,
        ...formData,
        teacher: selectedTeacher,
        status: "active"
      };
      setSubjects([...subjects, newSubject]);
      toast({
        title: "Thêm thành công",
        description: "Môn học mới đã được thêm vào hệ thống"
      });
    }
    
    setIsDialogOpen(false);
    setEditingSubject(null);
    setFormData({
      code: "",
      name: "",
      credits: 3,
      department: "",
      description: "",
      prerequisites: [],
      teacher: "",
      startTime: "07:30",
      endTime: "09:15",
      dayOfWeek: "Thứ 2",
      room: ""
    });
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      credits: subject.credits,
      department: subject.department,
      description: subject.description,
      prerequisites: subject.prerequisites,
      teacher: subject.teacher?.id.toString() || "",
      startTime: subject.startTime,
      endTime: subject.endTime,
      dayOfWeek: subject.dayOfWeek,
      room: subject.room
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (subjectId) => {
    setSubjects(prev => prev.filter(subject => subject.id !== subjectId));
    toast({
      title: "Xóa thành công",
      description: "Môn học đã được xóa khỏi hệ thống"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý môn học</h2>
          <p className="text-gray-600">Quản lý thông tin môn học và giảng viên giảng dạy</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm môn học
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSubject ? "Chỉnh sửa môn học" : "Thêm môn học mới"}
              </DialogTitle>
              <DialogDescription>
                {editingSubject ? "Cập nhật thông tin môn học" : "Thêm môn học mới vào hệ thống"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Mã môn học</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="VD: IT3020"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Tên môn học</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="VD: Lập trình hướng đối tượng"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credits">Số tín chỉ</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                    min="1" max="6"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Khoa</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Điện tử viễn thông">Điện tử viễn thông</SelectItem>
                      <SelectItem value="Quản trị kinh doanh">Quản trị kinh doanh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Mô tả môn học</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Nhập mô tả chi tiết về môn học..."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label>Thời gian học</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <div>
                    <Label htmlFor="dayOfWeek" className="text-sm">Thứ</Label>
                    <Select value={formData.dayOfWeek} onValueChange={(value) => setFormData({...formData, dayOfWeek: value})}>
                      <SelectTrigger>
                        <SelectValue />
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
                  </div>
                  <div>
                    <Label htmlFor="startTime" className="text-sm">Giờ bắt đầu</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-sm">Giờ kết thúc</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="room" className="text-sm">Phòng học</Label>
                    <Input
                      id="room"
                      value={formData.room}
                      onChange={(e) => setFormData({...formData, room: e.target.value})}
                      placeholder="TC-201"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Giảng viên giảng dạy</Label>
                <Select 
                  value={formData.teacher} 
                  onValueChange={(value) => setFormData({...formData, teacher: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Chọn giảng viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.code} - {teacher.name}
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
              <Button onClick={handleSubmit}>
                {editingSubject ? "Cập nhật" : "Thêm môn học"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách môn học</CardTitle>
          <CardDescription>Tổng số: {subjects.length} môn học</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã môn</TableHead>
                <TableHead>Tên môn học</TableHead>
                <TableHead>Tín chỉ</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{subject.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{subject.credits} TC</Badge>
                  </TableCell>
                  <TableCell>{subject.department}</TableCell>
                  <TableCell>
                    {subject.teacher && (
                      <Badge variant="secondary" className="text-xs">
                        {subject.teacher.code}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{subject.dayOfWeek}</span>
                      </div>
                      <div className="text-gray-600">
                        {subject.startTime} - {subject.endTime}
                      </div>
                      <div className="text-gray-500">
                        Phòng {subject.room}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={subject.status === 'active' ? 'default' : 'secondary'}>
                      {subject.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(subject)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(subject.id)}>
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
    </div>
  );
};

export default SubjectManagement;
