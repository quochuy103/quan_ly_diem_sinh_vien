
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { School, Users, GraduationCap, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.role) {
      if (currentUser.role === "admin") {
        navigate("/admin");
      } else if (currentUser.role === "teacher") {
        navigate("/teacher");
      } else if (currentUser.role === "student") {
        navigate("/student");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 p-4 bg-blue-600 rounded-full w-fit">
            <School className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hệ thống Quản lý Điểm Sinh viên
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Học viện Công nghệ Bưu chính Viễn thông
          </p>
          <Button 
            onClick={() => navigate("/login")} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đăng nhập vào hệ thống
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Quản trị viên</CardTitle>
              <CardDescription>
                Quản lý toàn bộ hệ thống, tài khoản và dữ liệu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quản lý tài khoản</li>
                <li>• Quản lý sinh viên, giảng viên</li>
                <li>• Quản lý khoa, lớp, môn học</li>
                <li>• Xem báo cáo tổng quan</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Giảng viên</CardTitle>
              <CardDescription>
                Quản lý điểm và thông báo cho sinh viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Nhập và chỉnh sửa điểm</li>
                <li>• Gửi thông báo</li>
                <li>• Xem danh sách lớp</li>
                <li>• Quản lý môn học</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Sinh viên</CardTitle>
              <CardDescription>
                Xem điểm số và nhận thông báo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Xem bảng điểm</li>
                <li>• Nhận thông báo</li>
                <li>• Xem thông tin cá nhân</li>
                <li>• Theo dõi kết quả học tập</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tài khoản demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium">Quản trị viên</h3>
              <p>Username: admin</p>
              <p>Password: admin123</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium">Giảng viên</h3>
              <p>Username: tuan.da</p>
              <p>Password: teacher123</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium">Sinh viên</h3>
              <p>Username: B24DCCC016</p>
              <p>Password: student123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
