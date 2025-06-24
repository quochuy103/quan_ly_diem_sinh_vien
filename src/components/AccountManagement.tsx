
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Account {
  id: string;
  username: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
}

interface AccountForm {
  username: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
}

const mockAccounts: Account[] = [
  { id: "1", username: "admin", name: "Quản trị viên", role: "admin", email: "admin@ptit.edu.vn", phone: "0123456789", status: "active" },
  { id: "2", username: "tuan.da", name: "Đặng Anh Tuấn", role: "teacher", email: "tuan.da@ptit.edu.vn", phone: "0111222333", status: "active" },
  { id: "3", username: "a.nv", name: "Nguyễn Văn A", role: "teacher", email: "a.nv@ptit.edu.vn", phone: "0222333444", status: "active" },
  { id: "4", username: "B24DCCC016", name: "Nguyễn Đức Anh", role: "student", email: "anh.nd@student.ptit.edu.vn", phone: "0123456789", status: "active" },
  { id: "5", username: "B24DCCC148", name: "Phạm Quốc Huy", role: "student", email: "huy.pq@student.ptit.edu.vn", phone: "0987654321", status: "active" }
];

const AccountManagement = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const { toast } = useToast();

  const form = useForm<AccountForm>({
    defaultValues: {
      username: "",
      name: "",
      role: "",
      email: "",
      phone: "",
      password: ""
    }
  });

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || account.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const onSubmit = (data: AccountForm) => {
    if (editingAccount) {
      // Update existing account
      setAccounts(prev => prev.map(account => 
        account.id === editingAccount.id 
          ? { ...account, ...data, status: "active" }
          : account
      ));
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin tài khoản đã được cập nhật!"
      });
    } else {
      // Create new account
      const newAccount: Account = {
        id: Date.now().toString(),
        ...data,
        status: "active"
      };
      setAccounts(prev => [...prev, newAccount]);
      toast({
        title: "Tạo tài khoản thành công",
        description: "Tài khoản mới đã được tạo!"
      });
    }
    
    setIsDialogOpen(false);
    setEditingAccount(null);
    form.reset();
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    form.reset({
      username: account.username,
      name: account.name,
      role: account.role,
      email: account.email,
      phone: account.phone,
      password: ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (accountId: string) => {
    setAccounts(prev => prev.filter(account => account.id !== accountId));
    toast({
      title: "Xóa thành công",
      description: "Tài khoản đã được xóa!"
    });
  };

  const handleAddNew = () => {
    setEditingAccount(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "teacher": return "secondary";
      case "student": return "outline";
      default: return "outline";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin": return "Quản trị viên";
      case "teacher": return "Giảng viên";
      case "student": return "Sinh viên";
      default: return role;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Quản lý tài khoản</CardTitle>
            <CardDescription>Tạo và quản lý tài khoản cho sinh viên, giảng viên và quản trị viên</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm tài khoản
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAccount ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}
                </DialogTitle>
                <DialogDescription>
                  {editingAccount ? "Cập nhật thông tin tài khoản" : "Tạo tài khoản mới cho hệ thống"}
                </DialogDescription>
              </DialogHeader>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ và tên" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Nhập email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số điện thoại" {...field} />
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
                        <FormLabel>Mật khẩu{editingAccount && " (để trống nếu không đổi)"}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button type="submit">
                      {editingAccount ? "Cập nhật" : "Tạo tài khoản"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm tài khoản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="admin">Quản trị viên</SelectItem>
              <SelectItem value="teacher">Giảng viên</SelectItem>
              <SelectItem value="student">Sinh viên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map(account => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.username}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(account.role)}>
                      {getRoleText(account.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.phone}</TableCell>
                  <TableCell>
                    <Badge variant={account.status === "active" ? "default" : "secondary"}>
                      {account.status === "active" ? "Hoạt động" : "Tạm khóa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(account)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(account.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountManagement;
