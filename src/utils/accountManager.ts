// إدارة الحسابات المحلية - النظام التعليمي الجزائري
import React from 'react';

export interface UserAccount {
  // بيانات أساسية
  id: string;
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'supervisor' | 'superadmin';
  name: string;
  email: string;
  password: string;
  phone?: string;
  dashboard: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  createdAt?: string;
  isActive?: boolean;
  
  // بيانات النظام التعليمي الجزائري
  wilaya: string;
  school: string;
  schoolName: string;
  
  // بيانات خاصة بالتلاميذ
  studentData?: {
    studentId: string;
    grade: string;
    gradeName: string;
    class: string;
    className: string;
    birthDate: string;
    parentName: string;
    parentPhone: string;
    address: string;
    subjects: string[];
  };
  
  // بيانات خاصة بالمعلمين
  teacherData?: {
    teacherId: string;
    specialization: string;
    subjects: string[];
    classes: string[];
    experience: number;
    qualification: string;
    hireDate: string;
  };
  
  // بيانات خاصة بأولياء الأمور
  parentData?: {
    children: Array<{
      name: string;
      studentId: string;
      grade: string;
      gradeName: string;
      class: string;
      school: string;
      schoolName: string;
    }>;
    profession?: string;
    address: string;
  };
  
  // بيانات خاصة بالمديرين
  adminData?: {
    adminId: string;
    position: 'مدير' | 'مدير مساعد' | 'ناظر';
    managedGrades: string[];
    totalStudents: number;
    totalTeachers: number;
    appointmentDate: string;
  };
  
  // بيانات خاصة بالمفتشين
  supervisorData?: {
    supervisorId: string;
    zone: string;
    specialization: string;
    supervisedSchools: string[];
    supervisedSubjects: string[];
    appointmentDate: string;
  };
  
  // بيانات خاصة بالأدمين العام
  superAdminData?: {
    adminId: string;
    permissions: string[];
    managedRegions: string[];
    totalUsers: number;
    appointmentDate: string;
  };
}

export class AccountManager {
  private static ACCOUNTS_KEY = 'registeredAccounts';
  private static CURRENT_USER_KEY = 'currentUser';

  // حفظ حساب جديد
  static saveAccount(account: UserAccount): boolean {
    try {
      const accounts = this.getAllAccounts();
      
      // التحقق من عدم وجود حساب بنفس البريد
      const existingAccount = accounts.find(acc => acc.email === account.email);
      if (existingAccount) {
        return false; // الحساب موجود بالفعل
      }
      
      accounts.push({
        ...account,
        createdAt: new Date().toISOString(),
        isActive: true
      });
      
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
      return true;
    } catch (error) {
      console.error('خطأ في حفظ الحساب:', error);
      return false;
    }
  }

  // الحصول على جميع الحسابات
  static getAllAccounts(): UserAccount[] {
    try {
      const accounts = localStorage.getItem(this.ACCOUNTS_KEY);
      return accounts ? JSON.parse(accounts) : [];
    } catch (error) {
      console.error('خطأ في قراءة الحسابات:', error);
      return [];
    }
  }

  // البحث عن حساب بالبريد الإلكتروني وكلمة المرور
  static findAccount(email: string, password: string): UserAccount | null {
    const accounts = this.getAllAccounts();
    return accounts.find(acc => acc.email === email && acc.password === password) || null;
  }

  // حفظ المستخدم الحالي
  static setCurrentUser(user: UserAccount): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // الحصول على المستخدم الحالي
  static getCurrentUser(): UserAccount | null {
    try {
      const user = localStorage.getItem(this.CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('خطأ في قراءة المستخدم الحالي:', error);
      return null;
    }
  }

  // تسجيل الخروج
  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // تحديث بيانات المستخدم
  static updateAccount(email: string, updatedData: Partial<UserAccount>): boolean {
    try {
      const accounts = this.getAllAccounts();
      const accountIndex = accounts.findIndex(acc => acc.email === email);
      
      if (accountIndex === -1) {
        return false;
      }
      
      accounts[accountIndex] = { ...accounts[accountIndex], ...updatedData };
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
      
      // تحديث المستخدم الحالي إذا كان هو نفسه
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.email === email) {
        this.setCurrentUser(accounts[accountIndex]);
      }
      
      return true;
    } catch (error) {
      console.error('خطأ في تحديث الحساب:', error);
      return false;
    }
  }

  // حذف حساب
  static deleteAccount(email: string): boolean {
    try {
      const accounts = this.getAllAccounts();
      const filteredAccounts = accounts.filter(acc => acc.email !== email);
      
      if (filteredAccounts.length === accounts.length) {
        return false; // الحساب غير موجود
      }
      
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(filteredAccounts));
      
      // تسجيل الخروج إذا كان المستخدم الحالي هو المحذوف
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.email === email) {
        this.logout();
      }
      
      return true;
    } catch (error) {
      console.error('خطأ في حذف الحساب:', error);
      return false;
    }
  }

  // التحقق من صحة البيانات
  static validateAccountData(data: Partial<UserAccount>): string[] {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('الاسم يجب أن يحتوي على حرفين على الأقل');
    }
    
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
    
    if (!data.password || data.password.length < 6) {
      errors.push('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل');
    }
    
    if (!data.role || !['student', 'teacher', 'parent', 'admin', 'supervisor', 'superadmin'].includes(data.role)) {
      errors.push('نوع المستخدم غير صحيح');
    }
    
    return errors;
  }

  // التحقق من صحة البريد الإلكتروني
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // إحصائيات الحسابات
  static getAccountStats(): { total: number; byRole: Record<string, number> } {
    const accounts = this.getAllAccounts();
    const byRole: Record<string, number> = {};
    
    accounts.forEach(account => {
      byRole[account.role] = (byRole[account.role] || 0) + 1;
    });
    
    return {
      total: accounts.length,
      byRole
    };
  }

  // تصدير البيانات (للنسخ الاحتياطي)
  static exportData(): string {
    return JSON.stringify({
      accounts: this.getAllAccounts(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    }, null, 2);
  }

  // استيراد البيانات
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.accounts && Array.isArray(data.accounts)) {
        localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(data.accounts));
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطأ في استيراد البيانات:', error);
      return false;
    }
  }
}