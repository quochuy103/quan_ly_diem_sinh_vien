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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockDepartments = [
  { id: 1, code: "CNTT", name: "Công nghệ thông tin" },
  { id: 2, code: "DTVT", name: "Điện tử viễn thông" },
  { id: 3, code: "QTKD", name: "Quản trị kinh doanh" },
];

const mockClasses = [
  {
    id: 1,
    code: "D24CQCN01-B",
    name: "Công nghệ thông tin 01",
    department: "Công nghệ thông tin",
  },
  {
    id: 2,
    code: "D24CQCN02-B",
    name: "Công nghệ thông tin 02",
    department: "Công nghệ thông tin",
  },
  {
    id: 3,
    code: "D24CQDT01-B",
    name: "Điện tử viễn thông 01",
    department: "Điện tử viễn thông",
  },
];

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [classes] = useState(mockClasses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ code: "", name: "" });
  const [viewClassesDept, setViewClassesDept] = useState(null);

  const handleSubmit = () => {
    if (editingDepartment) {
      setDepartments((prev) =>
        prev.map((dep) =>
          dep.id === editingDepartment.id ? { ...dep, ...formData } : dep
        )
      );
      toast({
        title: "Cập nhật thành công",
        description: "Khoa đã được cập nhật",
      });
    } else {
      const newDepartment = { id: departments.length + 1, ...formData };
      setDepartments([...departments, newDepartment]);
      toast({ title: "Thêm thành công", description: "Khoa mới đã được thêm" });
    }
    setIsDialogOpen(false);
    setEditingDepartment(null);
    setFormData({ code: "", name: "" });
  };

  const handleEdit = (dep) => {
    setEditingDepartment(dep);
    setFormData({ code: dep.code, name: dep.name });
    setIsDialogOpen(true);
  };

  const handleDelete = (depId) => {
    setDepartments((prev) => prev.filter((dep) => dep.id !== depId));
    toast({ title: "Xóa thành công", description: "Khoa đã được xóa" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý khoa</h2>
          <p className="text-gray-600">
            Quản lý thông tin các khoa trong trường
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm khoa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {editingDepartment ? "Chỉnh sửa khoa" : "Thêm khoa mới"}
              </DialogTitle>
              <DialogDescription>
                {editingDepartment
                  ? "Cập nhật thông tin khoa"
                  : "Thêm khoa mới vào hệ thống"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="code">Mã khoa</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="VD: CNTT"
                />
              </div>
              <div>
                <Label htmlFor="name">Tên khoa</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="VD: Công nghệ thông tin"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>
                {editingDepartment ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khoa</CardTitle>
          <CardDescription>Tổng số: {departments.length} khoa</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã khoa</TableHead>
                <TableHead>Tên khoa</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dep) => (
                <TableRow key={dep.id}>
                  <TableCell>{dep.code}</TableCell>
                  <TableCell>{dep.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(dep)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(dep.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setViewClassesDept(dep)}
                      >
                        <Building className="w-4 h-4 mr-1" />
                        Lớp
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {viewClassesDept && (
        <Card>
          <CardHeader>
            <CardTitle>
              Danh sách lớp thuộc khoa: {viewClassesDept.name}
            </CardTitle>
            <CardDescription>Mã khoa: {viewClassesDept.code}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã lớp</TableHead>
                  <TableHead>Tên lớp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes
                  .filter((cls) => cls.department === viewClassesDept.name)
                  .map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.code}</TableCell>
                      <TableCell>{cls.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-2">
              <Button
                variant="outline"
                onClick={() => setViewClassesDept(null)}
              >
                Đóng
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentManagement;
