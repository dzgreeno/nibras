import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Trash2, Edit, Download, Upload, Eye, EyeOff, Search, Filter } from 'lucide-react';
import { AccountManager, UserAccount } from '../utils/accountManager';

const AccountsManager: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotification();
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<UserAccount | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    const allAccounts = AccountManager.getAllAccounts();
    setAccounts(allAccounts);
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || account.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteAccount = async (email: string) => {
    const confirmed = await showConfirm(
      'تأكيد الحذف',
      'هل أنت متأكد من حذف هذا الحساب؟'
    );
    if (confirmed) {
      const success = AccountManager.deleteAccount(email);
      if (success) {
        showSuccess('تم الحذف', 'تم حذف الحساب بنجاح');
        loadAccounts();
      } else {
        showError('خطأ', 'حدث خطأ في حذف الحساب');
      }
    }
  };

  const handleEditAccount = (account: UserAccount) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const handleUpdateAccount = (updatedData: Partial<UserAccount>) => {
    if (selectedAccount) {
      const success = AccountManager.updateAccount(selectedAccount.email, updatedData);
      if (success) {
        showSuccess('تم التحديث', 'تم تحديث الحساب بنجاح');
        loadAccounts();
        setShowEditModal(false);
        setSelectedAccount(null);
      } else {
        showError('خطأ', 'حدث خطأ في تحديث الحساب');
      }
    }
  };

  const handleExportData = () => {
    const data = AccountManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = AccountManager.importData(content);
        if (success) {
          showSuccess('تم الاستيراد', 'تم استيراد البيانات بنجاح');
          loadAccounts();
        } else {
          showError('خطأ', 'حدث خطأ في استيراد البيانات');
        }
      };
      reader.readAsText(file);
    }
  };

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      student: 'تلميذ ابتدائي',
      teacher: 'معلم ابتدائي',
      parent: 'ولي أمر',
      admin: 'مدير مدرسة ابتدائية',
      supervisor: 'مفتش تربوي'
    };
    return roles[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      parent: 'bg-purple-100 text-purple-800',
      admin: 'bg-orange-100 text-orange-800',
      supervisor: 'bg-red-100 text-red-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const stats = AccountManager.getAccountStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">إدارة الحسابات المسجلة</h1>
          <p className="text-blue-100">إدارة حسابات المستخدمين في منصة نبراس الجزائر</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">إجمالي الحسابات</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.byRole.student || 0}</div>
            <div className="text-sm text-gray-600">تلاميذ</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.byRole.teacher || 0}</div>
            <div className="text-sm text-gray-600">معلمين</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.byRole.parent || 0}</div>
            <div className="text-sm text-gray-600">أولياء أمور</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.byRole.admin || 0}</div>
            <div className="text-sm text-gray-600">مديرين</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.byRole.supervisor || 0}</div>
            <div className="text-sm text-gray-600">مفتشين</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">قائمة الحسابات</h2>
            <div className="flex gap-2">
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </button>
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Upload className="h-4 w-4 ml-2" />
                استيراد
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="البحث بالاسم أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الأدوار</option>
                <option value="student">تلاميذ</option>
                <option value="teacher">معلمين</option>
                <option value="parent">أولياء أمور</option>
                <option value="admin">مديرين</option>
                <option value="supervisor">مفتشين</option>
              </select>
            </div>
            <button
              onClick={() => setShowPasswords(!showPasswords)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                showPasswords ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {showPasswords ? <EyeOff className="h-4 w-4 ml-2" /> : <Eye className="h-4 w-4 ml-2" />}
              {showPasswords ? 'إخفاء كلمات المرور' : 'إظهار كلمات المرور'}
            </button>
          </div>

          {/* Accounts Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الاسم</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">البريد الإلكتروني</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">كلمة المرور</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الدور</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">تاريخ الإنشاء</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.email} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500">{account.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{account.email}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">
                        {showPasswords ? account.password : '••••••••'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(account.role)}`}>
                        {getRoleLabel(account.role)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {account.createdAt ? new Date(account.createdAt).toLocaleDateString('ar-DZ') : 'غير محدد'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAccount(account)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          title="تعديل"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(account.email)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد حسابات مطابقة للبحث
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تعديل الحساب</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedData = {
                  name: formData.get('name') as string,
                  phone: formData.get('phone') as string,
                  description: formData.get('description') as string,
                };
                handleUpdateAccount(updatedData);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedAccount.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedAccount.phone || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={selectedAccount.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  حفظ التغييرات
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedAccount(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsManager;