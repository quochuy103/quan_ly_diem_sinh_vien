
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { School } from "lucide-react";

// Mock accounts data
const mockAccounts = {
  admin: { username: "admin", password: "admin123", role: "admin", name: "Quản trị viên" },
  teachers: [
    { username: "tuan.da", password: "teacher123", role: "teacher", name: "Đặng Anh Tuấn", id: 1 },
    { username: "a.nv", password: "teacher123", role: "teacher", name: "Nguyễn Văn A", id: 2 }
  ],
  students: [
    { username: "B24DCCC016", password: "student123", role: "student", name: "Nguyễn Đức Anh", id: "B24DCCC016" },
    { username: "B24DCCC148", password: "student123", role: "student", name: "Phạm Quốc Huy", id: "B24DCCC148" }
  ]
};

interface LoginForm {
  username: string;
  password: string;
  role: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
      role: ""
    }
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let user = null;
    
    if (data.role === "admin" && data.username === mockAccounts.admin.username && data.password === mockAccounts.admin.password) {
      user = mockAccounts.admin;
    } else if (data.role === "teacher") {
      user = mockAccounts.teachers.find(t => t.username === data.username && data.password === "teacher123");
    } else if (data.role === "student") {
      user = mockAccounts.students.find(s => s.username === data.username && data.password === "student123");
    }
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${user.name}!`
      });
      
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Tên đăng nhập hoặc mật khẩu không đúng!",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-600 rounded-full w-fit">
            <School className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Đăng nhập hệ thống</CardTitle>
          <CardDescription>
            Hệ thống quản lý điểm sinh viên - PTIT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                        <SelectItem value="teacher">Giảng viên</SelectItem>
                        <SelectItem value="student">Sinh viên</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên đăng nhập" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-medium mb-2">Tài khoản mẫu:</p>
            <div className="space-y-1 text-gray-600">
              <p>Admin: admin / admin123</p>
              <p>GV: tuan.da / teacher123</p>
              <p>SV: B24DCCC016 / student123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
