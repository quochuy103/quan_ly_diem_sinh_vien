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
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockAdminClasses = [
  {
    id: 1,
    code: "D24CQCN01-B",
    name: "Công nghệ thông tin 01",
    department: "Công nghệ thông tin",
    course: "2024-2028",
    teacherId: 1,
    teacherName: "Đặng Anh Tuấn",
    studentCount: 45,
    maxStudents: 50,
    status: "active",
  },
  {
    id: 2,
    code: "D24CQCN02-B",
    name: "Công nghệ thông tin 02",
    department: "Công nghệ thông tin",
    course: "2024-2028",
    teacherId: 2,
    teacherName: "Nguyễn Văn A",
    studentCount: 42,
    maxStudents: 50,
    status: "active",
  },
];

const mockTeachers = [
  { id: 1, name: "Đặng Anh Tuấn", code: "GV001" },
  { id: 2, name: "Nguyễn Văn A", code: "GV002" },
  { id: 3, name: "Trần Thị B", code: "GV003" },
];

const AdministrativeClassManagement = () => {
  const [adminClasses, setAdminClasses] = useState(mockAdminClasses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    department: "",
    course: "",
    teacherId: "",
    maxStudents: 50,
  });

  const handleSubmit = () => {
    const teacher = mockTeachers.find(
      (t) => t.id === parseInt(formData.teacherId)
    );

    if (editingClass) {
      setAdminClasses((prev) =>
        prev.map((cls) =>
          cls.id === editingClass.id
            ? {
                ...cls,
                ...formData,
                teacherId: parseInt(formData.teacherId),
                teacherName: teacher?.name || "",
              }
            : cls
        )
      );
      toast({
        title: "Cập nhật thành công",
        description: "Lớp hành chính đã được cập nhật",
      });
    } else {
      const newClass = {
        id: adminClasses.length + 1,
        ...formData,
        teacherId: parseInt(formData.teacherId),
        teacherName: teacher?.name || "",
        studentCount: 0,
        status: "active",
      };
      setAdminClasses([...adminClasses, newClass]);
      toast({
        title: "Thêm thành công",
        description: "Lớp hành chính mới đã được tạo",
      });
    }

    setIsDialogOpen(false);
    setEditingClass(null);
    setFormData({
      code: "",
      name: "",
      department: "",
      course: "",
      teacherId: "",
      maxStudents: 50,
    });
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      code: cls.code,
      name: cls.name,
      department: cls.department,
      course: cls.course,
      teacherId: cls.teacherId.toString(),
      maxStudents: cls.maxStudents,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (classId) => {
    setAdminClasses((prev) => prev.filter((cls) => cls.id !== classId));
    toast({
      title: "Xóa thành công",
      description: "Lớp hành chính đã được xóa",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý lớp hành chính</h2>
          <p className="text-gray-600">
            Quản lý các lớp hành chính và giảng viên chủ nhiệm
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm lớp hành chính
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingClass
                  ? "Chỉnh sửa lớp hành chính"
                  : "Thêm lớp hành chính mới"}
              </DialogTitle>
              <DialogDescription>
                {editingClass
                  ? "Cập nhật thông tin lớp hành chính"
                  : "Tạo lớp hành chính mới"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Mã lớp</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="VD: D24CQCN01-B"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Tên lớp</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="VD: Công nghệ thông tin 01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Khoa</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công nghệ thông tin">
                        Công nghệ thông tin
                      </SelectItem>
                      <SelectItem value="Điện tử viễn thông">
                        Điện tử viễn thông
                      </SelectItem>
                      <SelectItem value="Quản trị kinh doanh">
                        Quản trị kinh doanh
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="course">Khóa học</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      setFormData({ ...formData, course: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khóa học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2028">2024-2028</SelectItem>
                      <SelectItem value="2023-2027">2023-2027</SelectItem>
                      <SelectItem value="2022-2026">2022-2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teacher">Giảng viên chủ nhiệm</Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, teacherId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giảng viên" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map((teacher) => (
                        <SelectItem
                          key={teacher.id}
                          value={teacher.id.toString()}
                        >
                          {teacher.code} - {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxStudents">Sĩ số tối đa</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxStudents: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>
                {editingClass ? "Cập nhật" : "Thêm lớp"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách lớp hành chính</CardTitle>
          <CardDescription>Tổng số: {adminClasses.length} lớp</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã lớp</TableHead>
                <TableHead>Tên lớp</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Khóa học</TableHead>
                <TableHead>CVHT</TableHead>
                <TableHead>Sĩ số</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.code}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.department}</TableCell>
                  <TableCell>{cls.course}</TableCell>
                  <TableCell>{cls.teacherName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {cls.studentCount}/{cls.maxStudents}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cls.status === "active" ? "default" : "secondary"
                      }
                    >
                      {cls.status === "active" ? "Hoạt động" : "Ngừng"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(cls)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(cls.id)}
                      >
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

export default AdministrativeClassManagement;
