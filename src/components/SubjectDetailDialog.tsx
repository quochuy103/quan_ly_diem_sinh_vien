
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, BookOpen, Clock, Award } from "lucide-react";

const SubjectDetailDialog = ({ subject, isOpen, onClose }) => {
  if (!subject) return null;

  const convertToGPA4 = (score) => {
    if (score >= 8.5) return 4.0;
    if (score >= 7.0) return 3.0;
    if (score >= 5.5) return 2.0;
    if (score >= 4.0) return 1.0;
    return 0.0;
  };

  const getLetterGrade = (score) => {
    if (score >= 8.5) return "A";
    if (score >= 7.0) return "B";
    if (score >= 5.5) return "C";
    if (score >= 4.0) return "D";
    return "F";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {subject.subjectName}
          </DialogTitle>
          <DialogDescription>
            Thông tin chi tiết môn học và điểm số
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Subject Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin môn học</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Số tín chỉ:</span>
                  <Badge variant="outline" className="ml-2">{subject.credits} TC</Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Học kỳ:</span>
                  <Badge variant="secondary" className="ml-2">{subject.semester} - {subject.year}</Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Giảng viên:</span>
                <Badge variant="outline">PGS.TS. Nguyễn Văn A</Badge>
                <Badge variant="outline">TS. Trần Thị B</Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Lịch học:</span>
                <span className="text-sm">Thứ 2, 07:30-09:15, Phòng TC-201</span>
              </div>
            </CardContent>
          </Card>

          {/* Grade Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                Chi tiết điểm số
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Grade Components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8.5</div>
                    <div className="text-sm text-blue-600">Điểm chuyên cần</div>
                    <div className="text-xs text-gray-500">20%</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8.0</div>
                    <div className="text-sm text-green-600">Điểm giữa kỳ</div>
                    <div className="text-xs text-gray-500">30%</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">8.5</div>
                    <div className="text-sm text-purple-600">Điểm cuối kỳ</div>
                    <div className="text-xs text-gray-500">50%</div>
                  </div>
                </div>

                <Separator />

                {/* Final Grade */}
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {subject.score}
                    <span className="text-lg ml-2">/ 10</span>
                  </div>
                  <div className="flex justify-center items-center gap-4 mb-3">
                    <Badge variant="default" className="text-lg py-1 px-3">
                      Hệ 4: {convertToGPA4(subject.score)}
                    </Badge>
                    <Badge variant="outline" className="text-lg py-1 px-3">
                      Chữ: {getLetterGrade(subject.score)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    Xếp loại: <span className="font-medium">
                      {subject.score >= 8.5 ? "Giỏi" : 
                       subject.score >= 7 ? "Khá" : 
                       subject.score >= 5.5 ? "Trung bình" : "Yếu"}
                    </span>
                  </div>
                </div>

                {/* Grade History */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Lịch sử cập nhật điểm</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Điểm cuối kỳ</span>
                      <span className="text-gray-600">20/12/2024 - 14:30</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Điểm giữa kỳ</span>
                      <span className="text-gray-600">15/11/2024 - 10:15</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>Điểm chuyên cần</span>
                      <span className="text-gray-600">10/10/2024 - 16:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDetailDialog;
