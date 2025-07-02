
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Users, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCreditClasses = [
  {
    id: 1,
    code: "IT3020.001",
    name: "Lập trình hướng đối tượng",
    semester: "2024-1",
    credits: 3,
    studentCount: 45,
    schedule: "Thứ 2, 07:30-09:15, TC-201"
  },
  {
    id: 2,
    code: "IT4020.002", 
    name: "Cơ sở dữ liệu",
    semester: "2024-1",
    credits: 3,
    studentCount: 35,
    schedule: "Thứ 4, 13:30-15:15, TC-301"
  }
];

const mockStudents = [
  { id: "B24DCCC016", name: "Nguyễn Đức Anh", class: "D24CQCN01-B", score: null },
  { id: "B24DCCC148", name: "Phạm Quốc Huy", class: "D24CQCN02-B", score: null },
  { id: "B24DCCC089", name: "Lê Thị Mai", class: "D24CQCN01-B", score: null }
];

const TeacherCreditClasses = ({ onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState(mockStudents);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [gradeData, setGradeData] = useState({ studentId: "", score: "", type: "midterm" });
  const { toast } = useToast();

  const handleViewStudents = (creditClass) => {
    setSelectedClass(creditClass);
    onSelectClass(creditClass);
  };

  const handleSubmitGrade = () => {
    setStudents(prev => prev.map(student => 
      student.id === gradeData.studentId 
        ? { ...student, score: parseFloat(gradeData.score) }
        : student
    ));
    
    toast({
      title: "Nhập điểm thành công",
      description: `Đã nhập điểm ${gradeData.type === 'midterm' ? 'giữa kỳ' : 'cuối kỳ'} cho sinh viên`
    });
    
    setIsGradeDialogOpen(false);
    setGradeData({ studentId: "", score: "", type: "midterm" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lớp tín chỉ phụ trách</CardTitle>
          <CardDescription>Danh sách các lớp tín chỉ bạn đang giảng dạy</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã lớp</TableHead>
                <TableHead>Tên môn</TableHead>
                <TableHead>Học kỳ</TableHead>
                <TableHead>Số tín chỉ</TableHead>
                <TableHead>Sĩ số</TableHead>
                <TableHead>Lịch học</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCreditClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.code}</TableCell>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.semester}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cls.credits} TC</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {cls.studentCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{cls.schedule}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewStudents(cls)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Xem DS
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Danh sách sinh viên - {selectedClass.name}</CardTitle>
                <CardDescription>Lớp {selectedClass.code}</CardDescription>
              </div>
              <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Nhập điểm
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nhập điểm sinh viên</DialogTitle>
                    <DialogDescription>
                      Nhập điểm cho sinh viên trong lớp {selectedClass.code}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="student">Sinh viên</Label>
                      <Select value={gradeData.studentId} onValueChange={(value) => setGradeData({...gradeData, studentId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn sinh viên" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map(student => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.id} - {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Loại điểm</Label>
                      <Select value={gradeData.type} onValueChange={(value) => setGradeData({...gradeData, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="attendance">Điểm chuyên cần</SelectItem>
                          <SelectItem value="midterm">Điểm giữa kỳ</SelectItem>
                          <SelectItem value="final">Điểm cuối kỳ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="score">Điểm (0-10)</Label>
                      <Input
                        id="score"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={gradeData.score}
                        onChange={(e) => setGradeData({...gradeData, score: e.target.value})}
                        placeholder="Nhập điểm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleSubmitGrade}>
                      Lưu điểm
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã SV</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Điểm CC</TableHead>
                  <TableHead>Điểm GK</TableHead>
                  <TableHead>Điểm CK</TableHead>
                  <TableHead>Điểm TB</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherCreditClasses;
