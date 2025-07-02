
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockTeachers = [
  {
    id: 1,
    code: "GV001",
    name: "Đặng Anh Tuấn",
    email: "tuan.da@ptit.edu.vn",
    phone: "0123456789",
    department: "Công nghệ thông tin",
    subjects: ["Lập trình hướng đối tượng", "Cơ sở dữ liệu"],
    status: "active"
  },
  {
    id: 2,
    code: "GV002", 
    name: "Nguyễn Văn A",
    email: "a.nv@ptit.edu.vn",
    phone: "0987654321",
    department: "Công nghệ thông tin",
    subjects: ["Cấu trúc dữ liệu"],
    status: "active"
  }
];

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    subjects: []
  });

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingTeacher) {
      setTeachers(prev => prev.map(teacher => 
        teacher.id === editingTeacher.id ? { ...teacher, ...formData } : teacher
      ));
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin giảng viên đã được cập nhật"
      });
    } else {
      const newTeacher = {
        id: teachers.length + 1,
        ...formData,
        status: "active"
      };
      setTeachers([...teachers, newTeacher]);
      toast({
        title: "Thêm thành công",
        description: "Giảng viên mới đã được thêm vào hệ thống"
      });
    }
    
    setIsDialogOpen(false);
    setEditingTeacher(null);
    setFormData({
      code: "",
      name: "",
      email: "",
      phone: "",
      department: "",
      subjects: []
    });
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      code: teacher.code,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      subjects: teacher.subjects
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (teacherId) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
    toast({
      title: "Xóa thành công",
      description: "Giảng viên đã được xóa khỏi hệ thống"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý giảng viên</h2>
          <p className="text-gray-600">Quản lý thông tin giảng viên và phân công giảng dạy</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm giảng viên
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? "Chỉnh sửa giảng viên" : "Thêm giảng viên mới"}
              </DialogTitle>
              <DialogDescription>
                {editingTeacher ? "Cập nhật thông tin giảng viên" : "Thêm giảng viên mới vào hệ thống"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Mã giảng viên</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="VD: GV001"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Họ tên</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nhập họ tên"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@ptit.edu.vn"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="0123456789"
                  />
                </div>
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
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>
                {editingTeacher ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách giảng viên</CardTitle>
              <CardDescription>Tổng số: {teachers.length} giảng viên</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm giảng viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GV</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Môn giảng dạy</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.code}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                      {teacher.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(teacher)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(teacher.id)}>
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

export default TeacherManagement;
