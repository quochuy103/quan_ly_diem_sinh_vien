import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const mockStatistics = {
  weekly: [
    { week: "Tuần 1", avgScore: 7.2, passRate: 85 },
    { week: "Tuần 2", avgScore: 7.5, passRate: 88 },
    { week: "Tuần 3", avgScore: 7.8, passRate: 92 },
    { week: "Tuần 4", avgScore: 7.3, passRate: 87 },
  ],
  monthly: [
    { month: "Tháng 9", avgScore: 7.2, passRate: 85 },
    { month: "Tháng 10", avgScore: 7.6, passRate: 89 },
    { month: "Tháng 11", avgScore: 7.9, passRate: 93 },
    { month: "Tháng 12", avgScore: 8.1, passRate: 95 },
  ],
  gradeDistribution: [
    { range: "9-10", count: 8, percentage: 18 },
    { range: "8-9", count: 12, percentage: 27 },
    { range: "7-8", count: 15, percentage: 33 },
    { range: "6-7", count: 7, percentage: 16 },
    { range: "5-6", count: 2, percentage: 4 },
    { range: "0-5", count: 1, percentage: 2 },
  ],
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const GradeStatistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const { toast } = useToast();

  const handleExportExcel = () => {
    toast({
      title: "Xuất Excel thành công",
      description: "File thống kê đã được tải xuống",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Xuất PDF thành công",
      description: "File báo cáo đã được tải xuống",
    });
  };

  const currentData =
    selectedPeriod === "weekly"
      ? mockStatistics.weekly
      : mockStatistics.monthly;
  const currentAvg = currentData[currentData.length - 1]?.avgScore || 0;
  const previousAvg = currentData[currentData.length - 2]?.avgScore || 0;
  const trend = currentAvg > previousAvg ? "up" : "down";
  const trendValue = Math.abs(currentAvg - previousAvg).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Thống kê điểm số</h2>
          <p className="text-gray-600">
            Thống kê và phân tích điểm số sinh viên
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Theo tuần</SelectItem>
            <SelectItem value="monthly">Theo tháng</SelectItem>
            <SelectItem value="semester">Theo học kỳ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Điểm TB hiện tại
            </CardTitle>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentAvg.toFixed(1)}</div>
            <p
              className={`text-xs ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? "+" : "-"}
              {trendValue} so với kỳ trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ qua môn</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData[currentData.length - 1]?.passRate || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {45 -
                Math.floor(
                  (45 * (currentData[currentData.length - 1]?.passRate || 0)) /
                    100
                )}{" "}
              sinh viên trượt môn
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm cao nhất</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.5</div>
            <p className="text-xs text-muted-foreground">
              Nguyễn Đức Anh (B24DCCC016)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Điểm thấp nhất
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">
              Sinh viên cần hỗ trợ
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng điểm trung bình</CardTitle>
            <CardDescription>
              Biểu đồ thể hiện sự thay đổi điểm trung bình theo thời gian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={selectedPeriod === "weekly" ? "week" : "month"}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ qua môn</CardTitle>
            <CardDescription>
              Biểu đồ thể hiện tỷ lệ sinh viên qua môn theo thời gian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={selectedPeriod === "weekly" ? "week" : "month"}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="passRate" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phân bố điểm số</CardTitle>
          <CardDescription>
            Phân bố sinh viên theo các khoảng điểm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockStatistics.gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, percentage }) => `${range}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockStatistics.gradeDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              <h4 className="font-medium">Chi tiết phân bố</h4>
              {mockStatistics.gradeDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">
                      {item.range} điểm
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.count} SV</Badge>
                    <span className="text-sm text-gray-600">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeStatistics;
