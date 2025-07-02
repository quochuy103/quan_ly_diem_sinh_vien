
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GradeStatisticsProps {
  hideSubjectFilter?: boolean;
}

const mockGradeData = [
  { name: "Tuần 1", average: 7.2, passed: 85, failed: 15 },
  { name: "Tuần 2", average: 7.5, passed: 88, failed: 12 },
  { name: "Tuần 3", average: 7.8, passed: 90, failed: 10 },
  { name: "Tuần 4", average: 8.1, passed: 92, failed: 8 },
];

const mockStudentStats = [
  { name: "Nguyễn Đức Anh", score: 9.2, rank: 1 },
  { name: "Phạm Quốc Huy", score: 8.8, rank: 2 },
  { name: "Bùi Phương Ngọc", score: 8.5, rank: 3 },
  { name: "Trần Văn Nam", score: 6.2, rank: 4 },
  { name: "Lê Thị Hoa", score: 5.8, rank: 5 },
];

const GradeStatistics = ({ hideSubjectFilter = false }: GradeStatisticsProps) => {
  const [timeFilter, setTimeFilter] = useState("week");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const { toast } = useToast();

  const handleExportExcel = () => {
    toast({
      title: "Xuất Excel thành công",
      description: "File Excel đã được tải xuống!"
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Xuất PDF thành công", 
      description: "File PDF đã được tải xuống!"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Thống kê điểm số</h2>
          <p className="text-gray-600">Phân tích và thống kê điểm số theo thời gian</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Theo tuần</SelectItem>
            <SelectItem value="month">Theo tháng</SelectItem>
            <SelectItem value="semester">Theo kỳ</SelectItem>
          </SelectContent>
        </Select>
        
        {!hideSubjectFilter && (
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả môn học</SelectItem>
              <SelectItem value="database">Cơ sở dữ liệu</SelectItem>
              <SelectItem value="oop">Lập trình hướng đối tượng</SelectItem>
              <SelectItem value="datastructure">Cấu trúc dữ liệu</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Điểm TB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.1</div>
            <p className="text-xs text-green-600">+0.3 so với tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tỉ lệ qua môn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-green-600">+2% so với tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Điểm cao nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.2</div>
            <p className="text-xs text-gray-600">Nguyễn Đức Anh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Điểm thấp nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8</div>
            <p className="text-xs text-gray-600">Lê Thị Hoa</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng điểm trung bình</CardTitle>
            <CardDescription>Biểu đồ điểm trung bình theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockGradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỉ lệ qua/trượt môn</CardTitle>
            <CardDescription>Thống kê tỉ lệ qua và trượt môn</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockGradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="passed" fill="#10b981" />
                <Bar dataKey="failed" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bảng xếp hạng sinh viên</CardTitle>
          <CardDescription>Top sinh viên có điểm cao nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockStudentStats.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={index < 3 ? "default" : "secondary"}>
                    #{student.rank}
                  </Badge>
                  <span className="font-medium">{student.name}</span>
                </div>
                <Badge variant={student.score >= 8 ? "default" : student.score >= 6.5 ? "secondary" : "destructive"}>
                  {student.score}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeStatistics;
